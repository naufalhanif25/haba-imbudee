import { supabase } from "@/lib/supabase";
import { NextResponse, NextRequest } from "next/server";

export async function DELETE(
    req: NextRequest,
    context: { params: Promise<{ id: string }> }
) {
    try {
        const { id } = await context.params;

        if (!id) {
            return NextResponse.json(
                { success: false, message: "ID dibutuhkan" },
                { status: 400 }
            );
        }

        const { data: template, error: fetchError } = await supabase.from("templates").select("*").eq("id", id).single();

        if (fetchError || !template) {
            return NextResponse.json(
                { success: false, message: "Templat tidak ditemukan" },
                { status: 404 }
            );
        }
        
        const extractPath = (url: string) => {
            return url.substring(url.lastIndexOf("/") + 1);
        };

        const filesToDelete: string[] = [];

        if (template.data && Array.isArray(template.data)) {
            template.data.forEach((page: any) => {
                if (page.image) {
                    filesToDelete.push(extractPath(page.image));
                }
            });
        }

        if (filesToDelete.length > 0) {
            const { error: storageError } = await supabase.storage.from("templates").remove(filesToDelete);

            if (storageError) {
                return NextResponse.json(
                    { success: false, message: storageError.message },
                    { status: 500 }
                );
            }
        }

        const { error: deleteError } = await supabase.from("templates").delete().eq("id", id);

        if (deleteError) {
            return NextResponse.json(
                { success: false, message: deleteError.message },
                { status: 500 }
            );
        }

        return NextResponse.json({
            success: true,
            message: "Templat berhasil dihapus",
        });

    } catch (error: any) {
        return NextResponse.json(
            { success: false, message: error.message },
            { status: 500 }
        );
    }
}

export async function GET(
    req: NextRequest,
    context: { params: Promise<{ id: string }> }
) {
    try {
        const { id } = await context.params;

        if (!id) {
            return NextResponse.json(
                { success: false, message: "ID dibutuhkan" },
                { status: 400 }
            );
        }

        const { data: template, error } = await supabase.from("templates").select("*").eq("id", id).single();

        if (error || !template) {
            return NextResponse.json(
                { success: false, message: "Templat tidak ditemukan" },
                { status: 404 }
            );
        }

        return NextResponse.json({
            success: true,
            data: template
        });

    } catch (error: any) {
        return NextResponse.json(
            { success: false, message: error.message },
            { status: 500 }
        );
    }
}

export async function PATCH(
    req: NextRequest,
    context: { params: Promise<{ id: string }> }
) {
    try {
        const { id } = await context.params;

        if (!id) {
            return NextResponse.json(
                { success: false, message: "ID dibutuhkan" },
                { status: 400 }
            );
        }

        const body = await req.json();

        if (!body || Object.keys(body).length === 0) {
            return NextResponse.json(
                { success: false, message: "Tidak ada data untuk diperbarui" },
                { status: 400 }
            );
        }

        const updateData: Record<string, any> = {};

        Object.keys(body).forEach((key) => {
            if (body[key] !== undefined) {
                updateData[key] = body[key];
            }
        });

        updateData.updated_at = new Date().toISOString();

        const { data, error } = await supabase.from("templates").update(updateData).eq("id", id).select().single();

        if (error) {
            return NextResponse.json(
                { success: false, message: error.message },
                { status: 500 }
            );
        }

        if (!data) {
            return NextResponse.json(
                { success: false, message: "Templat tidak ditemukan" },
                { status: 404 }
            );
        }

        return NextResponse.json({
            success: true,
            message: "Templat berhasil diperbarui",
            data
        });
    } catch (error: any) {
        return NextResponse.json(
            { success: false, message: error.message },
            { status: 500 }
        );
    }
}

