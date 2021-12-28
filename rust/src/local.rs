use std::{fs};
use paprika_api::api::Recipe;

mod lib;
use lib::paprika;

fn main() {
    let json = &fs::read_to_string("tests/example_recipe.json").unwrap();
    let template = &fs::read_to_string("template.md").expect("Couldn't read template.");

    let recipe_results:Result<Recipe, _> = serde_json::from_str(json);
    let recipe = recipe_results.unwrap();
    let markdown = paprika::get_markdown(&recipe, template);
    print!("{}", markdown);

}