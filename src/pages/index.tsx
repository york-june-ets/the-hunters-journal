import Link from "next/link"
import { useState } from "react"

export default function Login() {
    const [formData, setFormData] = useState<FormData>({email: "", password: ""})
    const [loading, setLoading] = useState<boolean>(false)

    interface FormData {
        email: string
        password: string
    }

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const {name, value} = event.target
        setFormData((prev: FormData) => {
            let newData = {
                ...prev,
                [name]: value
            }
            return newData
        })
    }

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault()
        setLoading(true)
    }

    return (
        <div>
            <h1>Login</h1>
            <form onSubmit={handleSubmit}>
                <label>Email: &nbsp;<input type="email" onChange={handleChange}></input></label>
                <label>Password: &nbsp;<input type="password" onChange={handleChange}></input></label>
                <label><input type="checkbox"></input>I am a hunter</label>
                <button type="submit">Login</button>
            </form>
            <Link href="/signup">Don't have an account? Sign up!</Link>
        </div>
    )
}