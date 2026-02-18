import { NextResponse } from "next/server";

export type LoginResponse = {
    success: boolean;
    message: string;
};

export async function POST(req: Request) {
    const { username, password } = await req.json();

    if (!username || !password) {
        return NextResponse.json({
            success: false,
            message: "Nama pengguna atau kata sandi tidak boleh kosong."
        }, { status: 401 });
    }

    if (
        username === process.env.ADMIN_USERNAME &&
        password === process.env.ADMIN_PASSWORD
    ) {
        const res = NextResponse.json({ success: true });

        res.cookies.set("admin_token", crypto.randomUUID(), {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: "strict",
            path: "/",
            maxAge: (60 * 60 * 24)
        });

        return res;
    }

    return NextResponse.json({ 
        success: false,
        message: "Nama pengguna atau kata sandi salah." 
    }, { status: 401 });
}