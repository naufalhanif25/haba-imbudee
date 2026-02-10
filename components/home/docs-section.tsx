import Slider from "../slider";

export default function DocsSection() {
    return (
        // TODO: Gunakan gambar yang valid
        <section className="flex flex-col items-center justify-center px-16 py-12 gap-8">
            <div className="w-full h-fit flex flex-col items-center justify-center gap-2">
                <h1 className="text-2xl font-bold sm:text-left text-center">
                    Dokumentasi Desa
                </h1>
                <h2 className="text-md">
                    Lihat dokumentasi dari kegiatan-kegiatan yang telah dilaksanakan di Desa Imbudee.
                </h2>
            </div>
            <div className="w-full max-w-240 h-fit flex items-center justify-center">
                <Slider className="w-full h-100 rounded-xl">
                    <div className="w-full h-full bg-red-500"></div>
                    <div className="w-full h-full bg-green-500"></div>
                    <div className="w-full h-full bg-yellow-500"></div>
                </Slider>
            </div>
        </section>
    );
}