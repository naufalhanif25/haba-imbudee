import React from "react";
import { useState } from "react";
import { ChevronDown } from "lucide-react";

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
                <ChevronDown 
                    size={24} 
                    color="white"
                    className={`transition duration-300 ${faqState && "-rotate-180"}`}
                    strokeWidth={2}
                />
                <h1 className="text-md font-medium text-white pointer-events-none select-none">
                    {title}
                </h1>
            </div>
            <div className={`w-full ${faqState ? "max-h-40" : "max-h-0"} overflow-hidden transition-[max-height] duration-500 ease-in-out`}>
                {children}
            </div>
        </div>
    );
}