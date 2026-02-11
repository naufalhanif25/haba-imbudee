import React from "react";
import { 
    useState, 
    useEffect 
} from "react";

type SlideshowProps = React.HTMLAttributes<HTMLDivElement> & {
    children?: React.ReactNode;
    interval?: number;
    className?: string;
};

export default function Slideshow({
    children,
    interval = 5000,
    className,
    ...props
}: SlideshowProps) {
    const slides = React.Children.toArray(children);
    const length: number = slides.length;
    const [slideIndex, setSlideIndex] = useState<number>(0);

    useEffect(() => {
        if (length <= 1) return;

        const timer = setInterval(() => {
            setSlideIndex((prev) => (prev + 1) % length);
        }, interval);

        return () => clearInterval(timer);
    }, [length, interval]);

    return (
        <div 
            {...props} 
            className={`${className}`}
        >
            <div className="w-full h-full flex items-center justify-center">
                {slides.map((child, index) => {
                    return (
                        <div 
                            key={index} 
                            className={`absolute w-full h-full transition-opacity duration-500 ${
                                index === slideIndex 
                                    ? "opacity-100" 
                                    : "opacity-0"
                                }`
                            }
                        >
                            {child}
                        </div>
                    )
                })}
            </div>
            <div className="w-fit h-fit flex gap-2 absolute z-2 bottom-12 left-1/2 -translate-x-1/2">
                {Array.from({ length }).map((_, index) => {
                    return (
                        <span 
                            key={index}
                            className={`h-2 w-4 bg-white rounded-full transition duration-500 ${
                                index === (slideIndex % length)
                                    ? "opacity-100"
                                    : "opacity-50"
                            }`}
                        />
                    )
                })}
            </div>
        </div>
    );
}