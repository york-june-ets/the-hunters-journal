import { EntriesContext } from "@/context/EntriesContext"
import { useContext, useState, useEffect } from "react"
import { EntryCard } from "./EntryCard"

const PLANS_PER_PAGE = 12

export const Entries: React.FC = () => {
    const [currentPage, setCurrentPage] = useState<number>(1)
    const entriesContextData = useContext(EntriesContext)
    const entries = entriesContextData.entries

    const totalPages = Math.ceil(entries.length / PLANS_PER_PAGE)

    const handlePrevClick = () => {
        if(currentPage > 1) {
            setCurrentPage(currentPage-1)
        }
        return
    }
    const handleNextClick = () => {
        if(currentPage < totalPages) {
            setCurrentPage(currentPage+1)
        }
        return
    }

    if(entriesContextData.loading) {
        return <p>Loading plans....</p>
    }
    if(entriesContextData.error) {
        return <p>Error loading plans: {entriesContextData.error}</p>
    }

    return (
        <>
            <div className="entries">
                {
                    entries.map( entry => (
                            <EntryCard key={entry.id} id={entry.id}></EntryCard>
                    ))
                }   
            </div>
            <div className="pagination">
                <button onClick={handlePrevClick}>Prev</button>
                <span>Page {currentPage} of {totalPages}</span>
                <button onClick = {handleNextClick}>Next</button>
            </div>
        </>
    )
}