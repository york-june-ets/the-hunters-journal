import { Entry } from "@/types/entry"
import { useEffect, useState } from "react"
import { fetchEntrySlugs, slugify } from "@/lib/entries"
import { GetStaticPaths, GetStaticPropsContext } from "next"
import { getEntries, getEntryBySlug } from "./api/entries"
import styles from '@/styles/[slug].module.css'
import router from "next/router"

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
    const currentPath = slugify(entry.title)
    const [paths, setPaths] = useState<string[]>([])
    const [currentPathIndex, setCurrentPathIndex] = useState<number>(0)
    const [currentPage, setCurrentPage] = useState<number>(1)
    const totalPages = Math.ceil(paths.length)
    const [paginationError, setPaginationError] = useState<Error | null>(null)

    useEffect(() => {
        const getCurrentState = async () => {
            const paths = await fetchEntrySlugs()
            setPaths(paths)
            const index = paths.indexOf(currentPath)
            setCurrentPathIndex(index)
            setCurrentPage(index+1)
        }
        getCurrentState()
    }, [])

    const handlePrevClick = () => {
        if(currentPage > 1 && currentPathIndex > 0) {
            setCurrentPage(currentPage-1)
            setCurrentPathIndex(currentPathIndex-1)
            router.push(`/${paths[currentPathIndex-1]}`)
        }
        return
    }
    const handleNextClick = () => {
        if(currentPage < totalPages && currentPathIndex < paths.length - 1) {
            setCurrentPage(currentPage+1)
            setCurrentPathIndex(currentPathIndex+1)
            router.push(`/${paths[currentPathIndex+1]}`)
        }
        return
    }

    // if(entriesCtx.loading) {
    //     return <p>Loading entry....</p>
    // }

    // if(entriesCtx.error) {
    //     return <p>Error loading entry: {entriesCtx.error}</p>
    // }

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
                    {!paginationError && 
                        <div className={styles.pagination}>
                            <button className={styles.paginationButton} onClick={handlePrevClick}>&larr;</button>
                            <span>Entry {currentPage} of {totalPages}</span>
                            <button className={styles.paginationButton} onClick = {handleNextClick}>&rarr;</button>
                        </div> 
                    }
            </div>
        </div>
    )
}