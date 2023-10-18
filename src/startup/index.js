import { version } from "../../package.json";
import { GAS_TIER_KRYPTON, MaterialEventWrapper } from "../util/material_builder";

console.log(`TBA: Loading version ${version}!`)



StartupEvents.registry("minecraft:block", event => {

});


GTCEuStartupEvents.registry("gtceu:element", event => {
    // da kessoku materials
    event.create("bocchi", 119, 177, -1, null, "Bc", false);
    event.create("kitakita", 120, 180, -1, null, "Ik", false);
    event.create("ryo", 121, 182, -1, null, "Ry", false);
    event.create("nijika", 122, 185, -1, null, "Nj", false);

});



GTCEuStartupEvents.registry("gtceu:material", (event) => {
    const wrapper = new MaterialEventWrapper(event);
    wrapper.create("bocchi")
        .ingot()
        .element("bocchi")
        .blastTemp(10_700, GAS_TIER_KRYPTON)
        .colour(0xFF69B4)
        .flags(GTMaterialFlags.GENERATE_PLATE);
});