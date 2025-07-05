import { Entry } from "@/types/entry"

export const fetchEntries = async () => {
    const url = `/api/entries`
    const response = await fetch(url, {
        method: "GET"
    })
    if (!response.ok) {
        throw new Error(`Failed to fetch entries`)
    }
    return await response.json()
}

export const slugify = (title: string) => {
  return title.toLowerCase().replace(/\s+/g, '-')
}

export const fetchEntrySlugs = async () => {
    const entries = await fetchEntries()
    const titles = entries.map((entry: Entry) => slugify(entry.title))
    return titles
}

// export const fetchComments = async (entryId: string) => {
//     const url = `http://localhost:8000/entries/${entryId}`
//     const response = await fetch(url, {
//         method: "GET"
//     })
//     if (!response.ok) {
//         throw new Error(`Error fetching comments`)
//     }
//     const data = await response.json()
//     return data.comments
// }

// export const postComment = async (entry: Entry, comment: string): Promise<string> => {
//     const updatedEntry = {
//         ...entry,
//         comments: [...entry.comments, comment]
//     }
//     const url = `http://localhost:8000/entries/${entry.id}`
//     const response = await fetch(url, {
//         method: "PUT",
//         headers: {'Content-Type': 'application/json'},
//         body: JSON.stringify(updatedEntry)
//     })
//     if (!response.ok) {
//         throw new Error(`Error posting comment`)
//     }
//     return await response.json()
// }
