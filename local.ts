import readlinePromise from "node:readline/promises";
import { RecipeWrapper, RecipeEntryWrapper, CategoryWrapper, getRecipeById, login_js, get_recipes_js, get_categories_js, get_markdown_js, get_recipe_by_id_js } from "./rust/pkg/obsidian_paprika_bg";

async function login(email: string, password: string): Promise<string> {
    return await login_js(email, password);
}

async function getRecipes(token:string): Promise<RecipeEntryWrapper[]> {
    return await get_recipes_js(token);
}

async function getCategories(token:string): Promise<CategoryWrapper[]> {
    return await get_categories_js(token);
}

async function getMarkdown(recipe:RecipeWrapper, template: string, categories: CategoryWrapper[]) : Promise<string> {
    return await get_markdown_js(recipe, template, categories);
}

async function main() {
    const fetchImport = await import('node-fetch');
    const fetch = (...args:any) => import('node-fetch').then(({default: fetch}) => fetch(...args));

    // Via https://www.npmjs.com/package/node-fetch
    if (!globalThis.fetch) {
        globalThis.fetch = fetch;
        globalThis.Headers = fetchImport.Headers;
        globalThis.Request = fetchImport.Request;
        globalThis.Response = fetchImport.Response;
    }

    const wasm = await import('./rust/pkg/obsidian_paprika_bg');

    const readline = readlinePromise.createInterface({
        input: process.stdin,
        output: process.stdout
    })

    const email = await readline.question("email\n");
    const password = await readline.question("password\n");

    readline.close();

    console.log(email);
    console.log(password);

    const token = await login(email, password);
    const recipes = await getRecipes(token);
    console.log("TOKEN: " + token);
    console.log("RECIPES: " + recipes);
    const recipe = getRecipeById(token, recipes[0]);
    console.log(JSON.stringify(recipe));
    const uid = recipes[0].uid;
    console.log(uid)
    console.log(JSON.stringify(wasm));
}

main();
