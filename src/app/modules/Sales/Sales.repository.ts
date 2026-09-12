import { ResponseGenericApiRoute } from "@/lib/types"


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

export async function createSalesRepository(pessoaId: string, produtoId: string, quantidade: number) {
    const messageError = "Ocorreu um erro ao registrar a venda"
    try {
        const response = await fetch('/api/sales', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                pessoaId,
                produtoId,
                quantidade
            })
        })
        const data = await response.json()
        return data
    } catch {
        return ResponseGenericApiRoute(messageError)
    }
}

export async function deleteSalesRepository(idSale: string) {
    const messageError = "Ocorreu um erro ao excluir a venda"
    try {
        const response = await fetch(`/api/sales/${idSale}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json'
            }
        })
        const data = await response.json()
        return data
    } catch {
        return ResponseGenericApiRoute(messageError)
    }
}
