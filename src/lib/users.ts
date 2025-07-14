import { User } from "@/types/user"

export const fetchUsers = async (): Promise<Omit<User, "password">[]> => {
    // const url = `/api/users`
    const url = `http://localhost:8080/api/users`
    const response = await fetch(url, {
        method: "GET"
    })
    if (!response.ok) {
        throw new Error(`Failed to fetch users`)
    }
    const data: User[] = await response.json()
    return data
}

export const fetchUserById = async (id: number): Promise<Omit<User, "password"> | undefined> => {
    const url = `http://localhost:8080/users/${id}`
    const response = await fetch(url, {
        method: "GET"
    })
    if (response.status === 404) {throw new Error(`User not found`)}
    if (!response.ok) {throw new Error(`Failed to fetch user`)}
    const data: Omit<User, "password"> = await response.json()
    return data

}

export const authenticateUser = async (loginData: Omit<User, "id" | "name">): Promise<Omit<User, "password"> | undefined> => {
    const url = `http://localhost:8080/auth/login`
    const response = await fetch(url, {
        method: "POST",
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({loginData})
    })
    if (response.status === 404) {throw new Error(`Invalid email`)}
    if (response.status === 401) {throw new Error(`Invalid password`)}
    if (response.status === 403) {throw new Error(`Invalid hunter status`)}
    if (!response.ok) {throw new Error(`Failed to authenticate user`)}
    const data: Omit<User, "password"> = await response.json()
    return data
}

export const fetchCreateUser = async (signupData: Omit<User,"id">): Promise<Omit<User, "password"> | undefined> => {
    const url = `http://localhost:8080/api/users`
    const response = await fetch(url, {
        method: "POST",
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(signupData)
    })
    if (!response.ok) {
        throw new Error(`Failed to create user`)
    }
    const data: User = await response.json()
    return data
}

// export const fetchUserById = async (id: number): Promise<User | undefined> => {
//     const users = await fetchUsers()
//     return users.find(user => user.id === id)
// }

// export const fetchUserByEmail = async (email: string): Promise<User | undefined> => {
//     const users = await fetchUsers()
//     return users.find(user => user.email === email)
// }

// export const authenticateUser = async (user: {email: string, password: string, is_hunter: boolean}) => {
//     const existingUser = await fetchUserByEmail(user.email)
//     if (!existingUser) {
//         throw new Error(`Invalid email`)
//     }
//     if (existingUser.password !== user.password) {
//         throw new Error(`Invalid password`)
//     }
//     if (existingUser.is_hunter && !user.is_hunter) {
//         throw new Error(`Confirm hunter status`)
//     }
//     if (!existingUser.is_hunter && user.is_hunter) {
//         throw new Error(`Hunter status rejected`)
//     }
//     const {password, ...publicUserData} = existingUser
//     return publicUserData
// }

// export const fetchCreateUser = async (newUser: Omit<User,"id">): Promise<User> => {
//     const existingUser = await fetchUserByEmail(newUser.email)
//     if (existingUser) {
//         throw new Error(`A user with that email already exists`)
//     }
//     const url = `api/users`
//     const response = await fetch(url, {
//         method: "POST",
//         headers: {'Content-Type': 'application/json'},
//         body: JSON.stringify(newUser)
//     })
//     if (!response.ok) {
//         throw new Error(`Failed to create user`)
//     }
//     const data: User = await response.json()
//     return data
// }