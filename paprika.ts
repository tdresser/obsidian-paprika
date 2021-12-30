import { 
    Recipe, 
    RecipeEntry, 
    Category, 
    RecipeEntryList, 
    get_recipe_by_id_js, 
    login_js, 
    get_recipes_js, 
    get_categories_js, 
    get_markdown_js 
} from "./rust/pkg/obsidian_paprika_bg";

import {become} from "ts_util";

export async function login(email: string, password: string): Promise<string> {
    return await login_js(email, password);
}

export async function getRecipes(token:string): Promise<RecipeEntry[]> {
    const recipeEntryList = await get_recipes_js(token) as RecipeEntryList;
    const recipeEntries:RecipeEntry[] = [];
    for (let i = 0; i < recipeEntryList.len(); ++i) {
        const recipe = recipeEntryList.at(i);
        become(recipe, RecipeEntry);
        recipeEntries.push(recipe);
    }
    console.log(recipeEntries);
    return recipeEntries;
}

export async function getCategories(token:string): Promise<Category[]> {
    return await get_categories_js(token);
}

export async function getMarkdown(recipe:Recipe, template: string, categories: Category[]) : Promise<string> {
    return await get_markdown_js(recipe, template, categories);
}

export async function getRecipeById(token: string, recipeEntry : RecipeEntry) : Promise<Recipe> {
    console.log("TOKEN: " + token);
    console.log("ENTRY: " + JSON.stringify(recipeEntry));
    console.log(recipeEntry instanceof RecipeEntry);
    return await get_recipe_by_id_js(token, recipeEntry);
}