import esbuild from "esbuild";
import process from "process";
import builtins from 'builtin-modules'
import wasmLoader from 'esbuild-plugin-wasm';
import wasmpack from 'esbuild-plugin-wasm-pack';
import fs from 'fs'

const prod = (process.argv[2] === 'production');

esbuild.build({
	platform: 'node',
	plugins: [
		wasmLoader.wasmLoader(
			{
				// TODO - this is big, but the alternative wasn't working.
				mode:"embedded" 
			}
		),
		wasmpack.wasmPack({
            "path": "rust",
			"profile": "dev",
        })
	],
	entryPoints: ['main.ts', 'local.ts'],
	outExtension: {".js":".mjs"},
	bundle: true,
	external: ['obsidian', 'electron', ...builtins],
	format: 'esm',
	watch: !prod,
	target: 'esnext',
	logLevel: "info",
	sourcemap: prod ? false : 'inline',
	treeShaking: true,
	outdir: 'build',
}).catch(() => process.exit(1));

fs.copyFileSync("build/main.mjs", "main.js");