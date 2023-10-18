
export class MaterialEventWrapper {
    constructor(event) {
        this._kjs = event;
    }

    /** @returns {MaterialBuilder} */
    create(id) {
        return new MaterialBuilder(this._kjs.create(id));
    }
}

export const GAS_TIER_NITROGEN = "low"
export const GAS_TIER_HELIUM = "mid"
export const GAS_TIER_ARGON = "high"
export const GAS_TIER_NEON = "higher"
export const GAS_TIER_KRYPTON = "highest"

/**
 * A wrapper around the GTCEu registry event for material building.
 */
export class MaterialBuilder {
    /** @param {com.gregtechceu.gtceu.api.registry.registrate.BuilderBase} base_builder */
    constructor(base_builder) {
        this._kjs = base_builder
    }

    /**
     * Registers this material.
     */
    register() {
        this._kjs.register()
    }

    /**
     * Sets the colour of this material. 
     */
    colour(colour) {
        this._kjs = this._kjs.color(colour);
        return this;
    }

    /** 
     * Adds a new ingot property to this material.
     * 
     * @param harvestLevel The harvest level for the material. Also be used for tools. Default 0.
     * @param burnTime The time (in ticks) this material burns for. Default 0.
     */
    ingot(harvestLevel, burnTime) {
        if (typeof harvestLevel === "undefined") harvestLevel = 2;
        if (typeof burnTime === "undefined") burnTime = 0;

        // avoid jank
        if (harvestLevel != 2 || burnTime != 0) {
            this._kjs = this._kjs.ingot(harvestLevel, burnTime);
        } else {
            this._kjs = this._kjs.ingot();
        }
        return this;
    }

    /**
     * Adds a new Gem property to this material.
     * 
     * @param harvestLevel The harvest level for the material. Also be used for tools. Default 0.
     * @param burnTime The time (in ticks) this material burns for. Default 0.
     */
    gem(harvestLevel, burnTime) {
        if (typeof harvestLevel === "undefined") harvestLevel = 2;
        if (typeof burnTime === "undefined") burnTime = 0;

        // avoid jank
        if (harvestLevel != 2 || burnTime != 0) {
            this._kjs = this._kjs.gem(harvestLevel, burnTime);
        } else {
            this._kjs = this._kjs.gem();
        }
        return this;
    }

    /**
     * Sets the element for this material.
     * 
     * @param {com.gregtechceu.gtceu.api.data.chemical.Element|string} element The element to use.
     */
    element(element) {
        if (typeof element === "string") element = GTElements.get(element);
        this._kjs = this._kjs.element(element);
        return this;
    }

    /**
     * Sets the blast furnace temperature for this material.
     * 
     * @param {number} temperature The temperature in K.
     * @param {string} gasTier Optional, the gas tier to use. See the ``GAS_TIER_X`` constants.
     */
    blastTemp(temperature, gasTier) {
        if (typeof gasTier === "undefined") {
            this._kjs = this._kjs.blastTemp(temperature);
        } else {
            this._kjs = this._kjs.blastTemp(temperature, gasTier);
        }
        return this;
    }

    /**
     * Sets the icon set for this material.
     * 
     * @param {GTMaterialIconSet} iconset The iconset to use.
     */
    iconSet(iconSet) {
        this._kjs = this._kjs.iconSet(iconSet);
        return this;
    }

    /**
     * Applies a set of material flags to this builder. 
     */
    flags() {
        // i hope this works!
        for (let flag of arguments) {
            this._kjs = this._kjs.flags(flag)
        }

        return this;
    }
}