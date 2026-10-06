import { createSalesRepository, deleteSalesRepository, getSalesRepository } from "./Sales.repository";


export async function getSalesServices() {
    return await getSalesRepository()
}

export async function createSalesServices(pessoaId: number, produtoId: number, quantidade: number, precoNaHora: number) {
    return await createSalesRepository(pessoaId, produtoId, quantidade, precoNaHora)
}

export async function deleteSalesServices(idSale: string) {
    return await deleteSalesRepository(idSale)
}
