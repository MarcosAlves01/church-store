const api = (baseURL: string) => {
    return (path: string, options?: RequestInit) => {
        return fetch(`${baseURL}${path}`, {...options})
    }
}

export const mockAPI = api('http://localhost:3002')