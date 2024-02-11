import { Course } from "./courseTypes.ts";

const addCourse = async (data: Course) => {
    const kv = await Deno.openKv()
    await kv.set(["course",data.uuid], data.name)
}

const allCourses = async () =>  {
    const kv = await Deno.openKv()
    const entries = kv.list({prefix: ["course"]})

    const courses: Course[] = [] 

    for await (const entry of entries) {
        const t = entry.key as string[] // TODO: Add proper typing and fix lazy workarounds
        courses.push({uuid: t[1], name: entry.value as string })
    }
    
    return courses
}

const getCourse = async (id: string) => {
    const kv = await Deno.openKv()
    const course = await kv.get(["course", id])

    return course.value
}

const removeCourse = async (id: string) => {
    const kv = await Deno.openKv()
    await kv.delete(["course", id])
}

export { addCourse, allCourses, getCourse, removeCourse }