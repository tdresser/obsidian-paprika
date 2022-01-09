import fetch, {Headers, Request, Response} from "node-fetch-commonjs";

// Required until https://github.com/seanmonstar/reqwest/issues/910 is resolved.

export function polyfillFetch() {
    // Via https://github.com/node-fetch/node-fetch.
    if (!globalThis.fetch) {
        // @ts-ignore
        globalThis.fetch = fetch;
        // @ts-ignore
        globalThis.Headers = Headers;
        // @ts-ignore
        globalThis.Request = Request;
        // @ts-ignore
        globalThis.Response = Response;
    }
}