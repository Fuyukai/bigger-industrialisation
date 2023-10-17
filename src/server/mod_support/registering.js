// A quick guide to mod requirements.
// There are three types of mod:
// 1) required mods, which the pack is built around. missing tthese will break everything.
// 2) soft required mods, which the pack uses by default but can be removed. missing these will still 
//    work, but the pack is marked as tainted which drops you from getting support.
// 3) optional mods, which the pack doesn't use by default but does have general support for.
//    missing these won't cause warnings or errors.

// "enum" used for mod requirements
const NOT_REQUIRED = 0;
const SOFT_REQUIRED = 1;
const HARD_REQUIRED = 2;

// "enum" used for running mod functionality 
// HARD: mandatory mod missing
export const FAILED_HARD = 0;
// SOFT: soft dependency mod missing
export const FAILED_SOFT = 1;
// SUCCESS: no required or soft required mods were missing.
export const SUCCESS = 2;

export class SupportedMod {
    constructor(modId, functionality) {
        this.id = modId;
        this.fns = functionality;
        this.requirementLevel = NOT_REQUIRED;
    }

    /** Marks this mod as hard-required. Will throw an error if it does not exist. */
    hardRequired() { this.requirementLevel = HARD_REQUIRED; return this; }

    /** Marks this mod as soft-required. Will taint your installation if it does not exist. */
    softRequired() { this.requirementLevel = SOFT_REQUIRED; return this; }
    
}

export class ModSupport {
    constructor() {
        this.mods = [];

        this.tainted = false;
        this._hasPrintedError = false;
    }

    /**
     * Adds a new mod to TBA's mod support runner. 
     * 
     * @param {string} modId - the ID of the mod to check for if it is loaded.
     * @param {boolean} mandatory - if true, then an error will be thrown if this mod is not loaded
     * @param {object} functionality - an object pointing to functions that will be ran for this mod.
     *                                 all fields are optional, but you should have at least one...
     * @param {function} functionality.recipes - called during the server recipe event
     * @param {function|object} functionality.itemTags - if a function, called to add item tags.
     *                                                   if an object, treated as {tag: [items]}.
     * @param {function|object} functionality.blockTags - see above, but for block tags
     * @returns {SupportedMod}
     */
    addModSupport(modId, functionality) {
        const mod = new SupportedMod(modId, functionality);
        this.mods.push(mod);
        return mod;
    };

    /**
     * Runs the mod functions for the specified functionality name.
     */
    runModFunctions(event, name) {
        console.log(`TBA: Running event '${name}'`)
        let result = SUCCESS;

        for (let mod of this.mods) {
            let modId = mod.id;
            let required = mod.requirementLevel;
            let fns = mod.fns;

            let modSupportEvent = fns[name];
            if (modSupportEvent == null) continue;
    
            let loaded = Platform.isLoaded(modId);
            if (!loaded) {
                if (required == HARD_REQUIRED) {
                    console.error(`TBA: Expected mod ${modId} to exist, but it doesn't! Tainting state...`);
                    this.tainted = true;
                    return FAILED_HARD;
                } else if (required == SOFT_REQUIRED) {
                    console.warn(`TBA: Expected mod ${modId} to exist, but it doesn't! Tainting state...`)
                    this.tainted = true;
                    result = FAILED_SOFT;
                    continue;
                } else {
                    console.log(`TBA: Skipping mod ${modId} as it is not loaded.`)
                    continue;
                }
            }
            
            console.log(`TBA: Running event '${name}' for mod ${modId}`);
            
            try {
                modSupportEvent(event);
            } catch (e) {
                console.error(`TBA: failed to run mod support functionality for ${modId}, skipping: ${e}`)
                result = FAILED_SOFT;
            }
        }

        return result;
    }

    runModRecipes(event) { return this.runModFunctions(event, "recipes"); }
    runModItemTags(event) { return this.runModFunctions(event, "itemTags"); }
    runModBlockTags(event) { return this.runModFunctions(event, "blockTags"); }

    runSafely(callback) {
        const result = callback();
        if (this.tainted && !this._hasPrintedError) {
            if (result == FAILED_HARD) {
                console.error("You are missing a mandatory mod! Please reinstall the pack. Support is voided.")
            } else if (result == FAILED_SOFT) {
                console.warn("You are missing certain soft-required mods. Support is voided.")
            }
            this._hasPrintedError = true;
        }

        return result;
    }
}
