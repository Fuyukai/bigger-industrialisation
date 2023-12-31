import { RecipeWrapper } from "../util/recipe_wrapper";
import { addCustomBlockTags, addCustomItemTags } from "./common/custom_tags";
import { removeNuggetRecipes } from "./common/fixups";
import { addProgressionRecipes } from "./common/progression";
import { addWireRecipes } from "./common/wires";
import { gatherModSupport } from "./mod_support/mods";

const modSupport = gatherModSupport();

// == Core Event Definitions == //
// Please, do not define your events in files. Instead, add your events here.

ServerEvents.recipes((originalEvent) => {
    console.log("TBA: Customising recipes...")
    let wrappedEvent = new RecipeWrapper(originalEvent);

    // we have an entirely custom progression anyway.
    originalEvent.remove({mod: "gtceu"});

    // pt 1: apply fixups
    removeNuggetRecipes(wrappedEvent);
    addWireRecipes(wrappedEvent);

    // pt 2: apply progression
    addProgressionRecipes(wrappedEvent);

    // pt 3: apply generic mod support
    modSupport.runSafely(() => modSupport.runModRecipes(wrappedEvent));
});

ServerEvents.tags("item", (event) => { 
    console.log("TBA: Adding all item tags...")
    addCustomItemTags(event);

    modSupport.runSafely(() => modSupport.runModItemTags(event));
});

ServerEvents.tags("block", (event) => { 
    console.log("TBA: Adding all block tags...")
    addCustomBlockTags(event); 

    modSupport.runSafely(() => modSupport.runModBlockTags(event));
});