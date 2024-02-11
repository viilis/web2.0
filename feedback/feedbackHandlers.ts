import { getFeedbackAmount, addFeedback } from "./feedbackServices.ts";
import { Context } from "https://deno.land/x/hono@v3.7.4/mod.ts";
import { Eta } from "https://deno.land/x/eta@v3.1.0/src/index.ts";

const eta = new Eta({views: "templates"})

const getFeedbackHandler = async (c: Context) => {
    const id = c.req.param("id")

    if(id.length == 0 || Number(id) > 5) {
        return c.status(400)
    }

    const amount = await getFeedbackAmount(id)

    const data = {
        id: id,
        count: amount
    }

    return c.html(eta.render("feedback.eta", data))
}

const postFeedbackHandler = async (c: Context) => {
    const id = c.req.param("id")

    if(id.length == 0 || Number(id) > 5) {
        return c.status(400)
    }

    await addFeedback(id)

    return c.redirect("/") // PRG-pattern
}

export { getFeedbackHandler, postFeedbackHandler }



