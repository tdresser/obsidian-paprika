async function main() {
    const fetch = (...args:any) => import('node-fetch').then(({default: fetch}) => fetch(...args));

    // Via https://www.npmjs.com/package/node-fetch
    if (!globalThis.fetch) {
        globalThis.fetch = fetch;
        globalThis.Headers = fetch.Headers;
        globalThis.Request = fetch.Request;
        globalThis.Response = fetch.Response;
    }

    const wasm = await import('./rust/pkg/obsidian_paprika_bg');
    console.log(wasm);
}

main();
