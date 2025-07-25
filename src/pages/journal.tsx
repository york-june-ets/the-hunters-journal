import { useContext, useEffect, useState } from "react"
import styles from '@/styles/Journal.module.css'
import { JournalCover } from "@/components/JournalCover"
import { TableOfContents } from "@/components/TableOfContents"
import { useRouter } from "next/router"
import { UserContext } from "@/context/UserContext"

export default function Journal() {
    const [open, setOpen] = useState<boolean>(false)
    const router = useRouter()
    const {token, user, loading, logout} = useContext(UserContext)

    //redirect to home if no local stored customer info
    useEffect(() => {
        if (!loading && (!token || !user)) {router.push('/')}
    }, [token, user, loading])

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
    
    // show nothing while still loading/no local stored customer info
    if (loading || (!token || !user)) {return null}

    return (
        <div>
            <button className="logout" onClick={logout}>Logout</button>
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