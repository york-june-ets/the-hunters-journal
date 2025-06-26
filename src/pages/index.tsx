import { EntriesProvider } from "@/context/EntriesContext"
import { Entries } from "@/components/Entries"

export default function HomePage() {
    return (
        <div id="home">
            <h1>Journal Entries</h1>
            <EntriesProvider>
                <Entries></Entries>
            </EntriesProvider>
        </div>
    )
}