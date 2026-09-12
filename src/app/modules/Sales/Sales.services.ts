import { createSalesRepository, deleteSalesRepository, getSalesRepository } from "./Sales.repository";


export async function getSalesServices() {
    return await getSalesRepository()
}

export async function createSalesServices(pessoaId: string, produtoId: string, quantidade: number) {
    return await createSalesRepository(pessoaId, produtoId, quantidade)
}

export async function deleteSalesServices(idSale: string) {
    return await deleteSalesRepository(idSale)
}
