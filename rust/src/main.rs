use std::{io, fs};
use futures::executor::block_on;
use paprika_api::api;

use crate::lib::paprika;

mod lib;

async fn async_main() {
    let stdin = io::stdin();
    let mut email = String::new();
    let mut password = String::new();

    println!("Enter email.");
    stdin.read_line(&mut email).expect("error: unable to read username");
    println!("Enter password.");
    stdin.read_line(&mut password).expect("error: unable to read password");

    email.retain(|c| !c.is_whitespace());
    password.retain(|c| !c.is_whitespace());

    let token = api::login(&email, &password).await.unwrap().token;
    let recipe_entries = api::get_recipes(&token).await.unwrap();
    let categories = api::get_categories(&token).await.unwrap();

    let recipe = api::get_recipe_by_id(&token, &recipe_entries[0].uid).await.unwrap();    

    //let categories_string = serde_json::to_string(&categories).unwrap();
    //fs::write("tests/categories.json", categories_string).expect("Unable to write file");

    let template = &fs::read_to_string("template.md").unwrap();
    let markdown = paprika::get_markdown(&recipe, &template, &categories);

    println!("{}", markdown);
}

fn main() {
    block_on(async_main());
}