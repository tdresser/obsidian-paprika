use std::{io, fs};
use paprika_api::api;

use crate::lib::paprika;

mod lib;

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

    let token = api::login(&email, &password).await.unwrap();
    let recipe_list = api::get_recipes(&token.token).await.unwrap();
    let categories = api::get_categories(&token.token).await.unwrap();

    let categories_string = serde_json::to_string(&categories).unwrap();
    fs::write("tests/categories.json", categories_string).expect("Unable to write file");

    let template = &fs::read_to_string("template.md").unwrap();
    let markdown = paprika::get_markdown(&token.token, &recipe_list[0], &template, &categories).await;

    println!("{}", markdown);
}