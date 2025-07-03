import { query } from "@/lib/db"
import { NextApiRequest, NextApiResponse } from "next"

export const getUsers = async () => {
    const {rows} = await query('SELECT * FROM users ORDER BY id DESC')
    return rows
}

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    //GET
    if (req.method === 'GET') {
        const users = await getUsers()
        return res.status(200).json(users)
    }
}