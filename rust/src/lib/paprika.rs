use handlebars::Handlebars;
use paprika_api::api::{Category, Recipe, self};
use serde_json::Value;
use wasm_bindgen::{prelude::*};

use crate::lib::handlebars_helpers::newlines_to_bullets;

fn get_category_strings(recipe: &Recipe, categories: &Vec<Category>) -> Vec<String> {
    let mut s:Vec<String> = Vec::new();
    for recipe_category_uid in &recipe.categories {
        for category in categories {
            if *recipe_category_uid == category.uid {
                s.push(category.name.clone());
            }
        }
    }
    return s;
}

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

pub fn get_markdown(
    recipe: &Recipe,
    template: &String,
    categories: &Vec<Category>,
) -> String {
    let mut handlebars = Handlebars::new();
    handlebars.set_strict_mode(true);
    handlebars.register_helper("newlines_to_bullets", Box::new(newlines_to_bullets));

    let mut recipe_value = serde_json::to_value(recipe).unwrap();

    let category_strings = get_category_strings(recipe, categories);
    let categories_value = serde_json::to_value(category_strings).unwrap();
    
    if let Value::Object(o) = &mut recipe_value {
        o.insert("categories".to_string(), categories_value);
    }

    assert!(handlebars
        .register_template_string("template", template)
        .is_ok());
    return handlebars.render("template", &recipe_value).unwrap();
}
