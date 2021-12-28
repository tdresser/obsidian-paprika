use handlebars::Handlebars;
use paprika_api::api::{self, Category, Recipe, RecipeEntry};

use crate::lib::handlebars_helpers::newlines_to_bullets;

pub async fn get_markdown(
    token: &String,
    recipe_entry: &RecipeEntry,
    template: &String,
    categories: &Vec<Category>,
) -> String {
    let recipe = api::get_recipe_by_id(&token, &recipe_entry.uid).await.unwrap();    

    let mut handlebars = Handlebars::new();
    handlebars.set_strict_mode(true);
    handlebars.register_helper("newlines_to_bullets", Box::new(newlines_to_bullets));

    assert!(handlebars
        .register_template_string("template", template)
        .is_ok());
    return handlebars.render("template", &recipe).unwrap();
}
