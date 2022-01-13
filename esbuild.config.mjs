import esbuild from "esbuild";
import process from "process";
import builtins from "builtin-modules";
import wasmpack from "esbuild-plugin-wasm-pack";
import path from "path";
import fs from "fs/promises";
import console from "console";

const plugin_name = "obsidian-paprika";

const prod = process.argv[2] === "production";

function addGlobalThisForWasmBindgen(contents) {
	return contents
		.replace(/let wasm_bindgen/g, "wasm_bindgen")
		.replace(/wasm_bindgen/g, "globalThis.wasm_bindgen");
}

async function writeToPluginDirIfNeeded() {
	if (process.env.OBSIDIAN_VAULT) {
		const plugin_dir = path.join(
			process.env.OBSIDIAN_VAULT,
			".obsidian",
			"plugins",
			plugin_name
		);
		try {
			await fs.stat(plugin_dir);
		} catch {
			await fs.mkdir(plugin_dir);
		}

		const hotreload_path = path.join(plugin_dir, ".hotreload");

		try {
			await fs.stat(hotreload_path);
		} catch {
			await fs.writeFile(hotreload_path, "");
		}
		await fs.copyFile(path.join("build", "main.js"), path.join(plugin_dir, "main.js"));
		await fs.copyFile(
			"manifest.json",
			path.join(plugin_dir, "manifest.json")
		);
		console.log("Copied to vault.");
	}
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
							let text = await fs.readFile(args.path, "utf8");
							text = addGlobalThisForWasmBindgen(text);
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
		watch: prod
		? false
		: {
				onRebuild(error, result) {
					writeToPluginDirIfNeeded();
				},
		  },
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
