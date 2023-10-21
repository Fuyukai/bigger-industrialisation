import { RecipeWrapper } from "../../../../util/recipe_wrapper";

const BASE_COKE_TIME = 1200;
const BLOCK_COKE_TIME = BASE_COKE_TIME * 8;  // slightly more efficient to smelt whole coal blocks.

/** @param {RecipeWrapper} event */
export const readdCokeOvenRecipes = (event) => {
    // no vanilla charcoal recipe
    event.remove("minecraft:charcoal");

    event.kjs.recipes.gtceu.coke_oven("nijika:tier0/coke_oven/charcoal_cooking")
        .itemInputs("1x minecraft:oak_log")
        .itemOutputs("minecraft:charcoal")
        .outputFluids(Fluid.of("gtceu:creosote", 250))
        .duration(BASE_COKE_TIME);
    
    event.kjs.recipes.gtceu.coke_oven("nijika:tier0/coke_oven/coke_cooking")
        .itemInputs("1x #c:coal_gems")
        .itemOutputs("gtceu:coke_gem")
        .outputFluids(Fluid.of("gtceu:creosote", 500))
        .duration(BASE_COKE_TIME);

    event.kjs.recipes.gtceu.coke_oven("nijika:tier0/coke_oven/coke_block_cooking")
        .itemInputs("1x #c:coal_blocks")
        .itemOutputs("1x gtceu:coke_block")
        .outputFluids(Fluid.of("gtceu:creosote", 500 * 9))
        .duration(BLOCK_COKE_TIME);
}