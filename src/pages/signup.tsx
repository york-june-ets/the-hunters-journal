import { fetchCreateUser, fetchUserByEmail } from "@/lib/users"
import { User } from "@/types/user"
import Link from "next/link"
import router from "next/router"
import { useRef, useState } from "react"
import styles from '@/styles/Signup.module.css'

type SignupForm = {
    name: string
    email: string
    password: string
    is_hunter: boolean
}

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
                console.error(`Error recieved is not an error object ${err}`)
                setError(new Error(`An unknown error occurred`))
            }
            setLoading(false)
        }
    }

    return (
        <div className={styles.signupBackground}>
            <div className={styles.signup}>
                <h1 className={styles.signupTitle}>Signup</h1>
                {loading && <p>Loading please wait...</p>}
                <form className={styles.signupForm} onSubmit={handleSubmit}>
                    <input className={styles.formInput} type="text" name="name" value={formData.name} placeholder="Name" onChange={handleChange} required></input>
                    <input className={styles.formInput} type="email" name="email" value={formData.email} placeholder="Email" onChange={handleChange} required></input>
                    <input className={styles.formInput} type="password" name="password" value={formData.password} placeholder="Password" onChange={handleChange} minLength={8} required></input>
                    <input className={styles.formInput} type="password" placeholder="Confirm Password" ref={passwordRef} minLength={8} required></input>
                    <button className={styles.formSubmit} type="submit">Register</button>
                </form>
                {error && <p>{error.message}</p>}
                <Link href="/">Already have an account? Log in.</Link>
            </div>
        </div>
    )
}