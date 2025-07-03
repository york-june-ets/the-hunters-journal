import { User } from "@/types/user"

export const fetchUsers = async () => {
    const url = `/api/users`
    const response = await fetch(url, {
        method: "GET"
    })
    if (!response.ok) {
        throw new Error(`Failed to fetch users`)
    }
    const data: User[] = await response.json()
    return data
}

export const fetchCreateUser = async (newUser: Omit<User,"id">) => {
    const url = `api/users`
    const response = await fetch(url, {
        method: "POST",
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(newUser)
    })
    if (!response.ok) {
        throw new Error(`Failed to create user`)
    }
    const data: User = await response.json()
    return data
}