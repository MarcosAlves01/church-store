import { getMeRepository, logoutRepository } from "./Auth.repository";


export async function getMeServices() {
    return await getMeRepository()
}

export async function logoutServices() {
    return await logoutRepository()
}
