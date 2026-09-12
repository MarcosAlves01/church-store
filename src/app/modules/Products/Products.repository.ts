import { ResponseGenericApiRoute } from "@/lib/types"


export async function getProductsRepository() {
    const messageError = "Não foi possível buscar os produtos"

    try {
        const response = await fetch('/api/products')
        const data = await response.json()
        return data
    } catch {
        return ResponseGenericApiRoute(messageError)
    }
}

export async function createProductsRepository(nome: string, preco: number) {
    const messageError = "Ocorreu um erro ao cadastrar o produto"
    try {
        const response = await fetch('/api/products', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                nome,
                preco
            })
        })
        const data = await response.json()
        return data
    } catch {
        return ResponseGenericApiRoute(messageError)
    }
}

export async function deleteProductsRepository(idProduct: string) {
    const messageError = "Ocorreu um erro ao excluir o produto"
    try {
        const response = await fetch(`/api/products/${idProduct}`, {
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

export async function updateProductsRepository(idProduct: string, nome: string, preco: number, ativo: boolean) {
    const messageError = "Ocorreu um erro ao atualizar o produto"
    try {
        const response = await fetch(`/api/products/${idProduct}`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                nome,
                preco,
                ativo
            })
        })
        const data = await response.json()
        return data
    } catch {
        return ResponseGenericApiRoute(messageError)
    }
}
