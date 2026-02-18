"use client";

import React from "react";
import { useState } from "react";
import { useRouter } from "next/navigation";
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
    name: string;
    icon: React.ReactElement;
    parentClassName?: string;
    className?: string;
    style?: React.CSSProperties;
    action?: () => void;
};

export default function Dashboard() {
    const router = useRouter();
    const [openSidebar, setOpenSidebar] = useState<boolean>(false);
    const [currentWindow, setCurrentWindow] = useState<React.ReactNode>(<TemplateList/>);

    const dashboardIconProps: DashboardIconProps = {
        size: 24,
        strokeWidth: 2
    }

    const sidebarButtons: SidebarButton[] = [
        {
            name: "Daftar Templat",
            icon: <LibraryBig {...dashboardIconProps}/>,
            action: () => setCurrentWindow(<TemplateList/>)
        },
        {
            name: "Buat Templat Baru",
            icon: <FilePlusCorner {...dashboardIconProps}/>,
            action: () => setCurrentWindow(<TemplateNew />)
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
                await axios.post("/api/keluar");
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
                                    } ${value.parentClassName}`}
                                    onClick={value.action}
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
                {currentWindow}
            </div>
        </div>
    );
}