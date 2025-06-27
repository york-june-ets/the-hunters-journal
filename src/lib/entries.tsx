import { Entry } from "@/types/entry"

export const getEntries = async () => {
    const url = `http://localhost:8000/entries`
    const response = await fetch(url, {
        method: "GET"
    })
    if (!response.ok) {
        throw new Error(`Error fetching entries`)
    }
    return await response.json()
}

export const slug = (title: string) => {
  return title.toLowerCase().replace(/\s+/g, '-')
}

export const getEntryBySlug = async (entrySlug: string) => {
    const entries = await getEntries()
    return entries.find((entry: Entry) => slug(entry.title) === entrySlug)
}

export const postComment = async (entry: Entry, comment: string): Promise<string> => {
    const updatedEntry = {
        ...entry,
        comments: [...entry.comments, comment]
    }
    const url = `http://localhost:8000/entries/${entry.id}`
    const response = await fetch(url, {
        method: "PUT",
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(updatedEntry)
    })
    if (!response.ok) {
        throw new Error(`Error posting comment`)
    }
    return await response.json()
}
