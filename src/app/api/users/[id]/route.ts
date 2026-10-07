import { mockAPI } from "@/lib/api";
import { SuccesResponseApi } from "@/lib/types";
import { NextRequest, NextResponse } from "next/server";

type Params = { params: Promise<{ id: string }> }

export async function PATCH(req: NextRequest, { params }: Params) {
    const token = req.cookies.get("token")?.value
    const { id } = await params
    const { nome, email } = await req.json()
    try {
        const response = await mockAPI(`/usuarios/${id}`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify({
                nome,
                email
            })
        })

        const data = await response.json()
        const responseDTO = SuccesResponseApi(response.status, data)
        return NextResponse.json(responseDTO)
    } catch (err) {
        return NextResponse.json(
            { error: String(err) || "Erro ao atualizar usuário" },
            { status: 500 }
        )
    }
}

export async function DELETE(req: NextRequest, { params }: Params) {
    const token = req.cookies.get("token")?.value
    const { id } = await params
    try {
        const response = await mockAPI(`/usuarios/${id}`, {
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
            { error: String(err) || "Erro ao excluir usuário" },
            { status: 500 }
        )
    }
}
