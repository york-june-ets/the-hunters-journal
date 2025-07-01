import styles from '@/styles/JournalCover.module.css'

export const JournalCover = () => {
    return (
        <div className={styles.coverBackground}>
            <div className={styles.coverContent}>
                <h1 className={styles.siteTitle}>The Hunter's Journal</h1>
                <p>by Octavia Blake</p>
            </div>
        </div>
    )
}