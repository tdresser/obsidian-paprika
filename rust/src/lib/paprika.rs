use handlebars::Handlebars;
use paprika_api::api::{self, Category, Recipe, RecipeEntry};
use serde_json::Value;

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
