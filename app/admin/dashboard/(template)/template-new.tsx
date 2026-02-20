"use client";

import dynamic from "next/dynamic";
import React, { 
    useState,
    useEffect,
    useRef
} from "react";
import { 
    Import,
    TextInitial,
    Calendar,
    Binary,
    Save
} from "lucide-react";
import { Rnd } from "react-rnd";
import { pdfjs } from "react-pdf";
import Zoom from "@/components/zoom";
import RightSidebar from "@/components/template/right-sidebar";
import PlaceholderList from "./placeholder-list";
import PlaceholderAttr from "./placeholder-attr";
import { useRouter } from "next/navigation";
import axios from "axios";
import ScreenLoader from "@/components/template/screen-loader";
import * as templateProps from "@/app/admin/dashboard/(template)/template-props";

const Document = dynamic(
    () => import("react-pdf").then((mod) => mod.Document),
    { ssr: false }
);

const Page = dynamic(
    () => import("react-pdf").then((mod) => mod.Page),
    { ssr: false }
);

export type PageActiveElement = { 
    pageIndex: number;
    id: string 
};

export default function TemplateNew() {
    const router = useRouter();
    const [zoomPercentage, setZoomPercentage] = useState<number>(100);
    const fileInputRef = useRef<HTMLInputElement>(null);
    const [fileUrl, setFileUrl] = useState<string | null>(null);
    const [templateName, setTemplateName] = useState<string>("Templat Tanpa Nama");
    const [numPages, setNumPages] = useState<number>(0);
    const pageRefs = useRef<(HTMLDivElement | null)[]>([]);
    const [activePage, setActivePage] = useState<number>(1);
    const [pagePlaceholders, setPagePlaceholders] = useState<templateProps.PlaceholderElement[][]>([]);
    const [activeElement, setActiveElement] = useState<PageActiveElement | null>(null);
    const [pagesSize, setPagesSize] = useState<{ width: number, height: number }[]>([]);
    const [isSaving, setIsSaving] = useState<boolean>(false);

    useEffect(() => {
        import("react-pdf").then((pdfjsLib) => {
            pdfjsLib.pdfjs.GlobalWorkerOptions.workerSrc = new URL(
                'pdfjs-dist/build/pdf.worker.min.mjs',
                import.meta.url,
            ).toString();
        });
    }, []);

    const iconProps = {
        color: "white",
        size: 20,
        strokeWidth: 2,
        className: "shrink-0"
    };

    const handleBrowse = () => {
        fileInputRef.current?.click();
    };

    const handleFile = async (event: React.ChangeEvent<HTMLInputElement>) => {
        const selectedFile = event.target.files?.[0];
        if (!selectedFile) return;

        const url = URL.createObjectURL(selectedFile);
        setFileUrl(url);
    };

    const onDocumentLoadSuccess = ({ 
        numPages 
    }: { 
        numPages: number 
    }) => {
        setNumPages(numPages);
        setActivePage(1);
    };

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
    }, [numPages]);

    useEffect(() => {
        return () => {
            if (fileUrl) URL.revokeObjectURL(fileUrl);
        };
    }, [fileUrl]);

    const toolIconProps: templateProps.ToolIconProps = {
        size: 32,
        className: "text-gray-600 group-hover:text-emerald-700 transition duration-100 shrink-0",
        strokeWidth: 2
    };

    const createPlaceholder = (index: number, type: templateProps.PlaceholderType, name: string) => {
        if (!pagePlaceholders) return;

        const newElement: templateProps.PlaceholderElement = {
            id: crypto.randomUUID(),
            x: 128,
            y:128,
            width: 256,
            height: 14,
            style: "normal",
            alignment: "left",
            type,
            name,
            bounds: "parent",
            className: "border-2 border-emerald-400 bg-emerald-400/25 relative z-99 transition-[border-color] duration-100"
        };

        setPagePlaceholders((prev) => {
            const updated = [...prev];
            if (!updated[index]) updated[index] = [];

            updated[index] = [...updated[index], newElement];

            return updated;
        });
    };

    const updatePlaceholder = (pageIndex: number, id: string, updates: Partial<templateProps.PlaceholderElement>) => {
        setPagePlaceholders((prev) => {
            const updated = [...prev];

            updated[pageIndex] = updated[pageIndex].map((element) =>
                element.id === id ? { ...element, ...updates } : element
            );

            return updated;
        });
    };

    const deletePlaceholder = (pageIndex: number, id: string) => {
        setPagePlaceholders((prev) => {
            const updated = [...prev];
            if (!updated[pageIndex]) return prev;

            updated[pageIndex] = updated[pageIndex].filter(
                (element) => element.id !== id
            );

            return updated;
        });
        setActiveElement(null);
    };

    const uploadImageToSupabase = async (base64: string, path: string) => {
        const res = await axios.post("/api/templat/gambar", {
            base64,
            path
        });

        if (!res.data.success) throw new Error(res.data.message);
        return res.data.publicUrl;
    };

    const convertPdfPageToBase64 = async (fileUrl: string, pageNumber: number) => {
        const loadingTask = pdfjs.getDocument(fileUrl);
        const pdf = await loadingTask.promise;
        const page = await pdf.getPage(pageNumber);
        const viewport = page.getViewport({ scale: 1 });
        const canvas = document.createElement("canvas");
        const context = canvas.getContext("2d");

        canvas.width = viewport.width;
        canvas.height = viewport.height;

        await page.render({
            canvasContext: context!,
            viewport,
            canvas
        }).promise;

        return canvas.toDataURL("image/png");
    };

    const saveTemplate = async () => {
        if (!fileUrl) return;

        const imageUrls = await Promise.all(
            Array.from({ length: numPages }).map(async (_, index) => {
                const base64 = await convertPdfPageToBase64(fileUrl, index + 1);
                const url = await uploadImageToSupabase(
                    base64,
                    `${crypto.randomUUID()}.png`
                );

                return url;
            })
        );

        if (imageUrls.length != numPages) return;
        if (pagePlaceholders.length != numPages) return;

        const pagesData: templateProps.TemplatePageData[] = Array.from({ length: numPages }).map((_, index) => {
            const placeholders: templateProps.PlaceholderElement[] = pagePlaceholders[index];

            return {
                image: imageUrls[index],
                width: pagesSize[index].width,
                height: pagesSize[index].height,
                placeholders: placeholders.map((placeholder) => (
                    {
                        id: placeholder.id,
                        name: placeholder.name,
                        type: placeholder.type,
                        x: placeholder.x,
                        y: placeholder.y,
                        width: placeholder.width,
                        height: placeholder.height,
                        style: placeholder.style || "normal",
                        alignment: placeholder.alignment
                    }
                ))
            };
        });

        const template: templateProps.TemplateData = {
            id: crypto.randomUUID(),
            name: templateName,
            num_pages: numPages,
            cover: imageUrls[0],
            data: pagesData
        };

        await axios.post("/api/templat", template);
    }

    const tools: templateProps.ToolProps[] = [
        {
            title: "Teks",
            icon: <TextInitial {...toolIconProps} />,
            action: () => createPlaceholder(activePage - 1, "text", "Teks")
        },
        {
            title: "Tanggal",
            icon: <Calendar {...toolIconProps} />,
            action: () => createPlaceholder(activePage - 1, "date", "Tanggal")
        },
        {
            title: "Angka",
            icon: <Binary {...toolIconProps} />,
            action: () => createPlaceholder(activePage - 1, "number", "Angka")
        }
    ];

    return (
        <div className="w-full h-full flex flex-col items-center justify-start overflow-hidden">
            <div className="flex items-center bg-emerald-500 w-full justify-between p-4">
                <h1 className="text-xl font-bold text-white">
                    Buat Template
                </h1>
            </div>
            <div className="relative w-full h-full flex items-center justify-center overflow-hidden">
                <div className="px-4 py-2 bg-white z-998 absolute left-4 top-4 rounded-lg w-full max-w-80 border-2 border-gray-600 flex flex-col items-start justify-center gap-2">
                    <input 
                        type="text" 
                        className="w-full outline-none border-b-2 border-gray-200 focus:border-emerald-500 py-1 text-md font-bold"
                        value={templateName}
                        placeholder="Nama templat"
                        onChange={(event) => setTemplateName(event.target.value)}
                        required
                    />
                    <div className="flex flex-col items-start justify-center gap-1">
                        <h2 className="text-xs font-medium">
                            {numPages} halaman
                        </h2>
                    </div>
                </div>
                <div className="relative h-full w-auto max-w-full flex-1 shrink-0 min-w-0 bg-gray-200">
                    <ScreenLoader 
                        title="Menyimpan Templat"
                        show={isSaving}
                    />
                    <div className="w-auto max-w-full h-full flex items-center justify-center min-w-0">
                        <div className="h-full w-full px-8 py-16 overflow-x-auto overflow-y-auto min-w-0 flex justify-start lg:justify-center items-start">
                            {fileUrl ? (
                                <Document
                                    file={fileUrl}
                                    onLoadSuccess={onDocumentLoadSuccess}
                                    className="flex flex-col w-max h-fit items-center justify-center gap-4"
                                    scale={zoomPercentage / 100}
                                    loading={null}
                                >
                                    {Array.from(new Array(numPages), (_, index) => (
                                        <div
                                            key={index}
                                            data-page={index}
                                            className="flex flex-col items-start justify-center"
                                            ref={(element) => {
                                                pageRefs.current[index] = element;
                                            }}
                                        >
                                            <span className="px-2 py-1 bg-emerald-500 text-xs text-white rounded-t-md">
                                                Halaman {index + 1}
                                            </span>
                                            <div 
                                                className="w-full h-fit flex items-center justify-center relative"
                                                onMouseDown={(event) => {
                                                    if (event.target === event.currentTarget) setActiveElement(null);
                                                }}
                                            >
                                                <Page
                                                    pageNumber={index + 1}
                                                    className="border-2 border-gray-600 flex flex-col items-center justify-center overflow-hidden"
                                                    width={595}
                                                    height={842}
                                                    onLoadSuccess={(page) => {
                                                        const originalWidth = page.originalWidth;
                                                        const originalHeight = page.originalHeight;

                                                        setPagesSize((prev) => ([...prev, {
                                                            width: originalWidth,
                                                            height: originalHeight
                                                        }]))
                                                    }}
                                                />
                                                {pagePlaceholders[index]?.map((placeholder) => {
                                                    const scale = zoomPercentage / 100;

                                                    return (
                                                        <Rnd 
                                                            key={placeholder.id}
                                                            size={{ 
                                                                width: placeholder.width * scale, 
                                                                height: placeholder.height * scale
                                                            }}
                                                            position={{ 
                                                                x: placeholder.x * scale, 
                                                                y: placeholder.y * scale 
                                                            }}
                                                            bounds={placeholder.bounds}
                                                            className={`${placeholder.className}  ${
                                                                activeElement?.id === placeholder.id &&
                                                                activeElement?.pageIndex === index
                                                                    ? "border-emerald-500 ring-2 ring-emerald-400"
                                                                    : ""
                                                            }`}
                                                            onMouseDown={() =>
                                                                setActiveElement({
                                                                    pageIndex: index,
                                                                    id: placeholder.id,
                                                                })
                                                            }
                                                            onResizeStop={(event, direction, ref) => {
                                                                updatePlaceholder(index, placeholder.id, {
                                                                    width: parseFloat(ref.style.width) / scale,
                                                                    height: parseFloat(ref.style.height) / scale
                                                                });
                                                            }}
                                                            onDragStop={(event, data) => {
                                                                updatePlaceholder(index, placeholder.id, {
                                                                    x: data.x / scale,
                                                                    y: data.y / scale
                                                                });
                                                            }}
                                                        />
                                                    )
                                                })}
                                            </div>
                                        </div>
                                    ))}
                                </Document>
                            ) : (
                                <div className="w-full h-full flex flex-col items-center justify-center">
                                    <h1 className="text-xl font-medium text-gray-400 text-nowrap">
                                        Tidak ada file yang ditampilkan
                                    </h1>
                                </div>
                            )}
                        </div>
                        {fileUrl && (
                            <span className="z-100 absolute rounded-full flex items-center justify-center px-4 py-2 bg-emerald-500 right-4 top-4">
                                <h4 className="text-xs text-white text-center text-nowrap font-medium">
                                    Halaman {activePage} dari {numPages}
                                </h4>
                            </span>
                        )}
                        {fileUrl && (
                            <Zoom 
                                className="gap-1 p-2 bg-emerald-500 fixed bottom-8 z-100 rounded-full"
                                onZoomOut={() => setZoomPercentage((zoomPercentage - 10) >= 20 ? (zoomPercentage - 10) : 20)}
                                onZoomIn={() => setZoomPercentage((zoomPercentage + 10) <= 200 ? (zoomPercentage + 10) : 200)}
                                onFit={() => setZoomPercentage(100)}
                                scale={zoomPercentage}
                            />
                        )}
                    </div>
                </div>
                <RightSidebar className="z-999">
                    <div className="w-full min-h-full h-fit flex flex-col items-center justify-start overflow-y-auto gap-4 p-6 bg-white">
                        <div className="w-full h-fit flex flex-col items-center justify-center gap-4">
                            <h1 className="text-md font-medium text-nowrap truncate leading-10 border-b-2 border-emerald-500 w-full">
                                Opsi Templat
                            </h1>
                            <div className="flex flex-col items-center justify-center w-full h-fit gap-2">
                                <div className="w-full h-fit flex items-center justify-center">
                                    <input
                                        type="file"
                                        accept="application/pdf"
                                        ref={fileInputRef}
                                        onChange={handleFile}
                                        className="hidden"
                                    />
                                    <button 
                                        className="max-w-64 w-full py-2 px-4 flex items-center justify-center gap-2 bg-emerald-500 hover:bg-emerald-600 transition duration-100 text-white rounded-full text-nowrap text-center"
                                        onClick={handleBrowse}
                                    >
                                        <Import {...iconProps}/>
                                        Impor Dokumen
                                    </button>
                                </div>
                                <button 
                                    className="max-w-64 w-full py-2 px-4 flex items-center justify-center gap-2 bg-emerald-500 hover:bg-emerald-600 transition duration-100 text-white rounded-full text-nowrap text-center"
                                    onClick={async () => {
                                        setIsSaving(true);
                                        await saveTemplate();
                                        setIsSaving(false);
                                        router.push("?daftar-templat");
                                    }}
                                >
                                    <Save {...iconProps}/>
                                    Simpan Templat
                                </button>
                            </div>
                        </div>
                        <div className="w-full h-fit flex flex-col items-start justify-center gap-4">
                            <h1 className="text-md font-medium text-nowrap truncate leading-10 border-b-2 border-emerald-500 w-full">
                                Penampung
                            </h1>
                            <div className="flex w-full max-h-full h-fit items-start justify-center gap-2 flex-wrap">
                                {tools.map((value, index) => {
                                    return (
                                        <span
                                            key={index} 
                                            className="group p-4 flex flex-col gap-2 items-center justify-center aspect-square size-24 rounded-lg border-2 border-gray-600 hover:border-emerald-500 cursor-pointer hover:bg-emerald-100 transition duration-100"
                                            onClick={value.action ? value.action : () => {}}
                                        >
                                            {value.icon}
                                            <h2 className="text-sm text-center font-medium text-gray-600 group-hover:text-emerald-700 transition duration-100">
                                                {value.title}
                                            </h2>
                                        </span>
                                    )
                                })}
                            </div>
                        </div>
                        <PlaceholderAttr 
                            numPages={numPages}
                            placeholders={pagePlaceholders}
                            state={activeElement}
                            onUpdateSetter={updatePlaceholder}
                            onDeleteSetter={deletePlaceholder}
                        />
                        <PlaceholderList 
                            numPages={numPages}
                            placeholders={pagePlaceholders}
                            state={activeElement}
                            setter={setActiveElement}
                        />
                    </div>
                </RightSidebar>
            </div>
        </div>
    );
}