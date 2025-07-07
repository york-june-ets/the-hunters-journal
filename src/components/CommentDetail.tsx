import { Comment } from "@/types/comment"
import { fetchCommenter } from "@/lib/comments"
import { useEffect, useState } from "react"

export const CommentDetail: React.FC<{comment: Comment}> = ({comment}) => {
    const [commenter, setCommenter] = useState<string>("Unknown")

    useEffect(() => {
        const getCommenter = async () => {
            const commenter = await fetchCommenter(comment)
            setCommenter(commenter)
        }
        getCommenter()
    })

    if (comment === undefined) {
        return <p></p>
    }

    return (
        <p>{commenter}: {comment.message}</p>
    )
}