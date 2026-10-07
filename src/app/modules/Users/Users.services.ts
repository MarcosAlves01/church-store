import { createUsersRepository, deleteUsersRepository, getUsersRepository, updateUsersRepository } from "./Users.repository";


export async function getUsersServices() {
    return await getUsersRepository()
}

export async function createUsersServices(nome: string, email: string, senha: string) {
    return await createUsersRepository(nome, email, senha)
}

export async function updateUsersServices(idUser: string, nome: string, email: string) {
    return await updateUsersRepository(idUser, nome, email)
}

export async function deleteUsersServices(idUser: string) {
    return await deleteUsersRepository(idUser)
}
