import readlinePromise from "node:readline/promises";


async function main() {
    const fetchImport = await import('node-fetch');
    const fetch = (...args:any) => import('node-fetch').then(({default: fetch}) => fetch(...args));

    // Via https://www.npmjs.com/package/node-fetch
    if (!globalThis.fetch) {
        globalThis.fetch = fetch;
        globalThis.Headers = fetchImport.Headers;
        globalThis.Request = fetchImport.Request;
        globalThis.Response = fetchImport.Response;
    }

    const wasm = await import('./rust/pkg/obsidian_paprika_bg');

    const readline = readlinePromise.createInterface({
        input: process.stdin,
        output: process.stdout
      })

    const email = await readline.question("email\n");
    const password = await readline.question("password\n");

    readline.close();

    console.log(email);
    console.log(password);

    const token = await wasm.login(email, password);
    console.log("TOKEN: " + token);
    console.log(JSON.stringify(wasm));
}

main();
