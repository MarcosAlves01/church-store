import { getSalesRepository, getSummaryRepository, updatePersonStatusRepository } from "./Summary.repository";


export async function getSummaryServices() {
    return await getSummaryRepository()
}

export async function getSalesServices() {
    return await getSalesRepository()
}

export async function updatePersonStatusServices(idPeople: string, nome: string, telefone: string, pago: boolean) {
    return await updatePersonStatusRepository(idPeople, nome, telefone, pago)
}
