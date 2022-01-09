import esbuild from "esbuild";
import process from "process";
import builtins from 'builtin-modules'
import wasmpack from 'esbuild-plugin-wasm-pack';

const prod = (process.argv[2] === 'production');

esbuild.build({
	platform: 'node',
	plugins: [
		wasmpack.wasmPack({
            "path": "rust",
			"profile": "dev",
			"target": "no-modules"
        })
	],
	entryPoints: ['main.ts', 'local.ts'],
	bundle: true,
	external: ['obsidian', ...builtins],
	format: 'cjs',
	watch: !prod,
	target: 'esnext',
	logLevel: "info",
	sourcemap: prod ? false : 'inline',
	treeShaking: true,
	outdir: 'build',
	loader: {
		'.wasm': 'binary'
	}
}).catch((e) => {
	console.log(e);
	process.exit(1)}
);

//fs.copyFileSync("build/main.mjs", "main.js");
// Manually copying obsidian_paprika_bg.js to build, didn't help.