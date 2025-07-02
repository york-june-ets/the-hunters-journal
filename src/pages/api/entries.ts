import { query } from "@/lib/db"
import { slugify } from "@/lib/entries"
import { Entry } from "@/types/entry"
import { NextApiRequest, NextApiResponse } from "next"

const getEntries = async () => {
    const {rows} = await query('SELECT * FROM entries ORDER BY id DESC')
    return rows
}

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    //GET
    if (req.method === 'GET') {
        const entries = await getEntries()
        return res.status(200).json(entries)
    }
}