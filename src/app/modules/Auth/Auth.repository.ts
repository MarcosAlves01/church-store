import { ResponseGenericApiRoute } from "@/lib/types"


export async function getMeRepository() {
    const messageError = "Não foi possível buscar o usuário"
    try {
        const response = await fetch('/api/auth/me')
        const data = await response.json()
        return data
    } catch {
        return ResponseGenericApiRoute(messageError)
    }
}

export async function logoutRepository() {
    const messageError = "Não foi possível sair"
    try {
        const response = await fetch('/api/auth/logout', {
            method: 'POST'
        })
        const data = await response.json()
        return data
    } catch {
        return ResponseGenericApiRoute(messageError)
    }
}
