import { mockAPI } from "@/lib/api"
import { SuccesResponseApi } from "@/lib/types"
import { NextRequest, NextResponse } from "next/server"


export async function GET(req: NextRequest) {
    const token = req.cookies.get("token")?.value
    try {
        const response = await mockAPI('/resumo', {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            }
        })
        const data = await response.json()
        const responseDTO = SuccesResponseApi(response.status, data)
        return NextResponse.json(responseDTO)
    } catch {
        return NextResponse.json(
            { error: "Erro resumo" },
            { status: 500 }
        )
    }
}
