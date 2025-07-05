import { Entry } from "@/types/entry"
import { useEffect, useState } from "react"
import { slugify } from "@/lib/entries"
import { GetStaticPaths, GetStaticPropsContext } from "next"
import { getEntries, getEntryBySlug } from "./api/entries"
import styles from '@/styles/[slug].module.css'

export const getStaticPaths: GetStaticPaths = async () => {
    const entries = await getEntries()
    const paths = entries.map((entry: { title: string }) => ({
        params: {slug: slugify(entry.title)}
    }))
    return {paths, fallback: false}
}

export const getStaticProps = async ({params}: GetStaticPropsContext) => {
    if (typeof params?.slug !== "string") {return}
    const entry = await getEntryBySlug(params?.slug)
    return { props: {entry}}
}

export default function EntryPage({entry}: {entry: Entry}) {
    // const [comment, setComment] = useState<string>("")
    // const [comments, setComments] = useState<string[]>(entry.comments)
    // const [refresh, setRefresh] = useState<boolean>(false)

    // const handleChange = (event:React.ChangeEvent<HTMLInputElement>) => {
    //     setComment(event.target.value)
    // }

    // const handleSubmit = async (event:React.FormEvent) => {
    //     event.preventDefault()
    //     try {
    //         const success = await postComment(entry, comment)
    //         if (success) {
    //             setRefresh(true) //refetch comments when new comment is posted
    //             setComment("")
    //         }
    //     } catch (error) {
    //         console.error(`Failed to post comment: ${comment}`)
    //     }
    // }

    // useEffect(() => {
    //     const interval = setInterval(async () => {
    //         setComments(await fetchComments(entry.id))
    //     }, 5000)
    //     setRefresh(false)
    //     return () => clearInterval(interval)
    // }, [entry.id, refresh])

    return (
        <div className={styles.book}>
            {/* <div id="comments">
                {
                    comments.map((comment, index) => (
                            <p key={index} id="comment">{comment}</p>
                    ))
                } 
            </div>
            <form onSubmit={handleSubmit}>
                <input placeholder="Add a comment" value={comment} onChange={handleChange}></input>
                <button type="submit">Post</button>
            </form> */}
            <div className={styles.commentsPage}>Comments page</div>
            <div className={styles.entryPage}>
                <h1 className={styles.slugTitle}>{entry.title}</h1>
                <p className={styles.slugBody}>{entry.body}</p>
            </div>
        </div>
    )
}