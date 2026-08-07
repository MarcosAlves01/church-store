import { createPeopleRepository, deletePeopleRepository, getPeopleRepository, updatePeopleRepository } from "./People.repository";


export async function getPeopleServices() {
    return await getPeopleRepository()
}

export async function createPeopleServices(name: string, number: string) {
    return await createPeopleRepository(name, number)
}

export async function deletePeopleServices(idPeople: string) {
    return await deletePeopleRepository(idPeople)
}

export async function updatePeopleServices(idPeople: string, name: string, number: string) {
    return await updatePeopleRepository(idPeople, name, number)
}