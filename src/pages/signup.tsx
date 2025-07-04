import { UserContext } from "@/context/UserContext"
import { fetchCreateUser, fetchUserByEmail } from "@/lib/users"
import { User } from "@/types/user"
import Link from "next/link"
import router from "next/router"
import { useRef, useState } from "react"

type SignupForm = Omit<User, "id">

export default function Signup() {
    const [formData, setFormData] = useState<SignupForm>({name: "", email: "", password: "", is_hunter: false})
    const [loading, setLoading] = useState<boolean>(false)
    const [error, setError] = useState<Error | null>(null)
    const passwordRef = useRef<HTMLInputElement>(null)

    const passwordsMatch = () => {
        if (passwordRef.current && formData.password === passwordRef.current.value) {
            return true
        }
        return false
    }

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setError(null)
        const {name, value} = event.target
        setFormData((prev: SignupForm) => {
            let newData = {
                ...prev,
                [name]: value
            }
            return newData
        })
    }

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault()
        setLoading(true)
        if (!passwordsMatch()) {
            setLoading(false)
            setError(new Error(`Passwords do not match.`))
            return
        }
        try {
            await fetchCreateUser(formData)
            setLoading(false)
            router.push("/")
        } catch (err) {
            if (err instanceof Error) {setError(err)}
            else {
                console.error(`Error recieved is not an arror object ${err}`)
                setError(new Error(`An unknown error occurred`))
            }
            setLoading(false)
        }
    }

    return (
        <div>
            <h1>Signup</h1>
            {loading && <p>Loading please wait...</p>}
            <form onSubmit={handleSubmit}>
                <label>Name: &nbsp;<input type="text" name="name" value={formData.name} onChange={handleChange} required></input></label>
                <label>Email: &nbsp;<input type="email" name="email" value={formData.email} onChange={handleChange} required></input></label>
                <label>Password: &nbsp;<input type="password" name="password" value={formData.password} onChange={handleChange} minLength={8} required></input></label>
                <label>ConfirmPassword: &nbsp;<input type="password" ref={passwordRef} minLength={8} required></input></label>
                <button type="submit">Register</button>
            </form>
            {error && <p>{error.message}</p>}
            <Link href="/">Already have an account? Log in.</Link>
        </div>
    )
}