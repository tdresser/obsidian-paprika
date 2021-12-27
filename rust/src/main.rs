use futures::executor::block_on;

use std::io;

mod lib;
use ::lib::paprika_login;
use ::lib::list_recipes;

#[tokio::main]
async fn main() {
    let stdin = io::stdin();
    let mut username = String::new();
    let mut password = String::new();

    stdin.read_line(&mut username).expect("error: unable to read username");
    stdin.read_line(&mut password).expect("error: unable to read password");

    let token = paprika_login(&username, &password).await;
    println!("Hello world {}", token);
    list_recipes(&token).await;
}