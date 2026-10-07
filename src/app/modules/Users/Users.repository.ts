import { ResponseGenericApiRoute } from "@/lib/types";


export async function getUsersRepository() {
    const errorMessage = "Ocorreu um erro ao buscar os usuários"
    try {
        const response = await fetch('/api/users')
        const data = await response.json()
        return data
    } catch {
        return ResponseGenericApiRoute(errorMessage)
    }
}

export async function createUsersRepository(nome: string, email: string, senha: string) {
    const errorMessage = "Ocorreu um erro ao cadastrar o usuário"
    try {
        const response = await fetch('/api/users', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                nome,
                email,
                senha
            })
        })
        const data = await response.json()
        return data
    } catch {
        return ResponseGenericApiRoute(errorMessage)
    }
}

export async function updateUsersRepository(idUser: string, nome: string, email: string) {
    const errorMessage = "Ocorreu um erro ao atualizar o usuário"
    try {
        const response = await fetch(`/api/users/${idUser}`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                nome,
                email
            })
        })
        const data = await response.json()
        return data
    } catch {
        return ResponseGenericApiRoute(errorMessage)
    }
}

export async function deleteUsersRepository(idUser: string) {
    const errorMessage = "Ocorreu um erro ao excluir o usuário"
    try {
        const response = await fetch(`/api/users/${idUser}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json'
            }
        })
        const data = await response.json()
        return data
    } catch {
        return ResponseGenericApiRoute(errorMessage)
    }
}
