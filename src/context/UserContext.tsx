'use client'

import { User } from "@/types/user"
import { useRouter } from "next/router"
import { createContext, ReactNode, useEffect, useState } from "react"

interface UserContextValue {
    user: User | null
    token: string | null
    login: (userToken: string | null, userInfo: User| null) => void
    logout: () => void
    loading: boolean
}

export const UserContext = createContext<UserContextValue>({
    user: null,
    token: null,
    login: () => {},
    logout: () => {},
    loading: false
})

export const UserProvider: React.FC<{children: ReactNode}> = ({children}) => {
    const [token, setToken] = useState<string | null>(null)
    const [user, setUser] = useState<User | null>(null)
    const [loading, setLoading] = useState<boolean>(true)
    const router = useRouter()

    useEffect(() => {
        const existingToken = localStorage.getItem('userToken')
        const existingUser = localStorage.getItem('user')

        if (existingToken) {setToken(existingToken)}
        if (existingUser) {setUser(JSON.parse(existingUser))}
        setLoading(false)
    },[])

    const login = (userToken: string | null, userInfo: User | null) => {
        if (userToken && userInfo) {
            setToken(userToken)
            setUser(userInfo)
            window.localStorage.setItem('userToken', userToken)
            window.localStorage.setItem('user', JSON.stringify(userInfo))
            router.push('/journal')
        }
    }

  const logout = () => {
    setToken(null)
    setUser(null)
    window.localStorage.removeItem('authToken')
    window.localStorage.removeItem('user')
    router.push('/')
  }

    return (
        <UserContext.Provider value={{user, token, login, logout, loading}}>
            {children}
        </UserContext.Provider>
    )
}