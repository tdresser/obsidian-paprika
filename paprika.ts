import * as foo from './rust/pkg/obsidian_paprika_bg.wasm'; 
import './rust/pkg/obsidian_paprika';

import { polyfillFetch } from "fetch_polyfill";

type Category = wasm_bindgen.Category;
const CategoryList = wasm_bindgen.CategoryList;
type Recipe = wasm_bindgen.Recipe;
const RecipeEntry = wasm_bindgen.RecipeEntry;
type RecipeEntry = wasm_bindgen.RecipeEntry;
type RecipeEntryList = wasm_bindgen.RecipeEntryList;

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
        //const imports = {};
        const { get_default_template_js } = wasm_bindgen;
        console.log(wasm_bindgen)

        console.log("ABOUT TO BINDGEN");
        await wasm_bindgen(uint8array);

        console.log("PRE");
        console.log(JSON.stringify(wasm_bindgen));
        console.log(get_default_template_js())
        console.log("POST");
        //console.log(uint8array);
        //console.log(await WebAssembly.instantiate((uint8array as Uint8Array).buffer, imports));
        //this.wasm = (await WebAssembly.instantiate(uint8array, imports)).exports; 
        //console.log(this.wasm);
    }
        
    async login(email: string, password: string): Promise<string> {
        return await wasm_bindgen.login_js(email, password);
    }

    async getRecipes(token:string): Promise<RecipeEntry[]> {
        const recipeEntryList = await wasm_bindgen.get_recipes_js(token) as RecipeEntryList;
        return listToArray(recipeEntryList);
    }

    async getCategories(token:string): Promise<Category[]> {
        const categoryList = await wasm_bindgen.get_categories_js(token);
        return listToArray(categoryList);
    }

    async getMarkdown(recipe:Recipe, template: string, categories: Category[]) : Promise<string> {
        const categoryList = categoryArrayToList(categories);
        return await wasm_bindgen.get_markdown_js(recipe, template, categoryList);
    }

    async getRecipeById(token: string, recipeEntry : RecipeEntry) : Promise<Recipe> {
        console.log("TOKEN: " + token);
        console.log("ENTRY: " + JSON.stringify(recipeEntry));
        console.log(recipeEntry instanceof RecipeEntry);
        return await wasm_bindgen.get_recipe_by_id_js(token, recipeEntry);
    }

    getDefaultTemplate() : string {
        return wasm_bindgen.get_default_template_js()
    }
}