import { createPeopleRepository, deletePeopleRepository, getPeopleRepository, updatePeopleRepository } from "./People.repository";


export async function getPeopleServices() {
    return await getPeopleRepository()
}

export async function createPeopleServices(nome: string, telefone: string) {
    return await createPeopleRepository(nome, telefone)
}

export async function deletePeopleServices(idPeople: string) {
    return await deletePeopleRepository(idPeople)
}

export async function updatePeopleServices(idPeople: string, nome: string, telefone: string, pago: boolean) {
    return await updatePeopleRepository(idPeople, nome, telefone, pago)
}