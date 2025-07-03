import { User } from "@/types/user"
import { createContext, ReactNode, useEffect, useState } from "react"

interface UserContextType {
    user: Omit<User,"password"> | null,
    setUser: (u: Omit<User,"password"> | null) => void
}

export const UserContext = createContext<UserContextType | null>(null)

export function UserProvider({children}: {children: ReactNode}) {
    const [user, setUser] = useState<Omit<User,"password"> | null>(null)
    useEffect(() => {
        let u = localStorage.getItem("user")
        if (u !== null) {
            setUser(JSON.parse(u))
        }
    }, [])
    return (
        <UserContext.Provider value = {
            {
                user: user,
                setUser:(u: Omit<User,"password"> | null) => {
                    if (u !== null) {
                        localStorage.setItem('user', JSON.stringify(u))
                    }
                    setUser(u)
                }
            }
        }>
            {children}
        </UserContext.Provider>
    )
}