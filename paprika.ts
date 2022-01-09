/*import { 
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
} from "./rust/pkg/obsidian_paprika_bg";*/

import uint8array from './rust/pkg/obsidian_paprika_bg.wasm'; 

import { polyfillFetch } from "fetch_polyfill";


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

export class Paprika {
    wasm : WebAssembly.Exports | null = null;

    constructor() {
        polyfillFetch();
    }

    async init() {
        const imports = {};
        console.log("PRE");
        console.log(await WebAssembly.instantiate((uint8array as Uint8Array).buffer, imports));
        //this.wasm = (await WebAssembly.instantiate(uint8array, imports)).exports; 
        //console.log(this.wasm);
    }
        
    async login(email: string, password: string): Promise<string> {
        return await login_js(email, password);
    }

    async getRecipes(token:string): Promise<RecipeEntry[]> {
        const recipeEntryList = await get_recipes_js(token) as RecipeEntryList;
        return listToArray(recipeEntryList);
    }

    async getCategories(token:string): Promise<Category[]> {
        const categoryList = await get_categories_js(token);
        return listToArray(categoryList);
    }

    async getMarkdown(recipe:Recipe, template: string, categories: Category[]) : Promise<string> {
        const categoryList = categoryArrayToList(categories);
        return await get_markdown_js(recipe, template, categoryList);
    }

    async getRecipeById(token: string, recipeEntry : RecipeEntry) : Promise<Recipe> {
        console.log("TOKEN: " + token);
        console.log("ENTRY: " + JSON.stringify(recipeEntry));
        console.log(recipeEntry instanceof RecipeEntry);
        return await get_recipe_by_id_js(token, recipeEntry);
    }

    getDefaultTemplate() : string {
        return get_default_template_js()
    }
}