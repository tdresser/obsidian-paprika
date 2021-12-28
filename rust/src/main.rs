use std::io;

mod lib;
use lib::paprika::paprika_login;
use lib::paprika::list_recipes;

#[tokio::main]
async fn main() {
    let stdin = io::stdin();
    let mut username = String::new();
    let mut password = String::new();

    println!("Enter email.");
    stdin.read_line(&mut username).expect("error: unable to read username");
    println!("Enter password.");
    stdin.read_line(&mut password).expect("error: unable to read password");

    username.retain(|c| !c.is_whitespace());
    password.retain(|c| !c.is_whitespace());

    let token = paprika_login(&username, &password).await;
    println!("Hello world {}", token);
    list_recipes(&token).await;
}