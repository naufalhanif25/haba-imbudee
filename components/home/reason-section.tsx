import Image from "next/image";
import { Check } from "lucide-react";

export default function ReasonSection() {
    return (
        <section className="flex items-center justify-center py-2 md:px-16 px-8">
            <div className="flex sm:flex-row flex-col items-center justify-center w-full max-w-240">
                <div className="gap-4 py-8 px-4 sm:flex-1 flex flex-col items-start justify-center">
                    <h1 className="text-xl font-bold sm:text-left text-center">
                        Kenapa Menggunakan {process.env.NEXT_PUBLIC_PLATFORM_NAME}?
                    </h1>
                    <div className="flex items-start justify-center w-fit h-fit gap-2 flex-col">
                        {[
                            "Mudah digunakan",
                            "Proses cepat dan transparan",
                            "Aman dan terpercaya",
                            "Akses kapan saja dan di mana saja"
                        ].map((value, index) => {
                            return (
                                <div 
                                    key={index} 
                                    className="w-fit h-fit flex items-center justify-center gap-4"
                                >
                                    <span className="p-2 bg-amber-500 rounded-full">
                                        <Check 
                                            size={16} 
                                            color="white" 
                                            strokeWidth={4}
                                        />
                                    </span>
                                    <p className="font-medium">
                                        {value}
                                    </p>
                                </div>
                            )
                        })}
                    </div>
                </div>
                <div className="sm:py-8 py-4 sm:px-0 px-8 flex-1 w-full max-w-120 flex flex-col items-center justify-start">
                    <Image 
                        src={`/reason/img1.jpg`}
                        alt={`Image 1`}
                        width={1080}
                        height={720}
                        className="w-full h-60 rounded-xl object-cover brightness-120"
                    />
                </div>
            </div>
        </section>
    );
}