import { createContext, useContext, ReactNode, useEffect, useState } from "react"
import { Entry } from "@/types/entry"

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


    const getEntries = async () => {
        const url = `http://localhost:8000/entries`
        try {
            const response = await fetch(url)
            if (!response.ok) {
                throw new Error("Network request failed")
            }
            const data = await response.json() as Entry[]
            setEntries(data)
            setLoading(false)
            setError(null)
        }
        catch (err) {
            let message: string
            if (err instanceof Error) {
                message = (`Proper Error: ${err.message}`)
            }
            else {
                message = (`Unknown Error: ${err}`)
            }
            setError(message)
            setLoading(false)
        }
    }

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