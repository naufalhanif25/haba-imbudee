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
    );
}