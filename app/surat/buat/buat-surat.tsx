"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import { 
    useState,
    useEffect,
    useRef
} from "react";
import { useSearchParams } from "next/navigation";
import { useReactToPrint } from "react-to-print";
import TemplateInput from "@/components/template/template-input";
import Zoom from "@/components/zoom";
import axios from "axios";
import MenuLast from "@/components/create/menu-last";
import RightSidebar from "@/components/template/right-sidebar";
import ScreenLoader from "@/components/template/screen-loader";
import * as templateProps from "@/app/admin/dashboard/(template)/template-props";

type PlaceholderData = {
    name: string;
    value: string;
}

type DocumentProps = {
    fontSize: number;
    name: string;
} 

export default function BuatSuratClient() {
    const router = useRouter();
    const searchParams = useSearchParams();
    const templateId = searchParams.get("id");
    const pageRefs = useRef<(HTMLDivElement | null)[]>([]);
    const [activePage, setActivePage] = useState<number>(1);
    const [placeholderData, setPlaceholderData] = useState<Record<string, PlaceholderData>>({});
    const [zoomPercentage, setZoomPercentage] = useState<number>(100);
    const printRef = useRef<HTMLDivElement>(null);
    const [templateData, setTemplateData] = useState<templateProps.TemplateData | null>(null);

    useEffect(() => {
        if (!templateId) return;

        const fetchTemplate = async () => {
            try {
                const res = await axios.get(`/api/templat/${templateId}`);

                if (!res.data.success || !res.data.data) {
                    console.warn(`Template dengan ID '${templateId}' tidak tersedia.`);
                    router.back();

                    return;
                }

                const data: templateProps.TemplateData = await res.data.data;

                setTemplateData(data);
            } catch (error: any) {
                console.error(error);
                router.back();
            }
        }
        fetchTemplate();
    }, [templateId]);
    
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [docProps, setDocProps] = useState<DocumentProps>({
        fontSize: 9,
        name: templateData?.name?.toLowerCase().replaceAll(" ", "_") || "Surat Tanpa Nama"
    });
    
    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        const pageIndex = Number(
                            entry.target.getAttribute("data-page")
                        );
                        setActivePage(pageIndex + 1);
                    }
                });
            },
            {
                root: null,
                threshold: 0.6,
            }
        );
        
        pageRefs.current.forEach((page) => {
            if (page) observer.observe(page);
        });
    
        return () => observer.disconnect();
    }, [templateData?.num_pages]);

    const updatePlaceholderData = (key: string, name: string = "", value: string = "") => {
        setPlaceholderData((prev) => ({
            ...prev,
            [key]: { name, value }
        }))
    };

    const formatDate = (date: string) => {
        if (!date) return;
        
        const months = [
            "Januari", "Februari", "Maret", "April",
            "Mei", "Juni", "Juli", "Agustus",
            "September", "Oktober", "November", "Desember"
        ];

        const [year, month, day] = date.split("-");
        const formatted = `${parseInt(day)} ${months[parseInt(month) - 1]} ${year}`;

        return formatted;
    };

    const handlePrint = useReactToPrint({
        contentRef: printRef,
        documentTitle: docProps.name,
        pageStyle: (`
            @page {
                padding: 0 !important;
                margin: 0 !important;
            }

            @media print {
                body {
                    -webkit-print-color-adjust: exact;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                }
            }
        `)
    });

    const getTextStyle = (style: "normal" | "bold" | "italic" | "underline") => {
        switch (style) {
            case "bold":
                return { fontWeight: "bold" };
            case "italic":
                return { fontStyle: "italic" };
            case "underline":
                return { textDecoration: "underline" };
            default:
                return {};
        }
    };

    return (
        <div className="w-screen h-screen flex flex-col items-center justify-start bg-white">
            <div className="flex items-center bg-emerald-500 w-full justify-between p-4">
                <h1 className="text-xl font-bold text-white">
                    Buat Surat
                </h1>
            </div>
            <div className="w-full grow overflow-hidden flex items-center justify-center relative">
                <div className="h-full grow flex items-start justify-center relative bg-gray-200 overflow-hidden flex-1 shrink-0 min-w-0">
                    <div className="px-4 py-2 gap-2 z-998 rounded-lg flex flex-col items-start max-w-80 w-full justify-center border-2 bg-white border-gray-600 absolute left-4 top-4">
                        <div className="w-full h-fit border-b-1 border-emerald-500 py-1">
                            <h1 className="w-full font-bold text-md text-nowrap">
                                {templateData?.name}
                            </h1>
                        </div>
                        <p className="font-medium text-xs text-nowrap">
                            {templateData?.num_pages} halaman
                        </p>
                    </div>
                    <ScreenLoader 
                        title="Mengekspor Surat"
                        show={isLoading}
                    />
                    {!templateData && (
                        <ScreenLoader 
                            title="Memuat templat Surat"
                            show={true}
                        />
                    )}
                    <div className="h-full grow flex items-start justify-start lg:justify-center overflow-x-auto overflow-y-auto">
                        <div 
                            className="h-fit w-fit px-8 py-16 flex flex-col items-center justify-center gap-4 inline-block"
                            style={{
                                transform: `scale(${(zoomPercentage / 100) + 0.05})`,
                                transformOrigin: "top center"
                            }}
                            ref={printRef}
                        >
                            {templateData?.data.map((template, index) => {
                                return (
                                    <div
                                        key={index}
                                        className="w-fit h-fit flex flex-col items-start justify-center"
                                    >
                                        <span className="py-1 px-2 rounded-t-md bg-emerald-500 text-xs text-white">
                                            Halaman {index + 1}
                                        </span>
                                        <div 
                                            className="aspect-[1/1.414] ring-2 ring-gray-600 overflow-hidden relative print-page page-nostyle"
                                            style={{
                                                width: `${template.width || 595}px`,
                                                height: `${template.height || 842}px`
                                            }}
                                        >
                                            <Image 
                                                src={template.image}
                                                alt={`Halaman ${index + 1}`}
                                                height={template.height || 842}
                                                width={template.width || 595}
                                                style={{
                                                    width: "100%",
                                                    height: "100%",
                                                    objectFit: "cover"
                                                }}
                                                unoptimized
                                            />
                                            {(template.placeholders as templateProps.TamplatePlaceholder[]).map((value) => {
                                                return (
                                                    <div 
                                                        key={value.id}
                                                        style={{
                                                            width: value.width,
                                                            height: value.height,
                                                            top: value.y,
                                                            left: value.x
                                                        }}
                                                        className="absolute cursor-pointer bg-emerald-500/25 border-1 border-emerald-500 flex items-center justify-center page-nostyle"
                                                    >
                                                        <div className="group w-full h-full flex items-start justify-start relative">
                                                            <span className="absolute opacity-0 group-hover:opacity-100 top-0 left-0 -translate-y-[100%] text-xs text-white py-1 px-2 rounded-t-md bg-emerald-500">
                                                                {value.name}
                                                            </span>
                                                            <p 
                                                                className="w-full h-fit text-left leading-none"
                                                                style={{ 
                                                                    ...getTextStyle(value.style),
                                                                    textAlign: value.alignment,
                                                                    fontFamily: "Times New Roman, serif",
                                                                    fontSize: `${docProps.fontSize}pt`
                                                                }}
                                                            >
                                                                {
                                                                    value.type === "date"
                                                                        ? formatDate(placeholderData[value.id]?.value)
                                                                        : placeholderData[value.id]?.value
                                                                }
                                                            </p>
                                                        </div>
                                                    </div>
                                                )
                                            })}
                                        </div>
                                    </div>
                                )
                            })}
                        </div>
                    </div>
                    <Zoom 
                        className="gap-1 p-2 bg-emerald-500 fixed bottom-8 z-100 rounded-full"
                        onZoomOut={() => setZoomPercentage((zoomPercentage - 10) >= 20 ? (zoomPercentage - 10) : 20)}
                        onZoomIn={() => setZoomPercentage((zoomPercentage + 10) <= 200 ? (zoomPercentage + 10) : 200)}
                        onFit={() => setZoomPercentage(100)}
                        scale={zoomPercentage}
                    />
                    <div className="z-100 px-4 py-2 rounded-full bg-emerald-500 text-xs text-white text-center text-nowrap font-medium absolute top-4 right-4">
                        Halaman {activePage} dari {templateData?.num_pages}
                    </div>
                </div>
                <RightSidebar className="z-999">
                    <div className="overflow-hidden w-full h-full flex flex-col items-center justify-start p-6 gap-2 bg-white">
                        <div className="flex flex-col flex-1 shrink-0 items-center justify-center w-full grow overflow-hidden">
                            <div className="w-full py-2 border-b-2 border-emerald-500">
                                <h1 className="text-md font-medium text-nowrap">
                                    Atribut Surat
                                </h1>
                            </div>
                            <div className="w-full grow flex-1 shrink-0 overflow-x-hidden overflow-y-auto flex flex-col items-center justify-start gap-4 py-4">
                                {templateData?.data[activePage - 1].placeholders.map((value) => {
                                    return (
                                        <TemplateInput 
                                            key={value.id}
                                            type={value.type}
                                            title={value.name}
                                            className="w-full h-fit flex flex-col items-start justify-center"
                                            placeholder={`Masukkan ${value.name.toLowerCase()}`}
                                            value={placeholderData[value.id]?.value}
                                            onChange={(event) => updatePlaceholderData(value.id, value.name, event.target?.value)}
                                            required
                                        />
                                    )
                                })}
                            </div>
                        </div>
                        <div className="flex flex-col flex-1 shrink-0 items-center justify-center w-full grow overflow-hidden">
                            <div className="w-full py-2 border-b-2 border-emerald-500">
                                <h1 className="text-md font-medium text-nowrap">
                                    Properti Surat
                                </h1>
                            </div>
                            <div className="w-full grow flex-1 shrink-0 overflow-x-hidden overflow-y-auto flex flex-col items-center justify-start gap-4 py-4 border-b-2 border-emerald-500">
                                <TemplateInput 
                                    type="text"
                                    title="Nama Surat"
                                    className="w-full h-fit flex flex-col items-start justify-center"
                                    placeholder={`Masukkan nama surat`}
                                    value={docProps.name}
                                    onChange={(event) => setDocProps((prev) => ({
                                        ...prev,
                                        name: event.target.value
                                    }))}
                                    min={1}
                                    required
                                />
                                <TemplateInput 
                                    type="number"
                                    title="Ukuran Huruf"
                                    className="w-full h-fit flex flex-col items-start justify-center"
                                    placeholder={`Masukkan ukuran huruf`}
                                    value={docProps.fontSize}
                                    onChange={(event) => setDocProps((prev) => ({
                                        ...prev,
                                        fontSize: Number(event.target.value)
                                    }))}
                                    min={1}
                                    required
                                />
                            </div>
                        </div>
                        <MenuLast 
                            onDownload={() => {
                                setIsLoading(true);
                                setZoomPercentage(100);
                                setTimeout(() => {
                                    handlePrint?.();
                                    setIsLoading(false);
                                }, 500);
                            }}
                            onClose={() => router.back()}
                        />
                    </div>
                </RightSidebar>
            </div>
        </div>
    )
}