import { version } from "../../package.json";

console.log(`TBA: Loading version ${version}!`)

// gtceu doesn't yet provide the ability to modify materials
// so we just awkwardly hack in...
const GTRegistries = Java.loadClass("com.gregtechceu.gtceu.api.registry.GTRegistries");
const MaterialFlags = Java.loadClass("com.gregtechceu.gtceu.api.data.chemical.material.info.MaterialFlags");
const PropertyKey = Java.loadClass("com.gregtechceu.gtceu.api.data.chemical.material.properties.PropertyKey");

StartupEvents.registry("minecraft:block", event => {

});

GTCEuStartupEvents.registry("gtceu:element", event => {

})

GTCEuStartupEvents.registry("gtceu:material", (event) => {

});