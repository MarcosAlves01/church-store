import { mockAPI } from "@/lib/api"
import { SuccesResponseApi } from "@/lib/types"
import { NextRequest, NextResponse } from "next/server"


export async function GET() {
    try {
        const response = await mockAPI('/products')
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
    const { nome, preco } = await req.json()
    try {
        const response = await mockAPI('/products', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
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
