import { EntriesContext } from "@/context/EntriesContext"
import { useState, useEffect, useContext, useRef } from "react"

export const Entry = ({id}: {id: string}) => {
    const entriesContextData = useContext(EntriesContext)
    const entries = entriesContextData.entries
    const entry = entries.find(entry => entry.id === id)

    if (entriesContextData.loading) return <p>Loading post…</p>
    if (entriesContextData.error) return <p>Error: {entriesContextData.error}</p>

    if(entry === undefined)
    {
        return <p>Entry not found</p>
    }

    return (
        <div id="entry">
            <h1>{entry.title}</h1>
            <p>{entry.body}</p>
            <div id="comments">
                {
                    entry.comments.map( comment => (
                            <p id="comment">{comment}</p>
                    ))
                } 
            </div>
        </div>
    )
}