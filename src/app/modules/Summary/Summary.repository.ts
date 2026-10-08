import { ResponseGenericApiRoute } from "@/lib/types"


export async function getSummaryRepository() {
    const messageError = "Não foi possível buscar o resumo"
    try {
        const response = await fetch('/api/summary')
        const data = await response.json()
        return data
    } catch {
        return ResponseGenericApiRoute(messageError)
    }
}

export async function getSalesRepository() {
    const messageError = "Não foi possível buscar as vendas"
    try {
        const response = await fetch('/api/sales')
        const data = await response.json()
        return data
    } catch {
        return ResponseGenericApiRoute(messageError)
    }
}

export async function updatePersonStatusRepository(idPeople: string, nome: string, telefone: string, pago: boolean) {
    const messageError = "Não foi possível atualizar o status da pessoa"
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
        return ResponseGenericApiRoute(messageError)
    }
}
