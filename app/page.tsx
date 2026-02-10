"use client";

import Header from "@/components/header";
import HomeMainSection from "@/components/home/main-section";
import Footer from "@/components/footer/footer";

export default function Home() {    
    return (
        <div className="flex flex-col min-h-screen w-screen justify-center items-center">
            <Header />
            <HomeMainSection />
            <Footer />
        </div>
    );
}
