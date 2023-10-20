import { RecipeWrapper } from "../../../../util/recipe_wrapper";

/** @param {RecipeWrapper} event */
export const readdCokeOvenRecipes = (event) => {
    // no vanilla charcoal recipe
    event.remove("minecraft:charcoal");

    event.kjs.recipes.gtceu.coke_oven("nijika:tier0/coke_oven/charcoal_cooking")
        .itemInputs("1x minecraft:oak_log")
        .itemOutputs("minecraft:charcoal")
        // .outputFluids(Fluid.of("gtceu:creosote", 250 * FluidAmounts.MB))
        .duration(1200);
    
    
}