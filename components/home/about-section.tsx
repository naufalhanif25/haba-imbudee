export default function AboutSection() {
    return (
        <section className="w-full h-fit px-8 md:px-16 py-12 flex flex-col items-center justify-center gap-8">
            <h1 className="text-2xl font-bold sm:text-left text-center">
                Tentang Desa Imbudee
            </h1>
            <div className="w-full h-fit p-8 rounded-xl bg-emerald-100 max-w-240">
                <p className="text-md text-center w-full h-fit">
                    Desa Imbudee adalah salah satu desa yang terletak di Kecamatan Kuta Blang, Kabupaten Bireuen, Provinsi Aceh.
                    Desa Imbudee memiliki 4 dusun, yaitu Dusun Tgk. Di Imbudee, Dusun Tgk. Di Dayah, Dusun Tgk. Di Suboh dan Dusun Tgk. Di Manyang.
                    Desa ini memiliki penduduk yang berjumlah sekitar 289 orang.
                </p>
            </div>
        </section>
    );
}