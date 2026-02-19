import React from "react";
import {
    Mails,
    Globe,
    FilePlusCorner, 
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
            icon: <Globe {...featureProps}/>,
            title: "Telusuri Templat"
        },
        {
            icon: <FilePlusCorner {...featureProps}/>,
            title: "Buat Template Surat"
        }
    ];

    return (
        <section className="flex flex-col items-center justify-center px-16 py-8 gap-8">
            <div className="gap-8 flex flex-col items-center justify-center w-fit h-fit">
                <h1 className="text-xl font-bold sm:text-left text-center">
                    Fitur-fitur Unggulan {process.env.NEXT_PUBLIC_PLATFORM_NAME}
                </h1>
                <div className="w-full h-fit flex items-center justify-center gap-4">
                    <div className="flex flex-wrap items-start justify-center gap-8 w-full">
                        {features.map((value, index) => {
                            return (
                                <div 
                                    key={index}
                                    className="flex w-32 h-fit flex-col items-center justify-start gap-2"
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