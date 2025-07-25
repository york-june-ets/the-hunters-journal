import { useEffect, useState } from "react"
import styles from '@/styles/Journal.module.css'
import { JournalCover } from "@/components/JournalCover"
import { TableOfContents } from "@/components/TableOfContents"
import { useRouter } from "next/router"

export default function Journal() {
    const [open, setOpen] = useState<boolean>(false)
    const router = useRouter()

    useEffect(() => {
        if (router?.query?.state === 'open') {
            setOpen(true)
        }
    }, [router?.query?.state])
    
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