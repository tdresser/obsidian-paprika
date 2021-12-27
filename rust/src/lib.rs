mod utils;

use paprika_api::api;
use wasm_bindgen::prelude::*;

// When the `wee_alloc` feature is enabled, use `wee_alloc` as the global
// allocator.
#[cfg(feature = "wee_alloc")]
#[global_allocator]
static ALLOC: wee_alloc::WeeAlloc = wee_alloc::WeeAlloc::INIT;

#[wasm_bindgen]
extern "C" {
    fn alert(s: &str);
}

#[wasm_bindgen]
pub fn greet() {
    alert("Hello, rust!");
}

pub async fn paprika_login(email: &String, password: &String) -> String {
    let res = api::login(email, password).await;
    match res {
        Ok(t) => {
            return t.token;
        }
        Err(e) => unreachable!(e),
    }
}

async fn list_recipes(token: &String) {
    let recipe_list = api::get_recipes(&token).await.unwrap();

    for (_, recipe_entry) in recipe_list.iter().enumerate() {
        let recipe_future = api::get_recipe_by_id(&token, &recipe_entry.uid).await;
        match recipe_future {
            Ok(recipe) => println!("Recipe: {:?}", recipe),
            Err(e) => println!("Error fetching recipe {}: {}", recipe_entry.uid, e),
        }
    }
}
