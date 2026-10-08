const api = (baseURL: string) => {
    return (path: string, options?: RequestInit) => {
        return fetch(`${baseURL}${path}`, { ...options })
    }
}

const apiBaseUrl = process.env.NEXT_PUBLIC_API_URL

if (!apiBaseUrl) {
    throw new Error("NEXT_PUBLIC_API_URL não está configurada")
}

export const mockAPI = api(apiBaseUrl.replace(/\/$/, ""))