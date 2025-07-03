import { useState } from "react"

export const Login = () => {
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
            <form onSubmit={handleSubmit}>
                <label>Email: &nbsp;<input type="email" onChange={handleChange}></input></label>
                <label>Password: &nbsp;<input type="password" onChange={handleChange}></input></label>
                <button type="submit">Login</button>
            </form>
        </div>
    )
}