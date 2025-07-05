import { EntriesProvider } from "@/context/EntriesContext"
import { Entries } from "./Entries"
import styles from "@/styles/TableOfContents.module.css"

export const TableOfContents = () => {
    return (
        <div className={styles.tableOfContentsPage}>
            <h1 className={styles.tocTitle}>Table of Contents</h1>
            <EntriesProvider>
                <div className={styles.entriesContainer}>
                    <Entries/>
                </div>
            </EntriesProvider>
        </div>
    )
}