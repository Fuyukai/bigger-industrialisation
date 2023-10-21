import { RecipeWrapper } from "../../util/recipe_wrapper";

/** @param {RecipeWrapper} event */
export const removeNuggetRecipes = (event) => {
    event.kjs.remove({
        type: "minecraft:crafting_shaped",
        input: "#c:ingots",
        output: "#c:nuggets"
    });

    event.kjs.remove({
        type: "minecraft:crafting_shaped",
        input: "#c:nuggets",
        output: "#c:ingots"
    });

    event.kjs.shapeless("minecraft:iron_ingot", ["2x #c:iron_nuggets"]);
    event.kjs.shapeless("minecraft:copper_ingot", ["2x #c:copper_nuggets"]);
    event.kjs.shapeless("gtceu:tin_ingot", ["2x #c:tin_nuggets"]);
    event.kjs.shapeless("gtceu:lead_ingot", ["2x #c:lead_nuggets"]);
}