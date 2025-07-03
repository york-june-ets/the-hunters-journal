import Link from "next/link"
import { useState } from "react"

export default function Signup() {
    const [formData, setFormData] = useState<FormData>({name: "", email: "", password: ""})
    const [loading, setLoading] = useState<boolean>(false)

    interface FormData {
        name: string
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
            <h1>Signup</h1>
            <form onSubmit={handleSubmit}>
                <label>Name: &nbsp;<input type="text" onChange={handleChange}></input></label>
                <label>Email: &nbsp;<input type="email" onChange={handleChange}></input></label>
                <label>Password: &nbsp;<input type="password" onChange={handleChange}></input></label>
                <button type="submit">Login</button>
            </form>
            <Link href="/">Already have an account? Log in.</Link>
        </div>
    )
}