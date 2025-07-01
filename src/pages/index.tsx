import { JSX, useEffect, useState } from "react"
import { JournalCover } from "@/components/JournalCover"
import { TableOfContents } from "@/components/TableOfContents"

export default function Journal() {
    const [component, setComponent] = useState<JSX.Element>(<JournalCover></JournalCover>)

    const openJournal = () => {
        setComponent(<TableOfContents></TableOfContents>)
    }

    return (
        <div id="book">
            <button className="component" onClick={openJournal}>{component}</button>
        </div>
    )
}