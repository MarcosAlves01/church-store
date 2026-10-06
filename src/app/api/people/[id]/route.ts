import { mockAPI } from "@/lib/api";
import { SuccesResponseApi } from "@/lib/types";
import { NextRequest, NextResponse } from "next/server";

type Params = { params: Promise<{ id: string }> }

export async function DELETE(req: NextRequest, { params }: Params) {
    const token = req.cookies.get("token")?.value
    const { id } = await params
    try {
        const response = await mockAPI(`/pessoas/${id}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
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
    const token = req.cookies.get("token")?.value
    const { id } = await params
    const { nome, telefone, pago } = await req.json()
    try {
        const response = await mockAPI(`/pessoas/${id}`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
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