// const PropertyKey = Java.loadClass("com.gregtechceu.gtceu.api.data.chemical.material.properties.PropertyKey");
import { RecipeWrapper } from "../../util/recipe_wrapper";

const GTUtil = Java.loadClass("com.gregtechceu.gtceu.utils.GTUtil");

// [type, input ingots, output wires, circuit]
const WIREMILL_SETTINGS = [
    ["single", 1, 2, 1],
    ["double", 1, 1, 2],
    ["quadruple", 2, 1, 4],
    ["octal", 4, 1, 8],
    ["hex", 8, 1, 16]
];

/** 
 * (Re-)adds all wire recipes, including Create-based recipes.
 * 
 * @param {RecipeWrapper} event 
 */
export const addWireRecipes = (event) => {
    // rolling machine doesn't have EMI compat and JEMI is broken as of the time of writing..
    // so we do what new age does and use the saw.

    // local function to capture event
    /** @param {com.gregtechceu.gtceu.api.data.chemical.material.Material} material */
    const doWireRecipes = (material) => {
        const materialName = material.getName();
        /** @type {Internal.WireProperties} */
        const wireProps = material.properties.getProperty(PropertyKey.WIRE);
        if (!wireProps) return;  // yikes!
        
        
        if (GTUtil.getTierByVoltage(wireProps.getVoltage()) <= GTValues.HV) {
            // the GT wiremill only unlocks at HV, so add create wire recipes for HV 
            event.createSawing(`2x gtceu:${materialName}_single_wire`, `#c:${materialName}_plates`)
                .id(`nijika:wires/${materialName}/single_cutting`);
        }

        // yuck.
        for (let [type, ingots, wires, circuit] of WIREMILL_SETTINGS) {
            event.kjs.recipes.gtceu.wiremill(`nijika:wires/${materialName}/${type}_wiremill`)
                .itemInputs(`${ingots}x #c:${materialName}_ingots`)
                .itemOutputs(`${wires}x gtceu:${materialName}_${type}_wire`)
                .circuit(circuit)
                .duration(material.getMass())
                .EUt(8);
        }

        const pairs = [
            ["single", "double"],
            ["double", "quadruple"],
            ["quadruple", "octal"],
            ["octal", "hex"]
        ]

        for (let [first, second] of pairs) {
            event.shapeless(
                `gtceu:${material}_${second}_wire`, 
                `2x gtceu:${material}_${first}_wire`
            );
            event.shapeless(
                `2x gtceu:${material}_${first}_wire`,
                `gtceu:${material}_${second}_wire`
            );
        }
    }

    for (let material of GTRegistries.MATERIALS.values()) {
        doWireRecipes(material);
    }
}