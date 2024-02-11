import { Context } from "https://deno.land/x/hono@v3.7.4/mod.ts";
import { Course } from "./courseTypes.ts";
import { Eta } from "https://deno.land/x/eta@v3.1.0/src/index.ts";
import { allCourses, getCourse, addCourse, removeCourse  } from "./courseService.ts";

const eta = new Eta({views: "templates"})

const getCoursesHandler = async (c: Context) => {
    const courses = {data: await allCourses()}
    return c.html(eta.render("courses.eta", courses))
}

const postCourseHandler = async (c: Context) => {
    const formData = await c.req.parseBody()

    if(!formData.name || !(typeof formData.name === "string")) {
        return c.status(400)
    }

    const courseData: Course = {
        uuid: crypto.randomUUID(),
        name: formData.name
    }

    await addCourse(courseData)

    return c.redirect("/courses")
} 

const getOneCourseHandler = async (c: Context) => {
    const id = c.req.param("id")

    if(!id) {
        return c.status(400)
    }

    const course = await getCourse(id) as string

    return c.html(eta.render("course.eta", {name: course }))
}

const deleteOneCourseHandler = async (c: Context) => {
    const id = c.req.param("id")

    if(!id) {
        return c.status(400)
    }

    await removeCourse(id)

    return c.redirect("/courses")
}

export { getCoursesHandler, postCourseHandler, getOneCourseHandler, deleteOneCourseHandler }