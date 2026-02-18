import { PropagateLoader } from "react-spinners";

export default function ScreenLoader({
    title,
    show
}: {
    title: string;
    show: boolean;
}) {
    if (!show) return;

    return (
        <div className="w-full h-full bg-black/50 absolute top-0 left-0 z-999 flex items-center justify-center p-8">
            <div className="flex flex-col items-center justify-center w-fit h-fit gap-4">
                <h1 className="text-xl text-white font-medium">
                    {title}
                </h1>
                <PropagateLoader 
                    color="white"
                    size={10}
                />
            </div>
        </div>
                    
    );
}