import { ResponseGenericApiRoute } from "@/lib/types";


export async function getPeopleRepository() {
    const errorMessage = "Ocorreu um erro ao buscar as pessoas"
    try {
        const response = await fetch('/api/people')
        const data = await response.json()
        return data
    } catch {
        return ResponseGenericApiRoute(errorMessage)
    }
}