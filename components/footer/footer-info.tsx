import React from "react";
import { 
    Phone,
    Mail,
    MapPin
} from "lucide-react";
import FooterDiv from "../footer-div";
import { footerIconProps } from "./footer";

type ContactProps = {
    icon?: React.ReactElement,
    title?: string
};

export default function FooterInfo() {    
    const contacts: ContactProps[] = [
        {
            icon: <Phone {...footerIconProps}/>,
            title: "0852-6064-4070"
        },
        {
            icon: <Mail {...footerIconProps}/>,
            title: "gampongimbudee@gmail.com"
        }
    ];

    return (
        // TODO: Gunakan data yang valid
        <div className="py-8 px-16 grid grid-cols-1 md:grid-cols-2 gap-8">
            <FooterDiv 
                title="Kontak" 
                className="flex flex-1 flex-col items-center justify-start gap-2"
            >
                {contacts.map((value, index) => {
                    return (
                        <div 
                            key={index} 
                            className="flex gap-2 items-center justify-center"
                        >
                            <span className="flex gap-4 items-center justify-center">
                                {value.icon}
                            </span>
                            <h2 className="text-md">
                                {value.title}
                            </h2>
                        </div>
                    )
                })}
            </FooterDiv>
            <FooterDiv 
                title="Alamat" 
                className="flex flex-1 flex-col items-center justify-start gap-2"
            >
                <span className="flex h-fit w-fit gap-2 max-w-120">
                    <MapPin {...footerIconProps}/>
                    <p className="text-sm">
                        Kantor Keuchik Imbudee, Desa Imbudee, Kec. Kuta Blang, Kabupaten Bireuen, Aceh 24356
                    </p>
                </span>
            </FooterDiv>
        </div>
    );
}