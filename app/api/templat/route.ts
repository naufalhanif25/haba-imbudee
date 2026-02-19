import { supabase } from "@/lib/supabase";
import { NextResponse, NextRequest } from "next/server";
import { TemplateData } from "@/app/admin/dashboard/(template)/template-props";

export async function GET() {
    const { data, error } = await supabase.from("templates").select("*");

    if (error) {
        return NextResponse.json(
            { success: false, message: error.message },
            { status: 500 },
        );
    }
    return NextResponse.json({
        success: true,
        data,
    });
}

export async function POST(req: NextRequest) {
    try {
        const body: TemplateData = await req.json();
        const { id, name, num_pages, cover, data } = body;

        const { data: insertedData, error } = await supabase.from("templates").insert([
            {
                id,
                name,
                num_pages: num_pages,
                cover,
                data,
                updated_at: new Date().toISOString(),
            },
        ]).select().single();

        if (error) {
            return NextResponse.json(
                { success: false, message: error.message },
                { status: 500 },
            );
        }

        return NextResponse.json(
            { success: true, data: insertedData },
            { status: 201 },
        );
    } catch (error: any) {
        return NextResponse.json(
            { success: false, message: error.message },
            { status: 500 },
        );
    }
}
