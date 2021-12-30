// @ts-ignore
import readline from "node:readline/promises";
import {readFile} from "fs/promises"

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
    const template = await (await readFile("rust/template.md")).toString();

    console.log(await getMarkdown(recipe, template, categories));
}

main();
