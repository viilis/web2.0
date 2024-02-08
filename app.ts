import { Hono} from "https://deno.land/x/hono@v3.7.4/mod.ts";
import { getFeedbackHandler, postFeedbackHandler, getRatingHandler } from "./feedbackHandlers.ts"

const app = new Hono();

app.get("/", (c) => getRatingHandler(c))

app.get("/feedbacks/:id", async (c) => await getFeedbackHandler(c))
app.post("/feedbacks/:id", async (c) => await postFeedbackHandler(c))

export default app;
