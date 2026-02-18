import FaqDropdown from "../faq-dropdown";

export default function FAQSection() {
    return (
        // TODO: Tambahkan pertanyaan lain dan ganti pertanyaan yang duplikat
        <section className="flex flex-col items-center justify-center px-16 py-12 gap-6 bg-emerald-100">
            <h1 className="text-2xl font-bold sm:text-left text-center">
                FAQ
            </h1>
            <div className="w-full max-w-240 h-fit flex flex-col items-center justify-center gap-2">
                {Array.from({ length: 3 }).map((_, index) => {
                    return (
                        <FaqDropdown key={index} title="Bagaimana cara membuat surat?">
                            <ul className="list-disc w-fit h-fit my-4 mx-8">
                                {[
                                    "Masuk ke halaman buat surat.",
                                    "Pilih templat surat yang ingin Anda gunakan.",
                                    "Isi data yang diminta pada formulir.",
                                    "Cetak atau unduh PDF dari surat tersebut."
                                ].map((value, index) => {
                                    return (
                                        <li 
                                            key={index} 
                                            className="text-md"
                                        >
                                            {value}
                                        </li>
                                    )
                                })}
                            </ul>
                        </FaqDropdown>
                    )
                })}
            </div>
        </section>
    );
}