import { useState } from "react"
import styles from '@/styles/Journal.module.css'
import { JournalCover } from "@/components/JournalCover"
import { TableOfContents } from "@/components/TableOfContents"

export default function Journal() {
    const [open, setOpen] = useState<boolean>(false)

    const openJournal = () => {
        setOpen(true)
    }

    const closeJournal = () => {
        setOpen(false)
    }

    return (
        <div>
            {!open && (
                <div className={styles.book} onClick={openJournal}>
                    <JournalCover/>
                </div>
            )}
            {open && (
                <div className={styles.book}>
                    <div className={styles.backCover} onClick={closeJournal}></div>
                    <TableOfContents/>
                </div>
            )}
        </div>
    )
}