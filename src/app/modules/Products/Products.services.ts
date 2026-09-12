import { createProductsRepository, deleteProductsRepository, getProductsRepository, updateProductsRepository } from "./Products.repository";


export async function getProductsServices() {
    return await getProductsRepository()
}

export async function createProductsServices(nome: string, preco: number) {
    return await createProductsRepository(nome, preco)
}

export async function deleteProductsServices(idProduct: string) {
    return await deleteProductsRepository(idProduct)
}

export async function updateProductsServices(idProduct: string, nome: string, preco: number, ativo: boolean) {
    return await updateProductsRepository(idProduct, nome, preco, ativo)
}
