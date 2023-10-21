import { readdCokeOvenRecipes } from "./tier0/coke"
import { addEarlyGameSmeltingRecipes } from "./tier0/early_smelting";

/**
 * Adds all tier 0 (pre-Iron) progression recipes.
 */
export const addTier0ProgressionRecipes = (event) => {
    addEarlyGameSmeltingRecipes(event);
    readdCokeOvenRecipes(event);
}

/**
 * Main progression recipe helper. All mainline recipes are, in some mechanism, referenced from 
 * here.
 */
export const addProgressionRecipes = (event) => {
    addTier0ProgressionRecipes(event);
}