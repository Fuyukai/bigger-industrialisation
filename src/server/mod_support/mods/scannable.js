import { RecipeWrapper } from "../../../util/recipe_wrapper"

/** @param {RecipeWrapper} event */
const addScannerRecipes = (event) => {

}



/** @param {TagEvent.Block} event */
const addScannerBlockTags = (event) => {
    // need to add deepslate types too
    const addToTagWithVariants = (type, tag) => {
        event.add(type, tag);
        const [modId, name] = tag.split(":");
        
        event.add(`${modId}:deepslate_${name}`, tag);
        
        if (modId == "gtceu") {
            event.add(`${modId}:nether_${name}`, tag);
        }
    };

    const commonOres = [
        "minecraft:iron_ore",
        "minecraft:copper_ore",
        "minecraft:coal_ore",
        "gtceu:cassiterite_ore",
        "gtceu:bauxite_ore",
        "gtceu:stibnite_ore",
        "gtceu:galena_ore"
    ]

    commonOres.forEach((it) => { addToTagWithVariants("kubejs:scanner/common", it) });
}


export const scannableFunctions = {
    recipes: addScannerRecipes,
    blockTags: addScannerBlockTags
}