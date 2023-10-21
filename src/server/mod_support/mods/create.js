import { RecipeWrapper } from "../../../util/recipe_wrapper";

export const createFunctions = {
    /** @param {RecipeWrapper} event */
    recipes: (event) => {
        event.remove("create:crafting/materials/andesite_alloy");
        event.remove("create:crafting/materials/andesite_alloy_from_zinc");

        // andesite alloy now uses tin.
        event.shaped(
            "2x create:andesite_alloy",
            ["NA", "AN"],
            {N: "#c:tin_nuggets", A: "#create:stone_types/andesite"}
        );

        // make the rope pulley use... a rope
        event.remove("create:crafting/kinetics/rope_pulley");
        event.shaped(
            "create:rope_pulley",
            ["C", "R", "R"],
            {
                C: "create:andesite_casing",
                R: "#nijika:ropes"
            }
        )

        // adjust fluid logisttics to use brass
        event.remove("create:crafting/kinetics/fluid_pipe_vertical");
        event.remove("create:crafting/kinetics/fluid_pipe");

        event.shaped(
            "4x create:fluid_pipe",
            ["P", "I", "P"],
            {
                P: "#c:brass_plates",
                I: "#c:brass_ingots",
            }
        ).id("nijika:create/pipes/fluid_pipe_up");

        event.shaped(
            "4x create:fluid_pipe",
            ["PIP"],
            {
                P: "#c:brass_plates",
                I: "#c:brass_ingots",
            }
        ).id("nijika:create/pipes/fluid_pipe_across");

        event.remove("create:crafting/kinetics/fluid_tank");
        event.shaped(
            "create:fluid_tank",
            ["P", "B", "P"],
            {
                P: "#c:brass_plates",
                B: "#c:barrels"
            }
        );

        event.remove("create:crafting/kinetics/hose_pulley");
        event.shaped(
            "create:hose_pulley",
            ["P", "H"],
            {
                P: "create:rope_pulley",
                H: "create:fluid_pipe",
            }
        ).id("nijika:create/hose_pulley");

        event.remove("create:crafting/kinetics/steam_engine");
        event.shaped(
            "create:steam_engine",
            ["G", "A", "B"],
            {
                G: "#c:gold_plates",
                A: "create:andesite_alloy",
                B: "#c:brass_blocks"
            }
        ).id("nijika:create/steam_engine");
    },

    /** @param {TagEvent.Block} event */
    blockTags: (event) => {
        // prevent cheesing power with boilers.
        event.removeAll("create:passive_boiler_heaters");
    },

    /** @param {TagEvent.Item} event */
    itemTags: (event) => {
        // coke makes blaze burners happy :)
        event.add("create:blaze_burner_fuel/special", "#c:coke_gems");
    }
}