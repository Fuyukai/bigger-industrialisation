import { RecipeWrapper } from "../../../util/recipe_wrapper";

export const createFunctions = {
    /** @param {RecipeWrapper} event */
    recipes: (event) => {
        // belts uses gtceu rubber
        event.remove("create:crafting/kinetics/belt_connector");

        event.shaped(
            "create:belt_connector",
            ["RRR", "KKK"],
            {
                R: "gtceu:rubber_plate",
                K: "minecraft:dried_kelp"
            }
        ).id("nijika:create/belts/rubber_basic");

        event.shaped(
            "3x create:belt_connector",
            ["RRR", "RRR"],
            {
                R: "gtceu:silicone_rubber_plate"
            }
        ).id("nijika:create/belts/rubber_silicone");

        event.shaped(
            "8x create:belt_connector",
            ["RRR", "RRR"],
            {
                R: "gtceu:styrene_butadiene_rubber_plate"
            }
        ).id("nijika:create/belts/rubber_styrene");

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
    }
}