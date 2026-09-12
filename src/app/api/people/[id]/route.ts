import { mockAPI } from "@/lib/api";
import { SuccesResponseApi } from "@/lib/types";
import { NextRequest, NextResponse } from "next/server";

type Params = { params: Promise<{ id: string }> }

export async function DELETE(_req: NextRequest, { params }: Params) {
    const { id } = await params
    try {
        const response = await mockAPI(`/people/${id}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json'
            }
        })

        const data = await response.json()
        const responseDTO = SuccesResponseApi(response.status, data)
        return NextResponse.json(responseDTO)
    } catch (err) {
        return NextResponse.json(
            { error: String(err) || "Erro pessoas" },
            { status: 500 }
        )
    }
}

export async function PATCH(req: NextRequest, { params }: Params) {
    const { id } = await params
    const { nome, telefone, pago } = await req.json()
    try {
        const response = await mockAPI(`/people/${id}`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                nome,
                telefone,
                pago
            })
        })

        const data = await response.json()
        const responseDTO = SuccesResponseApi(response.status, data)
        return NextResponse.json(responseDTO)
    } catch (err) {
        return NextResponse.json(
            { error: String(err) || "Erro ao atualizar pessoa" },
            { status: 500 }
        )
    }
}