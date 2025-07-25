import { Entry } from "@/types/entry"
import { useContext, useEffect, useState } from "react"
import { fetchEntries, fetchEntryBySlug, fetchEntrySlugs, slugify } from "@/lib/entries"
import { GetStaticPaths, GetStaticPropsContext } from "next"
// import { getEntries, getEntryBySlug } from "./api/entries"
import styles from '@/styles/[slug].module.css'
import router from "next/router"
import { fetchUserById } from "@/lib/users"
import { fetchCommentsByEntryId, fetchPostComment } from "@/lib/comments"
import { CommentDetail } from "@/components/CommentDetail"
import { Comment } from "@/types/comment"
import { UserContext } from "@/context/UserContext"
import { User } from "@/types/user"

export const getStaticPaths: GetStaticPaths = async () => {
    const entries = await fetchEntries()
    const paths = entries.map((entry: { title: string }) => ({
        params: {slug: slugify(entry.title)}
    }))
    return {paths, fallback: false}
}

export const getStaticProps = async ({params}: GetStaticPropsContext) => {
    if (typeof params?.slug !== "string") {return}
    const entry = await fetchEntryBySlug(params?.slug)
    return { props: {entry}}
}

export default function EntryPage({entry}: {entry: Entry}) {
    const currentPath = slugify(entry.title)
    const [paths, setPaths] = useState<string[]>([])
    const [currentPathIndex, setCurrentPathIndex] = useState<number>(0)
    const [currentPage, setCurrentPage] = useState<number>(1)
    const totalPages = Math.ceil(paths.length)
    const [paginationError, setPaginationError] = useState<Error | null>(null)
    const [author, setAuthor] = useState<string>("Unknown")
    const [comments, setComments] = useState<Comment[]>([])
    const [refresh, setRefresh] = useState<boolean>(false)
    const user = useContext(UserContext)?.user
    console.log(entry)
    console.log(entry.id)
    const [newComment, setNewComment] = useState<Omit<Comment, "id">>(
        {
            user_id: user?.id!,
            entry_id: entry.id,
            message: ""
        }
    )

    useEffect(() => {
        if (user) {
            setNewComment(
                {
                    user_id: user?.id!,
                    entry_id: entry.id,
                    message: ""
                }
            )
        }
    }, [user])

    useEffect(() => {
        const getCurrentState = async (): Promise<void> => {
            const paths = await fetchEntrySlugs()
            setPaths(paths)
            const index = paths.indexOf(currentPath)
            setCurrentPathIndex(index)
            setCurrentPage(index+1)
        }
        const getAuthor = async (): Promise<void> => {
            const user = await fetchUserById(entry.user_id)
            if (user && user.name) {setAuthor(user.name)}
        }
        const getComments = async (): Promise<void> => {
            const comments = await fetchCommentsByEntryId(entry.id)
            setComments(comments)
        }
        getCurrentState()
        getAuthor()
        getComments()
    }, [entry.id])

    useEffect(() => {
        const interval = setInterval(async () => {
            setComments(await fetchCommentsByEntryId(entry.id))
        }, 30000)
        return () => clearInterval(interval)
    }, [entry.id, refresh])

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

    const handleChange = (event:React.ChangeEvent<HTMLInputElement>) => {
        setNewComment((prev: Omit<Comment, "id">) => {
            let updatedComment = {
                ...prev,
                message: event.target.value
            }
            return updatedComment
        })
        console.log(newComment)
    }

    const handleSubmit = async (event:React.FormEvent) => {
        event.preventDefault()
        try {
            const success = await fetchPostComment(newComment)
            if (success) {
                if (refresh) {setRefresh(false)}
                else {setRefresh(true)} //refetch comments when new comment is posted
                setNewComment(
                    {
                        user_id: user?.id!,
                        entry_id: entry.id,
                        message: ""
                    }
                )
            }
        } catch (error) {
            console.error(`Failed to post comment: ${newComment.message}`)
        }
    }

    return (
        <div className={styles.book}>
            <div className={styles.commentsPage}>
                <img className={styles.img} src={entry.img}></img>
                <div className={styles.comments}>
                    {
                        comments.map((comment: Comment) => (
                            <div key={comment.id}>
                                <CommentDetail comment={comment}></CommentDetail>
                            </div>
                        ))
                    } 
                </div>
                    <form className={styles.form}onSubmit={handleSubmit}>
                    <input className={styles.commentInput} placeholder="Add a comment" value={newComment.message} onChange={handleChange}></input>
                    <button className={styles.commentPost} type="submit">Submit</button>
                </form>
            </div>
            <div className={styles.entryPage}>
                <h1 className={styles.slugTitle}>{entry.title}</h1>
                <p className={styles.author}>- {author}</p>
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