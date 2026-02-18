import { Check } from "lucide-react";
import Slider from "../slider";

export default function ReasonSection() {
    return (
        // TODO: Perbaiki alasan mengapa menggunakan HabaImbudee dan gunakan gambar yang valid
        <section className="flex items-center justify-center py-2 md:px-16 px-8">
            <div className="flex sm:flex-row flex-col items-center justify-center w-full max-w-240">
                <div className="gap-4 py-8 px-4 sm:flex-1 flex flex-col items-start justify-center">
                    <h1 className="text-xl font-bold sm:text-left text-center">
                        Kenapa Menggunakan HabaImbudee?
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
                    <Slider className="w-full h-60 rounded-xl">
                        <div className="w-full h-full bg-red-500"></div>
                        <div className="w-full h-full bg-green-500"></div>
                        <div className="w-full h-full bg-yellow-500"></div>
                    </Slider>
                </div>
            </div>
        </section>
    );
}