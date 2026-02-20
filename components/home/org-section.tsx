import Image from "next/image";

export default function OrgSection() {
    return (
        <section className="flex flex-col items-center justify-center px-8 md:px-16 py-12 gap-8">
            <div className="w-full h-fit max-w-240 flex flex-col items-center justify-center gap-2">
                <h1 className="text-2xl font-bold sm:text-left text-center">
                    Susunan Organisasi Pemerintahan
                </h1>
                <h2 className="text-md text-center">
                    Berikut adalah Susunan Organisasi Pemerintahan Gampong Imbudee yang menggambarkan susunan kepemimpinan serta pembagian tugas dalam menjalankan roda pemerintahan desa.
                </h2>
            </div>
            <div className="w-full max-w-240 h-fit flex items-center justify-center rounded-xl overflow-hidden">
                <Image 
                    src="https://img.ge/ib/HlLJJ8.png"
                    alt="Struktur organisasi"
                    width={1080}
                    height={720}
                    className="w-full h-full object-cover"
                />
            </div>
        </section>
    );
}