import { Entry } from "@/types/entry"

export const fetchEntries = async () => {
    // const url = `/api/entries`
    const url = `http://localhost:8080/api/entries`
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