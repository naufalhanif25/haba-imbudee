"use client";

import React from "react";
import { useState } from "react";
import { EllipsisVertical } from "lucide-react";

type DashboardMenuIconProps = {
    size: number;
    strokeWidth: number;
};

export type TemplateMenuButton = {
    title: string;
    action?: () => void;
    className?: string;
    style?: React.CSSProperties;
};

export type TemplateMenuProps = React.HTMLAttributes<HTMLDivElement> & {
    buttons?: TemplateMenuButton[];
    className?: string;
}

export default function TemplateMenu({
    buttons,
    className,
    ...props
}: TemplateMenuProps) {
    const [openMenu, setOpenMenu] = useState<boolean>(false);

    const dashboardMenuIconProps: DashboardMenuIconProps = {
        size: 20,
        strokeWidth: 2
    }

    // TODO: Tambahkan gambar preview
    return (
        <div 
            className={`w-fit h-fit relative ${className}`}
            {...props}
        >
            <div 
                className="p-2 rounded-lg hover:bg-gray-200 transition duration-100 cursor-pointer"
                onClick={
                    () => openMenu
                        ? setOpenMenu(false)
                        : setOpenMenu(true)
                }
            >
                <EllipsisVertical {...dashboardMenuIconProps}/>
            </div>
            <span className={`p-2 rounded-xl bg-gray-100 border-2 border-gray-200 flex flex-col overflow-hidden items-center justify-center absolute right-0 -bottom-1 translate-y-[100%] z-999 h-fit w-fit transition-all duration-300 ${
                openMenu 
                    ? "max-h-40 opacity-100"
                    : "max-h-0 opacity-0"
            }`}>
                {buttons?.map((value, index) => {
                    return (
                        <button 
                            key={index}
                            onClick={value.action}
                            className={`w-full h-fit text-md py-2 px-4 bg-gray-100 hover:bg-gray-200 transition duration-100 text-nowrap text-left rounded-lg ${value.className}`}
                            style={value.style}
                        >
                            {value.title}
                        </button>
                    )
                })}
            </span>
        </div>
    );
}