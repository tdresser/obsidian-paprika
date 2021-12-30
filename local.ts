// @ts-ignore
import readlinePromise from "node:readline/promises";
import fetch, {Headers, Request, Response} from "node-fetch";
import { Recipe, RecipeEntry, Category, get_recipe_by_id_js, login_js, get_recipes_js, get_categories_js, get_markdown_js } from "./rust/pkg/obsidian_paprika_bg";

async function login(email: string, password: string): Promise<string> {
    return await login_js(email, password);
}

async function getRecipes(token:string): Promise<RecipeEntry[]> {
    return await get_recipes_js(token);
}

async function getCategories(token:string): Promise<Category[]> {
    return await get_categories_js(token);
}

async function getMarkdown(recipe:Recipe, template: string, categories: Category[]) : Promise<string> {
    return await get_markdown_js(recipe, template, categories);
}

async function getRecipeById(token: string, recipeEntry : RecipeEntry) : Promise<Recipe> {
    return await get_recipe_by_id_js(token, recipeEntry);
}

async function main() {
    // Via https://github.com/node-fetch/node-fetch.
    if (!globalThis.fetch) {
        // @ts-ignore
        globalThis.fetch = fetch;
        // @ts-ignore
        globalThis.Headers = Headers;
        // @ts-ignore
        globalThis.Request = Request;
        // @ts-ignore
        globalThis.Response = Response;
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
