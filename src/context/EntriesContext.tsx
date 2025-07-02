import { createContext, useContext, ReactNode, useEffect, useState } from "react"
import { Entry } from "@/types/entry"
import { fetchEntries } from "@/lib/entries"

interface EntriesContextValue {
    entries: Entry[]
    loading: boolean
    error: string | null
}

export const EntriesContext = createContext<EntriesContextValue>({
    entries: [],
    loading: false,
    error: null
})

export const EntriesProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [entries, setEntries] = useState<Entry[]>([])
    const [loading, setLoading] = useState<boolean>(true)
    const [error, setError] = useState<string | null>(null)

    useEffect(() => {
        const loadEntries = async () => {
            try {
                const data: Entry[] = await fetchEntries()
                setEntries(data)
            } catch (error) {
                setError(`Failed to load entries`)
            } finally {
                setLoading(false)
            }
        }
        loadEntries()
        return
    }, [])

    return (
        <EntriesContext.Provider value={{
            entries: entries,
            loading: loading,
            error: error
        }}>
            {children}
        </EntriesContext.Provider>
    )
}