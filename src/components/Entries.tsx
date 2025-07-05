import { EntriesContext } from "@/context/EntriesContext"
import { useContext, useState, useEffect } from "react"
import styles from '@/styles/Entries.module.css'
import Link from "next/link"
import { slugify } from "@/lib/entries"
import { Entry } from "@/types/entry"

const ENTRIES_PER_PAGE = 10

export const Entries: React.FC = () => {
    const [currentPage, setCurrentPage] = useState<number>(1)
    const entriesContextData = useContext(EntriesContext)
    const entries = entriesContextData.entries

    const totalPages = Math.ceil(entries.length / ENTRIES_PER_PAGE)

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
        return <p>Loading entries....</p>
    }

    if(entriesContextData.error) {
        return <p>Error loading entries: {entriesContextData.error}</p>
    }

    const getTitleByEntry = (entry: Entry) => {
        if (entry) {return (<Link href={`/${slugify(entry.title)}`}>{entry.title}</Link>)}
        return (<p>Entry not found</p>)
    }

    return (
        <>
            <div className={styles.entries}>
                {
                    entries.map( (entry, entryNumber) => (
                        <div className={styles.entryTitle} key={entry.id}>{entryNumber + 1}.&nbsp;{getTitleByEntry(entry)}</div>    
                    ))
                }   
            </div>
            <div className={styles.pagination}>
                <button className={styles.paginationButton} onClick={handlePrevClick}>&larr;</button>
                <span>Page {currentPage} of {totalPages}</span>
                <button className={styles.paginationButton} onClick = {handleNextClick}>&rarr;</button>
            </div>
        </>
    )
}