mod handlebars_helpers;
pub mod paprika;

use paprika_api::api::{self, Category, Recipe, RecipeEntry};
use serde::{Deserialize, Serialize};
use wasm_bindgen::prelude::*;

// When the `wee_alloc` feature is enabled, use `wee_alloc` as the global
// allocator.
#[cfg(feature = "wee_alloc")]
#[global_allocator]
static ALLOC: wee_alloc::WeeAlloc = wee_alloc::WeeAlloc::INIT;

// HACK: we can't pass out Vec<T>'s, so provide a simple list type.
#[macro_export]
macro_rules! hack_wasm_list {
    ( $base:ident, $list:ident ) => {
        #[derive(Serialize, Deserialize)]
        #[wasm_bindgen]
        pub struct $list(Vec<$base>);

        #[wasm_bindgen]
        impl $list {
            pub fn len(&self) -> usize {
                return self.0.len();
            }

            pub fn at(&self, i: usize) -> $base {
                return self.0[i].clone();
            }
        }
    };
}

hack_wasm_list!(RecipeEntry, RecipeEntryList);
hack_wasm_list!(Category, CategoryList);

#[wasm_bindgen]
extern "C" {
    fn alert(s: &str);
    #[wasm_bindgen(js_namespace = console)]
    fn log(s: &str);
}

#[wasm_bindgen()]
#[allow(dead_code)]
pub async fn login_js(email: String, password: String) -> String {
    console_error_panic_hook::set_once();
    log(&format!("Trying to log in {} {}", email, password));
    let token = match api::login(&email, &password).await {
        Ok(token) => token.token,
        Err(error) => {
            panic!("Error parsing token {:?}", error);
        }
    };
    log("Got token");
    return token;
}

#[wasm_bindgen()]
#[allow(dead_code)]
pub async fn get_recipes_js(token: String) -> RecipeEntryList {
    let recipe_entries = api::get_recipes(&token).await.unwrap();
    return RecipeEntryList(recipe_entries);
}

#[wasm_bindgen()]
#[allow(dead_code)]
pub async fn get_categories_js(token: String) -> CategoryList {
    let categories = api::get_categories(&token).await.unwrap();
    return CategoryList(categories);
}

#[wasm_bindgen]
#[allow(dead_code)]
pub async fn get_recipe_by_id_js(token: String, recipe_entry: RecipeEntry) -> Recipe {
    return api::get_recipe_by_id(&token, &recipe_entry.uid)
            .await
            .unwrap();
}

#[wasm_bindgen]
#[allow(dead_code)]
pub fn get_markdown_js(
    recipe: Recipe,
    template: String,
    category_list: CategoryList,
) -> String {
    return paprika::get_markdown(&recipe, &template, &category_list.0);
}
