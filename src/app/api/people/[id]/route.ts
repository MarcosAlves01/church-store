import { mockAPI } from "@/lib/api";
import { SuccesResponseApi } from "@/lib/types";
import { NextRequest, NextResponse } from "next/server";


export async function DELETE(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
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

export async function PUT(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
    const { id } = await params
    const { name, number } = await req.json()
    try {
        const response = await mockAPI(`/people/${id}`, {
            method: 'PUT',
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
    } catch (err) {
        return NextResponse.json(
            { error: String(err) || "Erro ao atualizar pessoa" },
            { status: 500 }
        )
    }
}