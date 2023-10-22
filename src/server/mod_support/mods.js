import { aaFunctions } from "./mods/aa";
import { createFunctions } from "./mods/create";
import { createNewAgeFunctions } from "./mods/create_new_age";
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
    mods.addModSupport("create_new_age", createNewAgeFunctions).hardRequired();

    // == Soft Required == //
    mods.addModSupport("scannable", scannableFunctions).softRequired();

    // == Not Required == //
    mods.addModSupport("additionaladditions", aaFunctions);

    return mods;
}