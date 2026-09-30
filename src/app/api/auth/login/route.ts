import { mockAPI } from "@/lib/api";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
    const { email, senha } = await req.json()

    try {
        const response = await mockAPI(`/auth/login`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                email,
                senha
            })
        })

        if (response.ok) {
            const data = await response.json()
            const token = data.token

            const responseToken = NextResponse.json({
                request_ok: true
            })

            responseToken.cookies.set("token", token, {
                httpOnly: true,
                secure: process.env.NODE_ENV == "production",
                sameSite: "strict",
                path: '/',
                maxAge: 60 * 60 * 8
            })
            return responseToken
        }

        return NextResponse.json({
            request_ok: false,
        })
    } catch {
        return NextResponse.json({
            request_ok: false,
            error: "Credenciais inválidas"
        }, {
            status: 400
        })
    }
}
