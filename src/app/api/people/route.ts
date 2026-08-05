import { mockAPI } from "@/lib/api";
import { SuccesResponseApi } from "@/lib/types";
import { NextResponse } from "next/server";


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