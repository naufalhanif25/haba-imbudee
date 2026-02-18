import { useRouter } from "next/navigation";
import { 
    useRef
} from "react";
import Slideshow from "../slideshow";

export default function HeroSection() {
    const router = useRouter();
    const heroRef = useRef<HTMLDivElement>(null);

    return (
        // TODO: Gunakan gambar yang valid
        <section 
            ref={heroRef} 
            className="min-h-screen w-screen h-fit relative flex bg-emerald-700 items-center justify-center"
        >
            <Slideshow className="w-full h-full absolute top-0 left-0 flex items-center justify-center">
                <div className="w-full h-full bg-red-500"></div>
                <div className="w-full h-full bg-green-500"></div>
                <div className="w-full h-full bg-yellow-500"></div>
            </Slideshow>
            <div className="z-2 md:max-w-160 sm:max-w-[50vw] max-w-[80vw] w-fit h-fit gap-y-8 flex flex-col items-center justify-center">
                <div className="w-fit h-fit flex flex-col gap-y-4">
                    <h1 className="text-white text-4xl text-center font-bold">
                        Portal Digital Desa Imbudee
                    </h1>
                    <h2 className="text-white text-center text-lg">
                        Semua urusan administrasi menjadi lebih cepat dan mudah dengan layanan digital berbasis website.
                    </h2>
                </div>
                <div className="w-fit h-fit flex items-start justify-center gap-4">
                    <button 
                        onClick={() => {
                            const rect = heroRef.current?.getBoundingClientRect() ;
                            
                            window.scrollBy({
                                top: rect?.bottom || 0,
                                behavior: "smooth",
                            });
                        }}
                        className="w-42 px-6 py-2 text-white bg-emerald-500 rounded-full hover:bg-emerald-600 transition duration-100"
                    >
                        Jelajahi
                    </button>
                    <button 
                        onClick={() => router.push("/surat/templat")}
                        className="w-42 px-6 py-2 text-white bg-amber-500 rounded-full hover:bg-amber-600 transition duration-100"
                    >
                        Buat Surat
                    </button>
                </div>
            </div>
        </section>
    );
}