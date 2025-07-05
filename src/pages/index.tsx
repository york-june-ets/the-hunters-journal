import { UserContext } from "@/context/UserContext"
import { authenticateUser, fetchUserByEmail } from "@/lib/users"
import { User } from "@/types/user"
import Link from "next/link"
import router from "next/router"
import { useContext, useState } from "react"

type LoginForm = Omit<User, "id" | "name">

export default function Login() {
    const [formData, setFormData] = useState<LoginForm>({email: "", password: "", is_hunter: false})
    const [loading, setLoading] = useState<boolean>(false)
    const [error, setError] = useState<Error | null>(null)
    const userCtx = useContext(UserContext)

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setError(null)
        const {name, value, type} = event.target
        setFormData((prev: LoginForm) => {
            let newData = {
                ...prev,
                [name]: type === 'checkbox' ? event.target.checked :  value
            }
            return newData
        })
    }

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault()
        setLoading(true)
        try {
            const user = await authenticateUser(formData)
            setLoading(false)
            userCtx?.setUser(user)
            router.push('/journal')
        } catch (err) {
            if (err instanceof Error) {setError(err)}
            else {
                console.error(`Error recieved is not an error object ${err}`)
                setError(new Error(`An unknown error occurred`))
            }
            setLoading(false)
        }
    }

    return (
        <div>
            <h1>Login</h1>
            {loading && <p>Loading please wait...</p>}
            <form onSubmit={handleSubmit}>
                <label>Email: &nbsp;<input type="email" name="email" onChange={handleChange}></input></label>
                <label>Password: &nbsp;<input type="password" name="password" onChange={handleChange}></input></label>
                <label><input type="checkbox" name="is_hunter" onChange={handleChange}></input>I am a hunter</label>
                <button type="submit">Login</button>
            </form>
            {error && <p>{error.message}</p>}
            <Link href="/signup">Don't have an account? Sign up!</Link>
        </div>
    )
}