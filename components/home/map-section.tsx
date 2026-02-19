import Image from "next/image";
import { useState } from "react";
import { 
    ZoomIn,
    X
} from "lucide-react";

export default function MapSection() {
    const [zoomMap, setZoomMap] = useState<boolean>(false);

    return (
        <>
            <section className="flex flex-col items-center justify-center px-16 py-12 mb-4 gap-8">
                <div className="w-full h-fit max-w-240 flex flex-col items-center justify-center gap-2">
                    <h1 className="text-2xl font-bold sm:text-left text-center">
                        Peta Batas Administrasi
                    </h1>
                    <h2 className="text-md text-center">
                        Berikut adalah Peta Batas Administrasi Desa Imbudee yang menunjukkan letak geografis serta batas wilayah dengan desa atau gampong di sekitarnya.
                    </h2>
                </div>
                <div 
                    className="group relative w-full max-w-240 h-fit flex items-center justify-center cursor-pointer rounded-xl overflow-hidden"
                    onClick={() => setZoomMap(true)}
                >
                    <Image 
                        src="/peta.png"
                        alt="Struktur organisasi"
                        width={1080}
                        height={720}
                        className="w-full h-full object-cover"
                    />
                    <div className="w-full h-full absolute bg-black/50 top-0 left-0 opacity-0 group-hover:opacity-100 transition-opacity duration-100 flex items-center justify-center p-8">
                        <span className="flex flex-col items-center justify-center w-fit h-fit gap-3">
                            <ZoomIn 
                                color="white"
                                size={32}
                                strokeWidth={2}
                            />
                            <h2 className="text-md text-white font-medium">
                                Perbesar Gambar
                            </h2>
                        </span>
                    </div>
                </div>
                <div className="w-full max-w-240 h-fit flex flex-col items-center justify-center">
                    <p className="text-md text-center">
                        Peta ini tidak hanya menampilkan batas administratif Desa Imbudee, 
                        tetapi juga memuat lokasi fasilitas umum, kantor pemerintahan, tempat 
                        ibadah, area permukiman, serta jaringan jalan utama yang menjadi akses 
                        masyarakat. Dilengkapi dengan legenda, skala, dan sistem koordinat, 
                        peta ini menjadi gambaran menyeluruh mengenai tata ruang dan wilayah 
                        administratif Desa Imbudee.
                    </p>
                </div>
            </section>
            {zoomMap && (
                <div className="w-screen h-screen inset-0 flex items-center justify-center p-16 fixed left-0 top-0 bg-black/75 z-999 overflow-hidden">
                    <div className="w-fit w-fit max-w-320 max-h-240 rounded-2xl overflow-hidden">
                        <Image 
                            src="/peta.png"
                            alt="Struktur organisasi"
                            width={1920}
                            height={1080}
                            className="w-full h-full max-w-480 max-h-320 object-cover"
                        />
                    </div>
                    <button 
                        className="p-2 rounded-md hover:bg-white/25 transition duration-100 absolute top-4 left-4"
                        onClick={() => setZoomMap(false)}
                    >
                        <X 
                            color="white"
                            size={24}
                            strokeWidth={2}
                        />
                    </button>
                </div>
            )}
        </>
    );
}