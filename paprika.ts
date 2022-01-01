import { 
    Recipe, 
    RecipeEntry, 
    Category, 
    RecipeEntryList, 
    get_recipe_by_id_js, 
    login_js, 
    get_recipes_js, 
    get_categories_js, 
    get_markdown_js, 
    get_default_template_js,
    CategoryList
} from "./rust/pkg/obsidian_paprika_bg";

import { polyfillFetch } from "fetch_polyfill";

polyfillFetch();

interface ListInterface<Base> {
    len(): number;
    at(i:number) : Base;
    push(x:Base) : void;
}

function listToArray<Base>(list:ListInterface<Base>): Base[] {
    const result:Base[] = [];
    for (let i = 0; i < list.len(); ++i) {
        result.push(list.at(i));
    }
    return result;
}

function categoryArrayToList(a:Category[]) { 
    const list = new CategoryList();
    for (const v of a) {
        list.push(v);
    }
    return list;
}

export async function login(email: string, password: string): Promise<string> {
    return await login_js(email, password);
}

export async function getRecipes(token:string): Promise<RecipeEntry[]> {
    const recipeEntryList = await get_recipes_js(token) as RecipeEntryList;
    return listToArray(recipeEntryList);
}

export async function getCategories(token:string): Promise<Category[]> {
    const categoryList = await get_categories_js(token);
    return listToArray(categoryList);
}

export async function getMarkdown(recipe:Recipe, template: string, categories: Category[]) : Promise<string> {
    const categoryList = categoryArrayToList(categories);
    return await get_markdown_js(recipe, template, categoryList);
}

export async function getRecipeById(token: string, recipeEntry : RecipeEntry) : Promise<Recipe> {
    console.log("TOKEN: " + token);
    console.log("ENTRY: " + JSON.stringify(recipeEntry));
    console.log(recipeEntry instanceof RecipeEntry);
    return await get_recipe_by_id_js(token, recipeEntry);
}

export function getDefaultTemplate() : string {
    return get_default_template_js()
}