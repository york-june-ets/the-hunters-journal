import { EntriesContext } from "@/context/EntriesContext"
import { useState, useEffect, useContext, useRef } from "react"

export const EntryCard = ({id}: {id: string}) => {
    const entriesContextData = useContext(EntriesContext)
    const entries = entriesContextData.entries
    const entry = entries.find(entry => entry.id === id)
    const [comment, setComment] = useState<string>("")

    if (entriesContextData.loading) return <p>Loading post…</p>
    if (entriesContextData.error) return <p>Error: {entriesContextData.error}</p>

    if(entry === undefined)
    {
        return <p>Entry not found</p>
    }

    const handleChange = (event:React.ChangeEvent<HTMLInputElement>) => {
        setComment(event.target.value)
    }

    const handleSubmit = (event:React.FormEvent) => {
        event.preventDefault()
    }

    return (
        <div id="entry">
            <h2>{entry.title}</h2>
            <p>{entry.body}</p>
            <div id="comments">
                {
                    entry.comments.map( comment => (
                            <p id="comment">{comment}</p>
                    ))
                } 
            </div>
            <form>
                <input placeholder="Add a comment" value={comment} onChange={handleChange}></input>
                <button onSubmit={handleSubmit}>Post</button>
            </form>
        </div>
    )
}