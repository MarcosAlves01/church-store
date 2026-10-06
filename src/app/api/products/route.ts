import { mockAPI } from "@/lib/api"
import { SuccesResponseApi } from "@/lib/types"
import { NextRequest, NextResponse } from "next/server"


export async function GET(req: NextRequest) {
    const token = req.cookies.get("token")?.value
    try {
        const response = await mockAPI('/produtos', {
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
            { error: "Erro produtos" },
            { status: 500 }
        )
    }
}

export async function POST(req: NextRequest) {
    const token = req.cookies.get("token")?.value
    const { nome, preco } = await req.json()
    try {
        const response = await mockAPI('/produtos', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify({
                nome,
                preco
            })
        })
        const data = await response.json()
        const responseDTO = SuccesResponseApi(response.status, data)
        return NextResponse.json(responseDTO)
    } catch {
        return NextResponse.json(
            { error: "Erro ao criar produto" },
            { status: 500 }
        )
    }
}
