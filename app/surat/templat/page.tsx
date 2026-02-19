"use client";

import { useRouter } from "next/navigation";
import { 
    useState,
    useEffect
} from "react";
import { 
    ArrowLeft,
    Search,
    PackageOpen
} from "lucide-react";
import Image from "next/image";
import axios from "axios";
import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";
import { TemplateData } from "@/app/admin/dashboard/(template)/template-props";

dayjs.extend(utc);

export default function DaftarSurat() {
    const router = useRouter();
    const [keyword, setKeyword] = useState<string>("");
    const [templateData, setTemplateData] = useState<TemplateData[]>([]);

    useEffect(() => {
        const fetchTemplates = async () => {
            try {
                const res = await axios.get("/api/templat");
                const data: TemplateData[] = await res.data.data;

                setTemplateData(data);
            } catch (error: any) {
                console.error(error);
            }
        }
        fetchTemplates();
    }, []);

    const formatDate = (date: string) => {
        return dayjs.utc(date).format("DD-MMM-YYYY (HH:mm:ss)");
    }

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
                    {templateData.length > 0 ? (
                        <div className="w-full p-8 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-8">
                            {templateData.filter((data) => {
                                if (!keyword.trim()) return true;
                                return data.name.toLowerCase().includes(keyword.toLowerCase().trim());
                            }).map((value) => {
                                return (
                                    <div
                                        key={value.id}
                                        className="group w-full flex flex-col items-center justify-center cursor-pointer outline-2 outline-gray-200 hover:outline-emerald-500 aspect-[3/4] rounded-lg"
                                        onClick={() => router.push(`/surat/buat?id=${value.id}`)}
                                    >
                                        <div className="w-full grow rounded-t-lg overflow-hidden bg-gray-200 transition-[filter] duration-100 group-hover:brightness-90">
                                            <Image 
                                                src={value.cover}
                                                alt={value.name}
                                                height={1080}
                                                width={720}
                                                unoptimized
                                            />
                                        </div>
                                        <div className="w-full p-4 flex shrink-0 overflow-hidden items-center justify-start bg-white">
                                            <div className="w-full h-fit flex flex-col items-start justify-start">
                                                <h1 className="text-md font-medium text-nowrap w-full truncate">
                                                    {value.name}
                                                </h1>
                                                <p className="text-sm text-gray-600 text-nowrap w-full truncate">
                                                    Dibuat pada {formatDate(value.created_at!)}
                                                </p>
                                                <p className="text-sm text-gray-600 text-nowrap w-full truncate">
                                                    Diperbarui pada {formatDate(value.updated_at!)}
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    ) : (
                        <div className="w-full h-full flex flex-col items-center justify-center p-16 gap-4">
                            <PackageOpen 
                                size={64}
                                strokeWidth={1}
                                className="shrink-0 text-gray-400"
                            />
                            <h1 className="text-xl font-medium text-gray-400">
                                Tidak ada templat yang tersedia
                            </h1>
                        </div>
                    )}
                </div>
            </div>
        </div>
    )
}