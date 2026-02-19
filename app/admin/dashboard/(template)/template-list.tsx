"use client";

import { 
    useEffect,
    useState
} from "react";
import Image from "next/image";
import axios from "axios";
import TemplateMenu, { 
    TemplateMenuButton 
} from "@/components/dashboard/template-menu";
import { PackageOpen } from "lucide-react";
import { TemplateData } from "./template-props";
import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";
import ScreenLoader from "@/components/template/screen-loader";

dayjs.extend(utc);

export default function TemplateList() {
    const [templateData, setTemplateData] = useState<TemplateData[]>([]);
    const [isLoading, setIsLoading] = useState<boolean>(false);

    const [currentData, setCurrentData] = useState<TemplateData>({
        id: "",
        name: "",
        num_pages: 0,
        cover: "",
        data: [],
        created_at: "",
        updated_at: ""
    });
    const [openEditOverlay, setOpenEditOverlay] = useState<boolean>(false);

    const templateMenuButtons: TemplateMenuButton[] = [
        {
            title: "Ganti Nama",
            action: (data) => {
                setOpenEditOverlay(true);
                setCurrentData(data);
            }
        },
        {
            title: "Hapus",
            action: async (id) => {
                setIsLoading(true);
                await deleteTemplate(id);
                setIsLoading(false);
            },
            className: "text-red-500 hover:bg-red-100"
        }
    ];

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

    const deleteTemplate = async (id: string) => {
        try {
            await axios.delete(`/api/templat/${id}`);
            window.location.reload();
        } catch (error: any) {
            console.error(error);
        }
    }

    const updateTemplate = async () => {
        try {
            await axios.patch(`/api/templat/${currentData.id}`, currentData);
            window.location.reload();
        } catch (error: any) {
            console.error(error);
        }
    }

    return (
        <>
            <div className="w-full h-full flex flex-col items-center justify-start overflow-hidden">
                <div className="flex items-center bg-emerald-500 w-full justify-between p-4">
                    <h1 className="text-xl font-bold text-white">
                        Daftar Template
                    </h1>
                </div>
                <div className="w-full grow flex items-start justify-center overflow-y-auto">
                    {templateData.length > 0 ? (
                        <div className="w-full p-8 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-8">
                            {templateData.map((value) => {
                                return (
                                    <div
                                        key={value.id}
                                        className="group w-full flex flex-col items-center justify-center cursor-pointer outline-2 outline-gray-200 hover:outline-emerald-500 aspect-[3/4] rounded-lg"
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
                                        <div className="w-full p-4 flex items-center justify-start bg-white shrink-0">
                                            <div className="grow h-fit flex flex-col items-start justify-start overflow-hidden">
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
                                            <TemplateMenu 
                                                params={[value, value.id]}
                                                buttons={templateMenuButtons}
                                                className="shrink-0"
                                            />
                                        </div>
                                    </div>
                                );
                            })}
                            <ScreenLoader 
                                title="Menghapus Templat"
                                show={isLoading}
                            />
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
            {openEditOverlay && (
                <div className="w-screen h-screen flex items-center justify-center p-16 bg-black/50 z-999 fixed left-0 top-0">
                    <div className="p-8 rounded-xl border-2 border-gray-600 gap-6 flex flex-col items-center justify-center bg-white w-full h-fit max-w-160">
                        <div className="flex flex-col w-full h-fit items-center justify-center gap-2">
                            <h2 className="text-lg font-medium w-full">
                                Ganti Nama
                            </h2>
                            <input 
                                type="text"
                                className="py-2 w-full h-fit text-md border-b-2 border-gray-400 outline-none focus:border-emerald-500" 
                                placeholder="Nama templat"
                                value={currentData?.name || ""}
                                onChange={(event) => setCurrentData((prev) => ({
                                    ...prev,
                                    name: event.target.value
                                }))}
                            />
                        </div>
                        <div className="w-fit h-fit flex items-center justify-center gap-4">
                            <button 
                                className="bg-red-500 hover:bg-red-600 transition duration-100 py-2 px-8 text-md font-medium rounded-md text-white"
                                onClick={() => setOpenEditOverlay(false)}
                            >
                                Batal
                            </button>
                            <button 
                                className="bg-emerald-500 hover:bg-emerald-600 transition duration-100 py-2 px-8 text-md font-medium rounded-md text-white"
                                onClick={updateTemplate}
                            >
                                Ganti
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </>
    )
}