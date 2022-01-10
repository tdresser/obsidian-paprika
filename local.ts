import * as readline from 'node:readline/promises';
import {Paprika} from "paprika";

async function main() {

    const paprika = new Paprika();
    await paprika.init();
    //console.log(paprika.getDefaultTemplate());

    const rl = readline.createInterface({
        input: process.stdin,
        output: process.stdout
    })

    const email = await rl.question("email\n");
    const password = await rl.question("password\n");

    rl.close();

    const token = await paprika.login(email, password);
    const recipes = await paprika.getRecipes(token);
    const recipe = await paprika.getRecipeById(token, recipes[0]);
    const categories = await paprika.getCategories(token);
    const template = paprika.getDefaultTemplate();

    console.log(await paprika.getMarkdown(recipe, template, categories));
}

main();
