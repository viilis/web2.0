import { Context } from "https://deno.land/x/hono@v3.7.4/mod.ts";
import { Eta } from "https://deno.land/x/eta@v3.1.0/src/index.ts";

const eta = new Eta({views: "templates"})

const getRatingHandler = (c: Context) => {
    return c.html(eta.render("index.eta",{}))
}

export default getRatingHandler