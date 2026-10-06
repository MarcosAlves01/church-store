import { mockAPI } from "@/lib/api";
import { SuccesResponseApi } from "@/lib/types";
import { NextRequest, NextResponse } from "next/server";


export async function GET(req: NextRequest) {
    const token = req.cookies.get("token")?.value
    try {
        const response = await mockAPI('/pessoas', {
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
            { error: "Erro pessoas" },
            { status: 500 }
        )
    }
}

export async function POST(req: NextRequest) {
    const token = req.cookies.get("token")?.value
    const { nome, telefone } = await req.json()
    try {
        const response = await mockAPI('/pessoas', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify({
                nome,
                telefone
            })
        })
        const data = await response.json()
        const responseDTO = SuccesResponseApi(response.status, data)
        return NextResponse.json(responseDTO)
    } catch {
        return NextResponse.json(
            { error: "Erro ao criar pessoa" },
            { status: 500 }
        )
    }
}