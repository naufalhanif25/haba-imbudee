import type { Metadata } from "next";
import { Lato } from "next/font/google";
import "./globals.css";
import 'react-pdf/dist/Page/TextLayer.css';
import 'react-pdf/dist/Page/AnnotationLayer.css';

const lato = Lato({
    variable: "--font-lato",
    subsets: ["latin"],
    weight: ["100","300","400","700","900"],
});

export const metadata: Metadata = {
    title: "Haba Imbudee",
    description: "Portal digital Desa Imbudee. Semua urusan administrasi menjadi lebih cepat dan mudah dengan layanan digital berbasis website.",
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en">
            <body
                className={`${lato.variable} antialiased overflow-x-hidden scroll-smooth`}
            >
                {children}
            </body>
        </html>
    );
}
