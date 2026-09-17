import { ResponseGenericApiRoute } from "@/lib/types"


export async function getSummaryRepository() {
    const messageError = "Não foi possível buscar o resumo"
    try {
        const response = await fetch('/api/summary')
        const data = await response.json()
        return data
    } catch {
        return ResponseGenericApiRoute(messageError)
    }
}
