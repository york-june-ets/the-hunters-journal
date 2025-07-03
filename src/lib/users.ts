export const fetchUsers = async () => {
    const url = `/api/users`
    const response = await fetch(url, {
        method: "GET"
    })
    if (!response.ok) {
        throw new Error(`Failed to fetch users`)
    }
    return await response.json()
}