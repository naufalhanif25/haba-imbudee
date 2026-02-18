import React from "react"
import { 
    ZoomIn,
    ZoomOut
} from "lucide-react"

type ZoomProps = React.HTMLAttributes<HTMLSpanElement> & {
    className?: string;
    scale: number;
    onZoomIn: () => void;
    onZoomOut: () => void;
    onFit?: () => void;
}

export default function Zoom({
    className,
    onZoomIn,
    onZoomOut,
    onFit,
    scale,
    ...props
}: ZoomProps) {
    const iconProps = {
        color: "white",
        size: 20,
        strokeWidth: 2,
        className: "shrink-0"
    };

    return (
        <span 
            className={`flex items-center justify-center ${className}`}
            {...props}
        >
            <span 
                className="p-2 rounded-full hover:bg-emerald-600 transition duration-100 cursor-pointer"
                onClick={onZoomOut}
            >
                <ZoomOut {...iconProps}/>
            </span>
            <span 
                className="text-md text-white text-center py-1 px-2 rounded-lg select-none cursor-pointer hover:bg-emerald-600 h-full"
                onClick={onFit}
            >
                {scale}%
            </span>
            <span 
                className="p-2 rounded-full hover:bg-emerald-600 transition duration-100 cursor-pointer"
                onClick={onZoomIn}
            >
                <ZoomIn {...iconProps}/>
            </span>
        </span>
    )
}