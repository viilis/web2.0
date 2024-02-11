import { Hono} from "https://deno.land/x/hono@v3.7.4/mod.ts";
import { getFeedbackHandler, postFeedbackHandler } from "./feedback/feedbackHandlers.ts"
import getRatingHandler from "./rating/ratingHandler.ts";
import { getCoursesHandler, postCourseHandler, getOneCourseHandler, deleteOneCourseHandler } from "./courses/courseHandler.ts";

const app = new Hono();

// Rating
app.get("/", (c) => getRatingHandler(c))

// Courses
app.get("/courses", async (c) => await getCoursesHandler(c))
app.get("/courses/:id", async (c) => await getOneCourseHandler(c))

app.post("/courses/:id/remove", async (c) => await deleteOneCourseHandler(c))
app.post("/courses", async (c) => await postCourseHandler(c))


// Feedback
app.get("/feedbacks/:id", async (c) => await getFeedbackHandler(c))

app.post("/feedbacks/:id", async (c) => await postFeedbackHandler(c))

export default app;
