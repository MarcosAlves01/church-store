import { getPeopleRepository } from "./People.repository";


export async function getPeopleServices() {
    return await getPeopleRepository()
}