import { createPeopleRepository, deletePeopleRepository, getPeopleRepository } from "./People.repository";


export async function getPeopleServices() {
    return await getPeopleRepository()
}

export async function createPeopleServices(name: string, number: string) {
    return await createPeopleRepository(name, number)
}

export async function deletePeopleServices(idPeople: string) {
    return await deletePeopleRepository(idPeople)
}