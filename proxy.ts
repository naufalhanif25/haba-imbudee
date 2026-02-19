import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function proxy(request: NextRequest) {
    const token = request.cookies.get("admin_token");
    const { pathname, searchParams } = request.nextUrl;

    if (!token && pathname === "/admin/dashboard") {
        return NextResponse.redirect(new URL("/admin/masuk", request.url));
    }

    if (token && pathname === "/admin/masuk") {
        return NextResponse.redirect(new URL("/admin/dashboard", request.url));
    }

    if (pathname === "/surat/buat") {
        const id = searchParams.get("id");
        if (!id) {
            return NextResponse.redirect(new URL("/surat/templat", request.url));
        }
    }

    return NextResponse.next();
}

export const config = {
    matcher: [
        "/admin/dashboard",
        "/admin/masuk",
        "/surat/buat"
    ],
};