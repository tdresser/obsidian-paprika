var __defProp = Object.defineProperty;
var __markAsModule = (target) => __defProp(target, "__esModule", { value: true });

// rust/pkg/obsidian_paprika_bg.js
var obsidian_paprika_bg_exports = {};
__markAsModule(obsidian_paprika_bg_exports);

// wasm-deferred:/Users/tdresser/personal/git/obsidian-paprika/rust/pkg/obsidian_paprika_bg.wasm
var obsidian_paprika_bg_default = "./obsidian_paprika_bg-WMQHLF7X.wasm";

// wasm-module:/Users/tdresser/personal/git/obsidian-paprika/rust/pkg/obsidian_paprika_bg.wasm
var imports = {};
async function loadWasm(module2, imports2) {
  if (typeof module2 === "string") {
    const moduleRequest = await fetch(module2);
    if (typeof WebAssembly.instantiateStreaming === "function") {
      try {
        return await WebAssembly.instantiateStreaming(moduleRequest, imports2);
      } catch (e) {
        if (moduleRequest.headers.get("Content-Type") != "application/wasm") {
          console.warn(e);
        } else {
          throw e;
        }
      }
    }
    module2 = await moduleRequest.arrayBuffer();
  }
  return await WebAssembly.instantiate(module2, imports2);
}
var { instance, module } = await loadWasm(obsidian_paprika_bg_default, imports);
var memory = instance.exports.memory;

// local.ts
console.log("TEST");
console.log(obsidian_paprika_bg_exports);
