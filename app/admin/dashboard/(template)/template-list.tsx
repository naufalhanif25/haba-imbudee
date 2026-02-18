"use client";

import TemplateMenu, { 
    TemplateMenuButton 
} from "@/components/dashboard/template-menu";

export default function TemplateList() {
    // TODO: Tambahkan action callback
    const templateMenuButtons: TemplateMenuButton[] = [
        {
            title: "Ganti nama",
            action: () => {}
        },
        {
            title: "Edit",
            action: () => {}
        },
        {
            title: "Hapus",
            action: () => {},
            className: "text-red-500 hover:bg-red-100"
        }
    ];

    return (
        <div className="w-full h-full flex flex-col items-center justify-start overflow-hidden">
            <div className="flex items-center bg-emerald-500 w-full justify-between p-4">
                <h1 className="text-xl font-bold text-white">
                    Daftar Template
                </h1>
            </div>
            <div className="w-full grow flex items-start justify-center overflow-y-auto">
                {/* TODO: Gunakan data dari backend */}
                <div className="w-full p-8 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-8">
                    {Array.from({ length: 20 }).map((_, index) => {
                        return (
                            <div
                                key={index}
                                className="group w-full overflow-hidden flex flex-col items-center justify-center cursor-pointer outline-2 outline-gray-200 hover:outline-emerald-500 aspect-[3/4] rounded-lg"
                            >
                                <div className="w-full grow rounded-t-lg overflow-hidden bg-gray-200 transition-[filter] duration-100 group-hover:brightness-90">

                                </div>
                                <div className="w-full p-4 flex items-center justify-start bg-white shrink-0">
                                    <div className="grow h-fit flex flex-col items-start justify-start overflow-hidden">
                                        <h1 className="text-md font-medium text-nowrap w-full truncate">
                                            Nama Template
                                        </h1>
                                        <p className="text-sm text-gray-600 text-nowrap w-full truncate">
                                            Dibuat 14 Februari 2026
                                        </p>
                                    </div>
                                    <TemplateMenu 
                                        key={index}
                                        buttons={templateMenuButtons}
                                        className="shrink-0"
                                    />
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>
        </div>
    )
}