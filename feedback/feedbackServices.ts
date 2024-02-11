const addFeedback = async (id:string) => {
    const kv = await Deno.openKv();

    let currentAmount = await getFeedbackAmount(id)
    currentAmount++

    await kv.set([id], currentAmount)
}

const getFeedbackAmount = async (id: string): Promise<number> => {
    const kv = await Deno.openKv();
    const entry = await kv.get([id])

    return entry.value as number ?? 0
}


export {
    addFeedback,
    getFeedbackAmount
}