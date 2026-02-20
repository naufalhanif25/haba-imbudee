import { NextRequest, NextResponse } from "next/server";
import { getSupabaseClient } from "@/lib/supabase";

export async function POST(req: NextRequest) {
    try {
        const body = await req.json();
        const { base64, path } = body;
        const supabase = getSupabaseClient();

        if (!base64 || !path) {
            return NextResponse.json(
                { success: false, message: "base64 dan path dibutuhkan" },
                { status: 400 },
            );
        }

        const blob = await (await fetch(base64)).blob();

        const { data, error } = await supabase.storage.from("templates").upload(path, blob, {
                contentType: "image/png",
                upsert: true,
            });

        if (error) {
            return NextResponse.json(
                { success: false, message: error.message },
                { status: 500 },
            );
        }

        const { data: publicUrlData } = supabase.storage.from("templates").getPublicUrl(data.path);

        return NextResponse.json({
            success: true,
            publicUrl: publicUrlData.publicUrl,
        });
    } catch (error: any) {
        return NextResponse.json(
            { success: false, message: error.message },
            { status: 500 },
        );
    }
}
