import { RecipeWrapper } from "../util/recipe_wrapper";
import { addCustomBlockTags, addCustomItemTags } from "./common/custom_tags";
import { gatherModSupport } from "./mod_support/mods";

const modSupport = gatherModSupport();

// == Core Event Definitions == //
// Please, do not define your events in files. Instead, add your events here.

ServerEvents.recipes((originalEvent) => {

    let wrappedEvent = new RecipeWrapper(originalEvent);


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