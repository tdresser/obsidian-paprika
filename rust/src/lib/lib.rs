// use paprika_api::api;
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
/* 
#[wasm_bindgen]
#[allow(dead_code)]
pub async fn login(email: String, password: String) -> String {
    return api::login(&email, &password).await.unwrap().token;
}

#[wasm_bindgen]
#[allow(dead_code)]
pub async fn get_recipes(token: String) -> JsValue {
    return JsValue::from_serde(
        &api::get_recipes(&token).await.unwrap()).unwrap();
}

#[wasm_bindgen]
#[allow(dead_code)]
pub async fn get_categories(token: String) -> JsValue {
    return JsValue::from_serde(
        &api::get_categories(&token).await.unwrap()).unwrap();
}

#[wasm_bindgen]
#[allow(dead_code)]
pub async fn get_recipe_by_id(token: String, uid:String) -> JsValue {
    return JsValue::from_serde(
        &api::get_recipe_by_id(&token, &uid).await.unwrap()).unwrap();
}
*/