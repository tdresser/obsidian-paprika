// @ts-ignore
import readline from "node:readline/promises";
import {Paprika} from "paprika";

async function main() {

    const paprika = new Paprika();
    await paprika.init();
    console.log(paprika.getDefaultTemplate());

    /*
    const rl = readline.createInterface({
        input: process.stdin,
        output: process.stdout
    })

    const email = await rl.question("email\n");
    const password = await rl.question("password\n");

    rl.close();

    const token = await login(email, password);
    const recipes = await getRecipes(token);
    const recipe = await getRecipeById(token, recipes[0]);
    const categories = await getCategories(token);
    const template = getDefaultTemplate();

    console.log(await getMarkdown(recipe, template, categories));*/
}

main();
