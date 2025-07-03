import { query } from "@/lib/db"
import { User } from "@/types/user"
import { NextApiRequest, NextApiResponse } from "next"

export const getUsers = async () => {
    const {rows} = await query('SELECT * FROM users ORDER BY id DESC')
    return rows
}

export const createUser = async (user: Omit<User, 'id'>): Promise<User> => {
    const {rows} = await query(
        'INSERT into users (name, email, password, is_hunter) VALUES ($1, $2, $3, $4)',
        [user.name, user.email, user.password, user.is_hunter]
    )
    return rows[0]
}

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method === 'GET') {
        const users = await getUsers()
        return res.status(200).json(users)
    } else if (req.method === 'POST') {
        const {name, email, password, is_hunter} = req.body
        const newUser = await createUser({name, email, password, is_hunter})
        return res.status(201).json(newUser)
    } else {
        res.setHeader('Allow', ['GET', 'POST', 'PUT', 'DELETE'])
        res.status(405).end(`Method ${req.method} Not Allowed`)
    }
}