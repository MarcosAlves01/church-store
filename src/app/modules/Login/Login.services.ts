import { LoginRepository } from "./Login.repository";


export async function LoginServices(email: string, senha: string) {
    return await LoginRepository(email, senha)
}
