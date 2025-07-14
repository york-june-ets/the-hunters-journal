import { Comment } from "@/types/comment"
import { fetchUserById } from "./users"

export const fetchComments = async () => {
    // const url = `/api/comments`
    const url = `http://localhost:8080/api/comments`
    const response = await fetch(url, {
        method: "GET"
    })
    if (!response.ok) {
        throw new Error(`Error fetching comments`)
    }
    return await response.json()
}

export const fetchCommentsByEntryId = async (entryId: number) => {
    // const url = `/api/comments?entry_id=${entryId}`
    const url = `http://localhost:8080/api/comments/${entryId}`
    const response = await fetch(url, {
        method: "GET"
    })
    if (!response.ok) {
        throw new Error(`Error fetching comments for entry with id: ${entryId}`)
    }
    return await response.json()
}

export const fetchCommenter = async (comment: Comment): Promise<string | "Unknown"> => {
    const user = await fetchUserById(comment.user_id)
    if (user && user.name) {return user.name}
    else {return "Unknown"}
}

export const fetchPostComment = async (newComment: Omit<Comment, "id">) => {
    // const url = `/api/comments`
    const url = `http://localhost:8080/api/comments`
    const response = await fetch(url, {
        method: "POST",
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(newComment)
    })
    if (!response.ok) {
        throw new Error(`Error posting comment: ${newComment.message}`)
    }
    return await response.json()
}
