import { useState } from "react";
import { 
    PanelRightClose,
    PanelRightOpen
} from "lucide-react";

export default function RightSidebar({ children }: { children: React.ReactNode }) {
    const [openPanel, setOpenPanel] = useState<boolean>(true);

    return (
        <div className="flex w-fit h-full items-center justify-center">
            <div className="h-full w-fit p-2 border-l-2 border-gray-600 bg-white flex flex-col items-center justify-start px-3 py-4 gap-2">
                <span className="cursor-pointer">
                    {
                        openPanel
                            ? (
                                <PanelRightClose 
                                    className="shrink-0"
                                    strokeWidth={2}
                                    size={24}
                                    onClick={() => setOpenPanel(false)}
                                />
                            ) : (
                                <PanelRightOpen
                                    className="shrink-0"
                                    strokeWidth={2}
                                    size={24}
                                    onClick={() => setOpenPanel(true)}
                                />
                            )
                    }
                </span>
            </div>
            <div className={`w-screen h-full border-l-2 border-gray-600 flex flex-col items-center justify-start overflow-hidden transition-[max-width] duration-500 ${
                openPanel
                    ? "max-w-80"
                    : "max-w-0"
            }`}>
                {children}
            </div>
        </div>
    );
}