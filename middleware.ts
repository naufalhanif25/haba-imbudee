import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
    const token = request.cookies.get("admin_token");
    const { pathname } = request.nextUrl;

    if (!token && pathname === "/admin/dashboard") {
        return NextResponse.redirect(new URL("/admin/masuk", request.url));
    }

    if (token && pathname === "/admin/masuk") {
        return NextResponse.redirect(new URL("/admin/dashboard", request.url));
    }

    return NextResponse.next();
}

export const config = {
    matcher: [
        "/admin/dashboard",
        "/admin/masuk"
    ],
};