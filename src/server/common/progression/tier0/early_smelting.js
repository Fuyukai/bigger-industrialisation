import { RecipeWrapper } from "../../../../util/recipe_wrapper"

const EARLYGAME_METALS = [
    ["iron", "iron"],
    ["copper", "copper"],
    ["cassiterite", "tin"],
    ["galena", "lead"]
]

/** @param {RecipeWrapper} event */
export const addEarlyGameSmeltingRecipes = (event) => {
    for (let [ore, metal] of EARLYGAME_METALS) {
        let oreTagName = `#c:raw_${ore}_ores`;
        let outputIngotTagName = `#c:${metal}_ingots`;

        event.kjs.remove({"type": "minecraft:smelting", "output": outputIngotTagName});
    }

    event.kjs.smelting("minecraft:iron_nugget", "#c:raw_iron_ores");
    event.kjs.smelting("gtceu:copper_nugget", "#c:raw_copper_ores");
    event.kjs.smelting("gtceu:tin_nugget", "#c:raw_cassiterite_ores");
    event.kjs.smelting("gtceu:lead_nugget", "#c:raw_galena_ores");
    event.kjs.smelting("minecraft:gold_nugget", "#c:raw_gold_ores");
}