import FaqDropdown from "../faq-dropdown";

export default function FAQSection() {
    return (
        // TODO: Tambahkan pertanyaan lain dan ganti pertanyaan yang duplikat
        <section className="flex flex-col items-center justify-center px-16 py-12 gap-6 bg-emerald-100">
            <h1 className="text-2xl font-bold sm:text-left text-center">
                FAQ
            </h1>
            <div className="w-full max-w-240 h-fit flex flex-col items-center justify-center gap-2">
                <FaqDropdown title="Bagaimana cara membuat templat surat?">
                    <ul className="list-disc w-fit h-fit my-4 mx-8">
                        {[
                            "Masuk sebagai Admin Desa",
                            "Pilih menu Buat Templat Baru",
                            "Tambahkan elemen penampung",
                            "Sesuaikan atribut yang diminta",
                            "Simpan templat"
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
                <FaqDropdown title="Bagaimana cara membuat surat?">
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
                <FaqDropdown title="Siapa yang dapat membuat surat di HabaImbudee?">
                    <span className="w-fit h-fit my-4 mx-8">
                        <p className="text-md">
                            Siapa saja dapat membuat surat di HabaImbudee, tidak ada pembatasan untuk membuat surat dengan menggunakan templat yang sudah disediakan oleh Admin Desa.
                        </p>
                    </span>
                </FaqDropdown>
                <FaqDropdown title="Apakah hanya Admin Desa yang dapat membuat templat surat?">
                    <span className="w-fit h-fit my-4 mx-8">
                        <p className="text-md">
                            Benar, hanya Admin Desa yang dapat membuat templat surat baru.
                        </p>
                    </span>
                </FaqDropdown>
            </div>
        </section>
    );
}