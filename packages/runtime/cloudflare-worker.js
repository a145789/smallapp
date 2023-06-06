import { serve } from "https://deno.land/std@0.140.0/http/server.ts";

async function handler(req) {
    const { pathname } = new URL(req.url)


    const entries = [];
    for await (const entry of Deno.readDir(`./packages/runtime/dist`)) {
        entries.push(entry);
    }

    const file = entries.find(i => {
        return i.name === pathname.slice(1)
    })


    if (file && file.name) {
        const str = await Deno.readFile(`./packages/runtime/dist/${file.name}`);
        return new Response(str, {
            headers: {
                "content-type": "text/plain",
            },
        });
    } else {
        return new Response('404', {
            headers: {
                "content-type": "text/html",
            },
        })
    }
}

serve(handler);