pub mod paprika;
mod handlebars_helpers;

use paprika_api::api::{self, Recipe, Category, RecipeEntry};
use serde::{Serialize, Deserialize};
use wasm_bindgen::prelude::*;

// When the `wee_alloc` feature is enabled, use `wee_alloc` as the global
// allocator.
#[cfg(feature = "wee_alloc")]
#[global_allocator]
static ALLOC: wee_alloc::WeeAlloc = wee_alloc::WeeAlloc::INIT;

#[wasm_bindgen(js_name="RecipeEntry")]
#[derive(Serialize, Deserialize)]
pub struct RecipeEntryWrapper (RecipeEntry);

#[wasm_bindgen(js_class="RecipeEntry")]
impl RecipeEntryWrapper {
    #[allow(dead_code)]
    #[wasm_bindgen(getter)]
    pub fn uid(&self) -> String {
        return self.0.uid.clone();
    }

    #[allow(dead_code)]
    #[wasm_bindgen(getter)]
    pub fn hash(&self) -> String {
        return self.0.hash.clone();
    }
}

#[wasm_bindgen(js_name="Recipe")]
#[derive(Serialize, Deserialize)]
pub struct RecipeWrapper (Recipe);

#[wasm_bindgen(js_name="Category")]
#[allow(dead_code)]
struct CategoryWrapper (Category);

#[wasm_bindgen]
extern "C" {
    fn alert(s: &str);
    #[wasm_bindgen(js_namespace = console)]
    fn log(s: &str);
}

#[wasm_bindgen()]
#[allow(dead_code)]
pub async fn login_js(email: String, password: String) -> String {
    return api::login(&email, &password).await.unwrap().token;
}

#[wasm_bindgen()]
#[allow(dead_code)]
pub async fn get_recipes_js(token: String) -> JsValue {
    return JsValue::from_serde(
        &api::get_recipes(&token).await.unwrap()).unwrap();
}

#[wasm_bindgen()]
#[allow(dead_code)]
pub async fn get_categories_js(token: String) -> JsValue {
    return JsValue::from_serde(
        &api::get_categories(&token).await.unwrap()).unwrap();
}

#[wasm_bindgen]
#[allow(dead_code)]
pub async fn get_recipe_by_id_js(token: String, recipe_entry:RecipeEntryWrapper) -> RecipeWrapper {
    return 
        RecipeWrapper(api::get_recipe_by_id(&token, &recipe_entry.0.uid).await.unwrap())
    
}


#[wasm_bindgen]
#[allow(dead_code)]
pub fn get_markdown_js(
    recipe: RecipeWrapper,
    template: String,
    categories_value: JsValue,
) -> String {
    log("A");
    let categories = categories_value.into_serde::<Vec<Category>>().unwrap();
    log("C");
    return paprika::get_markdown(&recipe.0, &template, &categories);
}