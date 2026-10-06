import { mockAPI } from "@/lib/api";
import { SuccesResponseApi } from "@/lib/types";
import { NextRequest, NextResponse } from "next/server";


export async function GET(req: NextRequest) {
    const token = req.cookies.get("token")?.value

    if (!token) {
        return NextResponse.json(
            { request_ok: false, error: "Não autenticado" },
            { status: 401 }
        )
    }

    try {
        const response = await mockAPI('/auth/me', {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            }
        })

        const data = await response.json()
        const responseDTO = SuccesResponseApi(response.status, data)
        return NextResponse.json(responseDTO, { status: response.status })
    } catch {
        return NextResponse.json(
            { request_ok: false, error: "Erro ao buscar usuário" },
            { status: 500 }
        )
    }
}
