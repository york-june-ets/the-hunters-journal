import { EntriesProvider } from "@/context/EntriesContext"
import { Entries } from "./Entries"
import styles from "@/styles/TableOfContents.module.css"

export const TableOfContents = () => {
    return (
        <div className={styles.tableOfContents}>
            <h1>Table of Contents</h1>
            <EntriesProvider>
                <Entries></Entries>
            </EntriesProvider>
        </div>
    )
}