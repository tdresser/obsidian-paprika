import esbuild from "esbuild";
import process from "process";
import builtins from 'builtin-modules'
import wasmLoader from 'esbuild-plugin-wasm';

const prod = (process.argv[2] === 'production');

esbuild.build({
	plugins: [wasmLoader.wasmLoader()],
	entryPoints: ['main.ts', 'local.ts'],
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
