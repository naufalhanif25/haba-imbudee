import React from "react";
import { 
    useState,
    useRef,
    useEffect
} from "react";

type SliderProps = React.HTMLAttributes<HTMLDivElement> & {
    children?: React.ReactNode;
    interval?: number;
    className?: string;
};

export default function Slider({
    children,
    interval = 5000,
    className,
    ...props
}: SliderProps) {
    const slides = React.Children.toArray(children);
    const length: number = slides.length;
    const [slideIndex, setSlideIndex] = useState<number>(0);
    const trackRef = useRef<HTMLDivElement>(null);
    const extendedSlides = [...slides, slides[0]];

    useEffect(() => {
        if (length <= 1) return;

        const timer = setInterval(() => {
            setSlideIndex((prev) => prev + 1);
        }, interval);

        return () => clearInterval(timer);
    }, [length, interval]);

    useEffect(() => {
        if (!trackRef.current) return;

        if (slideIndex === length) {
            (async () => {
                if (!trackRef.current) return;

                trackRef.current.style.transition = "none";
                setSlideIndex(0);
                requestAnimationFrame(() => {
                    if (!trackRef.current) return;

                    trackRef.current.style.transition = "";
                });
            })();
        }
    }, [slideIndex, length]);

    return (
        <div
            {...props}
            className={`relative overflow-hidden ${className ?? ""}`}
        >
            <div
                ref={trackRef}
                className="flex w-full h-full transition-transform duration-500"
                style={{ transform: `translateX(-${slideIndex * 100}%)` }}
            >
                {extendedSlides.map((child, index) => (
                    <div
                        key={index}
                        className="w-full h-full flex-shrink-0 flex items-center justify-center"
                    >
                        {child}
                    </div>
                ))}
            </div>
            <div className="w-fit h-fit flex gap-2 absolute z-2 bottom-6 left-1/2 -translate-x-1/2">
                {Array.from({ length }).map((_, index) => {
                    return (
                        <div
                            key={index}
                            className={`size-2 rounded-full bg-white transition duration-500 ${
                                index === (slideIndex % length)
                                    ? "opacity-100"
                                    : "opacity-50"
                                }`
                            }
                        />
                    )
                })}
            </div>
        </div>
    );
}