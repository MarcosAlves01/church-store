import { mockAPI } from "@/lib/api"
import { SuccesResponseApi } from "@/lib/types"
import { NextRequest, NextResponse } from "next/server"


export async function GET() {
    try {
        const response = await mockAPI('/sales')
        const data = await response.json()
        const responseDTO = SuccesResponseApi(response.status, data)
        return NextResponse.json(responseDTO)
    } catch {
        return NextResponse.json(
            { error: "Erro vendas" },
            { status: 500 }
        )
    }
}

export async function POST(req: NextRequest) {
    const { pessoaId, produtoId, quantidade } = await req.json()
    try {
        const response = await mockAPI('/sales', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                pessoaId,
                produtoId,
                quantidade
            })
        })
        const data = await response.json()
        const responseDTO = SuccesResponseApi(response.status, data)
        return NextResponse.json(responseDTO)
    } catch {
        return NextResponse.json(
            { error: "Erro ao registrar venda" },
            { status: 500 }
        )
    }
}
