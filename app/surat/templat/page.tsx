"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { 
    ArrowLeft,
    Search
} from "lucide-react";

export default function BuatSurat() {
    const router = useRouter();
    const [keyword, setKeyword] = useState<string>("");

    return (
        <div className="w-screen h-screen flex flex-col items-center justify-start bg-white">
            <div className="flex items-center bg-emerald-500 w-full justify-between p-4">
                <h1 className="text-xl font-bold text-white">
                    Daftar Template
                </h1>
            </div>
            <div className="w-full h-full flex flex-col items-center justify-start overflow-hidden">
                <div className="w-full px-4 py-3 border-b-2 border-gray-600 flex items-center justify-between bg-white">
                    <button 
                        className="flex items-center justify-center gap-2 py-2 px-3 rounded-lg hover:bg-gray-200 transition duration-100"
                        onClick={() => router.back()}
                    >
                        <ArrowLeft 
                            size={20}
                            strokeWidth={2}
                            className="shrink-0"
                        />
                        <h1 className="text-md">
                            Kembali
                        </h1>
                    </button>
                    <div className="flex items-center justify-center py-2 px-3 gap-2 rounded-full max-w-80 w-full h-fit relative overflow-hidden border-2 border-gray-400">
                        <Search 
                            size={20}
                            strokeWidth={2}
                            className="text-gray-400 shrink-0"
                        />
                        <input 
                            type="text" 
                            className="w-full text-sm outline-none"
                            placeholder="Cari templat"
                            value={keyword}
                            onChange={(event) => setKeyword(event.target.value)}
                        />
                    </div>
                </div>
                <div className="w-full grow overflow-y-auto flex items-start justify-center">
                    <div className="w-full p-8 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-8">
                        {/* TODO: Gunakan data dari backend */}
                        {Array.from({ length: 20 }).map((_, index) => {
                            return (
                                <div
                                    key={index}
                                    className="group w-full flex flex-col items-center justify-center cursor-pointer outline-2 outline-gray-200 hover:outline-emerald-500 aspect-[3/4] rounded-lg"
                                >
                                    <div className="w-full grow rounded-t-lg overflow-hidden bg-gray-200 transition-[filter] duration-100 group-hover:brightness-90">
                    
                                    </div>
                                    <div className="w-full p-4 flex items-center justify-start bg-white">
                                        <div className="grow h-fit flex flex-col items-start justify-start">
                                            <h1 className="text-md font-medium text-nowrap w-full truncate">
                                                Nama Template
                                            </h1>
                                            <p className="text-sm text-gray-600 text-nowrap w-full truncate">
                                                Dibuat 14 Februari 2026
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </div>
            </div>
        </div>
    )
}