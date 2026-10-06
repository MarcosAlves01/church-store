import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

const publicPaths = ["/login"];

export default function proxy(req: NextRequest) {
    const token = req.cookies.get("token")?.value;
    const { pathname } = req.nextUrl;

    const isPublic = publicPaths.some(
        (p) => pathname === p || pathname.startsWith(`${p}/`)
    );

    if (!isPublic && !token) {
        return NextResponse.redirect(new URL("/login", req.url));
    }

    if (isPublic && token) {
        return NextResponse.redirect(new URL("/peoples", req.url));
    }

    return NextResponse.next();
}

export const config = {
    matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
};
