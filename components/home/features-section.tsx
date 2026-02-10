import React from "react";
import {
    Mails,
    Megaphone,
    BookCopy, 
    LucideProps 
} from "lucide-react";

type FeatureProps = {
    icon?: React.ReactElement,
    title?: string
}

export default function FeaturesSection() {
    const featureProps: LucideProps = {
        size: 24, 
        color: "white", 
        strokeWidth: 2
    };
    
    const features: FeatureProps[] = [
        {
            icon: <Mails {...featureProps}/>,
            title: "Buat Surat Instan"
        },
        {
            icon: <Megaphone {...featureProps}/>,
            title: "Buat Laporan"
        },
        {
            icon: <BookCopy {...featureProps}/>,
            title: "Informasi Desa"
        }
    ];

    return (
        // TODO: Sesuaikan fitur dengan fitur sebenarnya
        <section className="flex flex-col items-center justify-center px-16 py-12 gap-8">
            <div className="gap-8 py-8 flex flex-col items-center justify-center w-fit h-fit">
                <h1 className="text-xl font-bold sm:text-left text-center">
                    Fitur-fitur Unggulan HabaImbudee
                </h1>
                <div className="w-full h-fit flex items-center justify-center gap-4">
                    <div className="flex items-start justify-center gap-8 w-full">
                        {features.map((value, index) => {
                            return (
                                <div 
                                    key={index}
                                    className="flex w-24 flex-col items-center justify-center gap-2"
                                >
                                    <span className="flex items-center justify-center rounded-full p-4 bg-amber-500">
                                        {value.icon}
                                    </span>
                                    <h1 className="text-lg text-center">
                                        {value.title}
                                    </h1>
                                </div>
                            )
                        })}
                    </div>
                </div>
            </div>
        </section>
    );
}