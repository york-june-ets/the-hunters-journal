import { User } from "@/types/user"

export const fetchUsers = async (): Promise<User[]> => {
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

export const fetchUserByEmail = async (email: string): Promise<User | undefined> => {
    const users = await fetchUsers()
    return users.find(user => user.email === email)
}

export const authenticateUser = async (user: {email: string, password: string, is_hunter: boolean}) => {
    const existingUser = await fetchUserByEmail(user.email)
    if (!existingUser) {
        throw new Error(`Invalid email`)
    }
    if (existingUser.password !== user.password) {
        throw new Error(`Invalid password`)
    }
    if (existingUser.is_hunter && !user.is_hunter) {
        throw new Error(`Confirm hunter status`)
    }
    if (!existingUser.is_hunter && user.is_hunter) {
        throw new Error(`Hunter status rejected`)
    }
    const {password, ...publicUserData} = existingUser
    return publicUserData
}

export const fetchCreateUser = async (newUser: Omit<User,"id">): Promise<User> => {
    const existingUser = await fetchUserByEmail(newUser.email)
    if (existingUser) {
        throw new Error(`A user with that email already exists`)
    }
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