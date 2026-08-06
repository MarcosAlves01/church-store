import { mockAPI } from "@/lib/api";
import { SuccesResponseApi } from "@/lib/types";
import { NextRequest, NextResponse } from "next/server";


export async function GET() {
    try {
        const response = await mockAPI('/people')
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
    const { name, number } = await req.json()
    try {
        const response = await mockAPI('/people', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                name,
                number
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