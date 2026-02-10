import React from "react";
import { LucideProps } from "lucide-react";
import FooterInfo from "./footer-info";
import FooterEnd from "./footer-end";

export const footerIconProps: LucideProps = {
    size: 20,
    className: "shrink-0"
};

export default function Footer() {
    return (
        <footer className="w-screen h-fit bg-emerald-200 flex flex-col items-center justify-center">
            <FooterInfo />
            <FooterEnd />    
        </footer>
    );
}