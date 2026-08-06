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

export async function createPeopleRepository(name: string, number: string) {
    const errorMessage = "Ocorreu um erro ao cadastrar a pessoa"
    try {
        const response = await fetch('/api/people', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                name,
                number
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