import esbuild from "esbuild";
import process from "process";
import builtins from "builtin-modules";
import wasmpack from "esbuild-plugin-wasm-pack";
import { readFile } from "fs/promises";

const prod = process.argv[2] === "production";

function addGlobalThisForWasmBindgen(contents) {
	return contents
		.replace(/let wasm_bindgen/g, "wasm_bindgen")
		.replace(/wasm_bindgen/g, "globalThis.wasm_bindgen");
}

esbuild
	.build({
		platform: "node",
		plugins: [
			wasmpack.wasmPack({
				path: "rust",
				profile: "dev",
				target: "no-modules",
			}),
			{
				name: "globalThis",
				setup: async (build) => {
					build.onLoad(
						{ filter: /rust\/pkg\/obsidian_paprika.js/ },
						async (args) => {
							console.log("FILTER MATCHED.")
							let text = await readFile(args.path, "utf8");
							text = addGlobalThisForWasmBindgen(text);
							console.log(text);
							return {
								contents: text,
								loader: "js",
							};
						}
					);
				},
			},
		],
		entryPoints: ["main.ts", "local.ts"],
		bundle: true,
		external: ["obsidian", ...builtins],
		format: "cjs",
		watch: !prod,
		target: "esnext",
		logLevel: "info",
		sourcemap: prod ? false : "inline",
		treeShaking: false,
		outdir: "build",
		loader: {
			".wasm": "binary",
		},
	})
	.catch((e) => {
		console.log(e);
		process.exit(1);
	});

//fs.copyFileSync("build/main.mjs", "main.js");
// Manually copying obsidian_paprika_bg.js to build, didn't help.
