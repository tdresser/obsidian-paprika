use std::{io, fs};
use obsidian_paprika::paprika::get_markdown;
use paprika_api::api;
use tokio;

// What's the difference between photo_url and image_url?

#[tokio::main]
async fn main() {
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

    let recipe = api::get_recipe_by_id(&token, &recipe_entries[1].uid).await.unwrap();    

    let template = &fs::read_to_string("../template.md").unwrap();
    let markdown = get_markdown(&recipe, &template, &categories);

    println!("{}", markdown);
}