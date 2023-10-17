import { aaFunctions } from "./mods/aa";
import { createFunctions } from "./mods/create";
import { scannableFunctions } from "./mods/scannable";
import { ModSupport } from "./registering"

/**
 * @returns {ModSupport}
 */
export const gatherModSupport = () => {
    const mods = new ModSupport();

    // == Hard Required == //
    // Most of these are stubs to just print nice log warnings.
    mods.addModSupport("create", createFunctions).hardRequired();
    mods.addModSupport("gtceu", {}).hardRequired();
    mods.addModSupport("bigglobe", {}).hardRequired();

    // == Soft Required == //
    mods.addModSupport("scannable", scannableFunctions).softRequired();

    // == Not Required == //
    mods.addModSupport("additionaladditions", aaFunctions);

    return mods;
}