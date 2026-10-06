import { mockAPI } from "@/lib/api";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
    const token = req.cookies.get("token")?.value

    try {
        await mockAPI("/auth/logout", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`
            }
        })
    } catch {
        // Mesmo se a chamada falhar, limpamos o cookie local abaixo
    }

    const response = NextResponse.json({ request_ok: true })

    response.cookies.set("token", "", {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "lax",
        path: "/",
        maxAge: 0,
    })

    return response
}
