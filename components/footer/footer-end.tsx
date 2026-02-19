import { 
    Instagram,
    Facebook,
    Youtube
} from "lucide-react";
import { footerIconProps } from "./footer";

export default function FooterEnd() {
    return (
        <div className="w-screen py-6 px-12 flex md:flex-row flex-col gap-4 items-center md:justify-between justify-center bg-emerald-500">
            {/* TODO: URL masing-masing media sosial */}
            <span className="flex h-fit w-fit gap-4">
                <button 
                    className="w-fit h-fit"
                    onClick={() => window.open("https://www.instagram.com/desaimbudee?igsh=azJyMXNjdHkycWZ6", "_blank")}
                >
                    <Instagram 
                        {...footerIconProps} 
                        color="white"
                        strokeWidth={2}
                    />
                </button>
                <button 
                    className="w-fit h-fit"
                    onClick={() => {}}
                >
                    <Facebook 
                        {...footerIconProps} 
                        color="white"
                        strokeWidth={2}
                    />
                </button>
                <button 
                    className="w-fit h-fit"
                    onClick={() => {}}
                >
                    <Youtube 
                        {...footerIconProps} 
                        color="white"
                        strokeWidth={2}
                    />
                </button>
            </span>
            <p className="font-medium text-white text-center text-sm">
                &copy; 2026 KKN Mahasiswa Berdampak Imbudee. All rights reserved
            </p>
        </div>
    );
}