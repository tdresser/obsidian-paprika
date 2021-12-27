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

pub async fn paprika_login(email: String, password: String) -> String {
    let res = api::login(&email, &password).await;
    match res {
        Ok(t) => {
            return t.token;
        }
        Err(e) => unreachable!(e),
    }
}
