import { UserContext } from "@/context/UserContext"
import { authenticateUser, fetchUserByEmail } from "@/lib/users"
import { User } from "@/types/user"
import Link from "next/link"
import router from "next/router"
import { useContext, useState } from "react"
import styles from '@/styles/Login.module.css'

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
        <div className={styles.loginBackground}>
            <div className={styles.login}>
                <h1 className={styles.loginTitle}>Login</h1>
                {loading && <p>Loading please wait...</p>}
                <form className={styles.loginForm} onSubmit={handleSubmit}>
                    <input className={styles.formInput} type="email" name="email" placeholder="Email" onChange={handleChange}></input>
                    <input className={styles.formInput} type="password" name="password" placeholder="Password" onChange={handleChange}></input>
                    <label className={styles.hunterLabel}><input type="checkbox" name="is_hunter" onChange={handleChange}></input>I am a hunter</label>
                    <button className={styles.formSubmit} type="submit">Login</button>
                </form>
                {error && <p>{error.message}</p>}
                <Link href="/signup">Don't have an account? Sign up!</Link>
            </div>
        </div>
    )
}