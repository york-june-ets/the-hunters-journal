import { query } from "@/lib/db"
import { NextApiRequest, NextApiResponse } from "next"

const getComments = async () => {
    const {rows} = await query('SELECT * FROM comments ORDER BY id DESC')
    return rows
}

const getEntryComments = async (entry_id: number) => {
    const {rows} = await query('SELECT *  FROM comments WHERE entry_id = $1', [entry_id])
    return rows
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
    }
}