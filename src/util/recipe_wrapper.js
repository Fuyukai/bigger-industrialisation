
const ensureList = (thing) => {
    if (Array.isArray(thing)) return thing;
    else return [thing];
}

/**
 * Converts a counted item ID (e.g. 3x minecraft:diamond) into three instances.
 * 
 * @param {Object|Object[]} items the item objects to duplicate
 */
const countsToMany = (items) => {
    if (Array.isArray(items)) {
        return items.reduce((a, b) => a.concat(countsToMany(b)), []);
    }

    if (typeof items === "string") {
        return countsToMany(itemTagged(items));
    }

    // remove extra properties and duplicate
    let count = items.count;
    if (typeof count === "undefined") count = 1;

    delete items.count;
    delete items.amount;

    // array.fill just didnt work for some inexplicable reason.
    const result = [];
    for (var _ = 0; _ < count; _++) {
        result.push(items);
    }
    return result;
}

const taggedLogic = (name, type) => {
    if (typeof name === "string") {
        // regexes don't work the way you would expect (fucking yay)
        // also the polyfill uses a `for(var)` loop that escapes the scope (2x fucking yay)
        // so fuck it, manually parsing it time

        // these are all lets due to MORE inscrutable rhino bugs, this time relating to recursion.
        let split = name.split(" ", 2);
        let first = split[0];
        let last = split[1];
        let obb = {};

        // extra param mapping
        let id;

        if (typeof last === "undefined") {
            // no count value
            id = first;
            obb.count = 1;
            obb.amount = 1;
        } else {
            let count = first.slice(0, -1);
            let intCount = Number.parseInt(count);
            obb.count = intCount;
            obb.amount = intCount;
            id = last;
        }

        // split apart extra values 
        if (id.includes(";")) {
            let mappedSplit = id.split(";");
            id = mappedSplit[0];

            for (let mappedItem of mappedSplit.slice(1)) {
                let [mappedKey, mappedValue] = mappedItem.trim().split("=", 2);
                obb[mappedKey] = mappedValue;
            }
        }


        if (id.startsWith("#")) {
            // tag value
            obb.tag = id.slice(1);
        } else {
            obb[type] = id;
        }

        return obb;
    }

    return name;
};

/**
 * Converts an item ID in the vanilla shaped recipe type into a ``{tag: name}`` or ``{item: name}``
 * object.
 * 
 * @param {string|Object} name - the id to convert
 * @returns {Object} - an id that modded recipes like more
 */
export const itemTagged = (name) => {
    // force fluid logic
    if (typeof name == "string" && name.startsWith("!")) {
        return taggedLogic(name.substring(1), "fluid");
    } else if (Array.isArray(name)) {
        return name.map(it => itemTagged(it));
    }

    return taggedLogic(name, "item");
};

/**
 * Converts an fluid ID in the vanilla shaped recipe type into a ``{tag: name}`` or ``{fluid: name}``
 * object.
 * 
 * @param {string|Object} name - the id to convert
 * @returns {Object} - an id that modded recipes like more
 */
export const fluidTagged = (name) => {
    if (Array.isArray(name)) {
        return name.map(it => fluidTagged(it));
    }

    return taggedLogic(name, "fluid");
}

export const HEAT_NONE = 0;
export const HEAT_HEATED = 1;
export const HEAT_SUPERHEATED = 2;


/**
 * A wrapper around the basic KubeJS recipe event that allows us to define custom recipes more
 * easily.
 */
export class RecipeWrapper {
    /**
     * @param {Internal.RecipesEventJS} event
     */
    constructor(event) {
        this.kjs = event;

        this.cr = this.kjs.recipes.create;
        this.gt = this.kjs.recipes.gtceu;
    }

    // == Removals == //

    /**
     * Removes a recipe by ID or by predicate.
     */
    remove(predicate) {
        if (typeof predicate === "string") {
            return this.kjs.remove({id: predicate});
        } else {
            if (typeof predicate === "object" && !Array.isArray(predicate)) {
                return this.kjs.remove(predicate);
            }
            
            const error = new TypeError("you fucked up passing an argument somewhere!")
            throw error;
        }
    }

    /**
     * Removes a recipe from both chemical reactors.
     */
    removeChemical(id) {
        this.remove(`gtceu:chemical_reactor/${id}`);
        this.remove(`gtceu:large_chemical_reactor/${id}`);
    }

    /**
     * Replaces the input for all recipes that match the specified predicate.
     */
    replaceInput(predicate, inputItem, replacementItem) {
        return this.kjs.replaceInput(predicate, inputItem, replacementItem);
    }
    
    /**
     * Replaces the output for all recipes that match the specified predicate.
     */
    replaceOutput(predicate, outputItem, replacementItem) {
        return this.kjs.replaceOutput(predicate, outputItem, replacementItem);
    }

    /**
     * Adds a new shaped crafting recipe. 
     * 
     * @param {string} id - the id of the item to produce
     * @param {string[]} pattern - array of component characters
     * @param {Object} components - mapping of component character to item or tag ID
     */
    shaped(id, pattern, components) {
        return this.kjs.shaped(id, pattern, components)
    }

    /**
     * Adds a new shapeless crafting recipe. 
     * 
     * @param {string} id - the id of the item to produce
     * @param {string[]} els - array of item ids to make the recipe from
     */
    shapeless(id, els) {
        return this.kjs.shapeless(id, els);
    }

    /**
     * Adds a new smelting recipe (and also a blasting recipe).
     */
    smelting(output, input, exp) {
        if (typeof exp == "undefined") exp = 0.0;

        return this.kjs.smelting(output, input, exp);
    }
    
    // == Create Alone == //
    /**
     * Adds a new mechanical press recipe.
     * 
     * @param {string|object} id - the id of the item, or the itemstack to produce
     * @param {string[]|object[]} els - array of item ids to make the recipe from
     */
    createPressing(output, input) {
        return this.kjs.recipes.create.pressing(output, input);
    }

    /**
     * Adds a new Create mixer recipe.
     * 
     * @param {string|string[]|object[]} output - the id of the output item(s) to produce
     * @param {string|string[]} inputs - array of item ids required for the input
     * @param {int} heatRequirement - one of the HEAT_X constants defined above. defaults to HEAT_NONE
     */
    createMixing(output, input, heatRequirement) {
        // yeah turns out fabric create doesn't accept multiple inputs 
        // so we just hack it with countToMany lol.
        // see: https://github.com/Fabricators-of-Create/Create/issues/620

        let inputs = ensureList(input);
        inputs = countsToMany(input);

        let obb = {
            type: "create:mixing",
            ingredients: inputs,
            results: ensureList(itemTagged(output))
        };


        switch (heatRequirement) {
            case HEAT_SUPERHEATED:
                obb.heatRequirement = "superheated";
                break;
            case HEAT_HEATED:
                obb.heatRequirement = "heated";
                break
            case HEAT_NONE:
                // no-op
                break;
            default:
                throw new Error("what the fuck!");
        }

        return this.kjs.custom(obb);
    }

    /**
     * Adds a new Create milling recipe. This will work for both the Millstone and the Crushing
     * Wheels.
     * 
     * @param {string|string[]} output The output item(s).
     * @param {string|string[]} input The input items.
     * @param {number} processingTime The time, in ticks, it takes to process this recipe.
     */
    createMilling(output, input, processingTime) {
        let obb = {
            type: "create:milling",
            ingredients: ensureList(itemTagged(input)),
            results: ensureList(itemTagged(output))
        };

        if (typeof processingTime !== "undefined") {
            obb.processingTime = processingTime;
        }

        return this.kjs.custom(obb);
    }

    /**
     * Adds a new Create sawing recipe.
     * 
     * @param {string|string[]} output The output item(s).
     * @param {string|string[]} input The input items.
     */
    createSawing(output, input) {
        return this.kjs.custom({
            type: "create:cutting",
            ingredients: ensureList(itemTagged(input)),
            results: ensureList(itemTagged(output))
        })
    }

    /**
     * Adds a new CC&A rolling recipe.
     */
    rolling(output, input) {
        let taggedOutput = itemTagged(output);
        let taggedInput = itemTagged(input);

        return this.kjs.custom({
            type: "createaddition:rolling",
            input: taggedInput,
            result: taggedOutput,
        });
    }


    // == Create + GT == //
    // These are mostly useful for the earlygame recipes, as the GT recipe builder is generally
    // much richer.

    /**
     * Adds a new mixing recipe.
     * 
     * @param {string} recipeId - the recipe ID. will be prepended, so don't pass a namespace!
     * @param {string|string[]|object[]} output - the id of the output item(s) to produce
     * @param {string|string[]} inputs - array of item ids required for the input
     * 
     * The following parameters are optional. 
     * 
     * @param {int} eut - the EU/t requirement. defaults to 8 (ULV). 
     *                    if higher than 32 (LV), a Create mixer recipe won't be made.
     * @param {int} duration - the number of ticks this recipe takes. defaults to 100 (5s)
     * @param {int} heatRequirement - one of the HEAT_X constants defined above. defaults to HEAT_NONE
     * @param {int} circuitNumber - the circuit number used for fixing recipe conflicts
     */
    dualMixing(
        recipeId, output, inputs, 
        eut, duration,
        heatRequirement, 
        circuitNumber
    ) {
        // KJS parses tthese straight up so no need to go through itemTagged.
        if (typeof eut == "undefined") eut = 8;
        if (typeof heatRequirement === "undefined") heatRequirement = HEAT_NONE;
        if (typeof duration === "undefined") duration = 100;

        if (eut <= 32) {
            this.createMixing(output, inputs, heatRequirement)
                .id(`kubejs:mixing/create/${recipeId}`)
        }

        // le
        let builder = this.kjs.recipes.gtceu.mixer(recipeId);

        for (const input of ensureList(inputs)) {
            builder = builder.itemInputs(input);
        }

        for (const o of ensureList(output)) {
            builder = builder.itemOutputs(Item.of(o));
        }
        
        builder = builder.duration(duration).EUt(eut);

        if (typeof circuitNumber === "number") builder = builder.circuit(circuitNumber);
    }


    
}