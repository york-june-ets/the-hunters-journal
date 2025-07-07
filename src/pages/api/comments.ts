import { query } from "@/lib/db"
import { NextApiRequest, NextApiResponse } from "next"
import { Comment } from "@/types/comment"

const getComments = async () => {
    const {rows} = await query('SELECT * FROM comments ORDER BY id DESC')
    return rows
}

const getEntryComments = async (entry_id: number) => {
    const {rows} = await query('SELECT *  FROM comments WHERE entry_id = $1', [entry_id])
    return rows
}

const postComment = async (newComment: Omit<Comment, "id">): Promise<Comment> => {
    const {rows} = await query(
        'INSERT into comments (user_id, entry_id, message) VALUES ($1, $2, $3)',
        [newComment.user_id, newComment.entry_id, newComment.message]
    )
    return rows[0]
}

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    //GET
    if (req.method === 'GET') {
        const {entry_id} = req.query
        if (entry_id) {
            const comments = await getEntryComments(+entry_id)
            return res.status(200).json(comments)
        }
        const comments = await getComments()
        return res.status(200).json(comments)
    } else if (req.method === "POST") {
        const {user_id, entry_id, message} = req.body
        const comment = await postComment({user_id, entry_id, message})
        return res.status(201).json(comment)
    } else {
        res.setHeader('Allow', ['GET', 'POST', 'PUT', 'DELETE'])
        res.status(405).end(`Method ${req.method} Not Allowed`)
    }
}