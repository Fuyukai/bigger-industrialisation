import { RecipeWrapper } from "../../../util/recipe_wrapper";

export const createNewAgeFunctions = {
    /** @param {RecipeWrapper} event */
    recipes: (event) => {
        event.remove("create_new_age:cutting/copper_sheet");
        event.shapeless(
            "create_new_age:copper_wire",
            ["gtceu:copper_single_wire"],
        );
    }
}