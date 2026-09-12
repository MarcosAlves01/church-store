import { ResponseGenericApiRoute } from "@/lib/types";


export async function getPeopleRepository() {
    const errorMessage = "Ocorreu um erro ao buscar as pessoas"
    try {
        const response = await fetch('/api/people')
        const data = await response.json()
        return data
    } catch {
        return ResponseGenericApiRoute(errorMessage)
    }
}

export async function createPeopleRepository(nome: string, telefone: string) {
    const errorMessage = "Ocorreu um erro ao cadastrar a pessoa"
    try {
        const response = await fetch('/api/people', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                nome,
                telefone
            })
        })
        const data = await response.json()
        return data
    } catch {
        return ResponseGenericApiRoute(errorMessage)
    }
}

export async function deletePeopleRepository(idPeople: string) {
    const errorMessage = "Ocorreu um erro ao excluir a pessoa"
    try {
        const response = await fetch(`/api/people/${idPeople}`, {
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

export async function updatePeopleRepository(idPeople: string, nome: string, telefone: string, pago: boolean) {
    const errorMessage = "Ocorreu um erro ao atualizar a pessoa"
    try {
        const response = await fetch(`/api/people/${idPeople}`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                nome,
                telefone,
                pago
            })
        })
        const data = await response.json()
        return data
    } catch {
        return ResponseGenericApiRoute(errorMessage)
    }
}