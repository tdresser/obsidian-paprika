use std::{fs};
use paprika_api::api::{Recipe, RecipeEntry, Category};

mod lib;
use lib::paprika;

fn main() {
    let recipe_json = &fs::read_to_string("tests/example_recipe.json").unwrap();
    let categories_json = &fs::read_to_string("tests/example_categories.json").unwrap();
    let template = &fs::read_to_string("template.md").expect("Couldn't read template.");

    let recipe = serde_json::from_str(recipe_json).unwrap();
    let categories = serde_json::from_str(categories_json).unwrap();
    let markdown = paprika::get_markdown(&recipe, template, &categories);
    print!("{}", markdown);

}