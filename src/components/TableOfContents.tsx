import { EntriesProvider } from "@/context/EntriesContext"
import { Entries } from "./Entries"

export const TableOfContents = () => {
    return (
        <div id="table-of-contents">
            <h1>Table of Contents</h1>
            <EntriesProvider>
                <Entries></Entries>
            </EntriesProvider>
        </div>
    )
}