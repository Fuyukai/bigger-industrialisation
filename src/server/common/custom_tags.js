

const ITEM_TAGS = {
    "nijika:rubber/any": [
        "gtceu:rubber_plate", "gtceu:silicone_rubber_plate", "gtceu:styrene_butadiene_rubber_plate"
    ],

    "nijika:ropes": [
        "bigglobe:spelunking_rope"
    ],

    "nijika:any_resistor_carbon": [
        "gtceu:charcoal_dust",
        "gtceu:coal_dust",
        "gtceu:carbon_dust"
    ],

    "c:ash_dusts": ["bigglobe:ash"],
    "c:dusts": ["bigglobe:ash"],
};

const BLOCK_TAGS = {
    
};

/**
 * Adds all tags from the provideed dict using the provided event.
 */
const addTagsCommon = (event, dict) => {
    for (const [tag, v] of Object.entries(dict)) {
        for (const thing of v) {
            event.add(tag, thing);
        }
    }
}

/**
 * Adds all custom block tags.
 * 
 * @param {TagEvent.Block} event
 */
export const addCustomBlockTags = (event) => {
    addTagsCommon(event, BLOCK_TAGS);
}

/**
 * Adds all custom block tags.
 * 
 * @param {TagEvent.Item} event
 */
export const addCustomItemTags = (event) => {
    addTagsCommon(event, ITEM_TAGS);
}