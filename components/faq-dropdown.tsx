import React from "react";
import { useState } from "react";
import { ChevronRight } from "lucide-react";

export default function FaqDropdown({
    children,
    title,
    defaultState,
    className
}: {
    children?: React.ReactNode,
    title: string,
    defaultState?: boolean,
    className?: string
}) {
    const [ faqState, setFaqState ] = useState<boolean>(defaultState || false);

    return (
        <div 
            className={`cursor-pointer w-full flex flex-col items-center justify-center ${className}`}
            onClick={
                () => faqState 
                    ? setFaqState(false) 
                    : setFaqState(true)
            }
        >
            <div className="w-full h-fit py-4 px-6 flex gap-4 items-center bg-emerald-500 rounded-lg">
                <ChevronRight 
                    size={24} 
                    className={`transition duration-200 ${faqState && "rotate-90"}`}
                />
                <h1 className="text-md text-medium pointer-events-none select-none">
                    {title}
                </h1>
            </div>
            <div className={`w-full ${faqState ? "max-h-80" : "max-h-0"} overflow-hidden transition-[max-height] duration-500 ease-in-out`}>
                {children}
            </div>
        </div>
    );
}