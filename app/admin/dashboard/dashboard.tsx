"use client";

import React from "react";
import { 
    useState,
    useEffect
} from "react";
import { 
    useRouter,
    useSearchParams
} from "next/navigation";
import {
    PanelLeftOpen,
    PanelLeftClose,
    FilePlusCorner,
    LibraryBig,
    LogOut,
    Home
} from "lucide-react";
import axios from "axios";
import dynamic from "next/dynamic";
import ScreenLoader from "@/components/template/screen-loader";

const TemplateList = dynamic(
    () => import("./(template)/template-list"),
    { ssr: false }
);

const TemplateNew = dynamic(
    () => import("./(template)/template-new"),
    { ssr: false }
);

type DashboardIconProps = {
    size: number;
    strokeWidth: number;
};

type SidebarButton = {
    id?: string;
    name: string;
    icon: React.ReactElement;
    parentClassName?: string;
    className?: string;
    style?: React.CSSProperties;
    action: (...args: any[]) => void;
};

export default function DashboardClient() {
    const router = useRouter();
    const [openSidebar, setOpenSidebar] = useState<boolean>(false);
    const searchParams = useSearchParams();
    const section = searchParams.get("section");
    const [loggingOut, setLoggingOut] = useState<boolean>(false);

    useEffect(() => {
        if (!section) {
            const params = new URLSearchParams(searchParams.toString());
            
            params.set("section", "daftar-templat");
            router.replace(`?${params.toString()}`);
        }
    }, [section, searchParams, router]);

    const dashboardIconProps: DashboardIconProps = {
        size: 24,
        strokeWidth: 2
    }

    const setSection = (section: string) => {
        const params = new URLSearchParams(searchParams.toString());

        params.set("section", section);
        router.push(`?${params.toString()}`);
    };

    const sidebarButtons: SidebarButton[] = [
        {
            id: "daftar-templat",
            name: "Daftar Templat",
            icon: <LibraryBig {...dashboardIconProps}/>,
            action: (id: string) => setSection(id)
        },
        {
            id: "buat-templat",
            name: "Buat Templat Baru",
            icon: <FilePlusCorner {...dashboardIconProps}/>,
            action: (id: string) => setSection(id)
        },
        {
            name: "Kembali ke Beranda",
            icon: <Home {...dashboardIconProps}/>,
            action: () => router.push("/")
        },
        {
            name: "Keluar",
            icon: <LogOut 
                {...dashboardIconProps}
                className="text-red-500"
            />,
            action: async () => {
                setLoggingOut(true);
                await axios.post("/api/keluar");
                setLoggingOut(false);
                router.push("/");
            },
            className: "text-red-500",
            parentClassName: "hover:bg-red-200"
        }
    ]

    return (
        <div className="flex h-screen w-screen justify-center items-center bg-white relative">
            <div className="z-999 bg-white flex flex-col items-center justify-start border-r-2 border-gray-600 h-full w-fit">
                <div className="flex flex-col items-start justify-start m-2 w-fit h-full gap-8">
                    <span 
                        className="w-fit h-fit p-2 rounded-lg hover:bg-emerald-200 transition duration-100 cursor-pointer"
                        onClick={() => openSidebar
                            ? setOpenSidebar(false)
                            : setOpenSidebar(true)
                        }
                    >
                        {
                            openSidebar
                                ? <PanelLeftClose {...dashboardIconProps}/>
                                : <PanelLeftOpen {...dashboardIconProps}/>
                        }
                    </span>
                    <div className="w-full grow flex flex-col items-center justify-start gap-2">
                        {sidebarButtons.map((value, index) => {
                            return (
                                <div
                                    key={index}
                                    className={`flex p-2 items-center justify-start w-full h-fit rounded-lg cursor-pointer overflow-hidden hover:bg-emerald-200 transition duration-100 transition-[gap] duration-500 ${
                                        openSidebar
                                            ? "gap-3"
                                            : "gap-0"
                                    } ${
                                        value.id === section && "bg-emerald-200"
                                    } ${value.parentClassName}`}
                                    onClick={() => value.action(value.id)}
                                >
                                    {value.icon}
                                    <h1 
                                        className={`text-md text-left select-none pointer-events-none h-fit transition-all duration-500 overflow-hidden text-nowrap truncate ${
                                            openSidebar
                                                ? "w-48 opacity-100 translate-x-0"
                                                : "w-0 opacity-0 translate-x-2"
                                        } ${value.className}`}
                                        style={value.style}
                                    >
                                        {value.name}
                                    </h1>
                                </div>
                            )
                        })}
                    </div>
                </div>
            </div>
            <div className="grow h-screen overflow-y-auto scroll-smooth flex flex-col items-center justify-center">
                {
                    section === "daftar-templat" && <TemplateList/>
                }
                {
                    section === "buat-templat" && <TemplateNew />
                }
            </div>
            {loggingOut && (
                <div className="w-screen h-screen z-999 fixed left-0 top-0 flex items-center justify-center">
                    <ScreenLoader 
                        title="Keluar"
                        show={true}
                    />
                </div>
            )}
        </div>
    );
}