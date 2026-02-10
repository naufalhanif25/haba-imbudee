import { useRouter } from "next/navigation";

type HeaderButtonProps = {
    title: string, 
    route: string
};

export default function Header() {
    const router = useRouter();

    // TODO: Tambagkan halaman-halaman di bawah ini
    const headerData: HeaderButtonProps[] = [
        {
            title: "Surat",
            route: "/surat"
        },
        {
            title: "Admin",
            route: "/admin"
        },
        {
            title: "Tentang",
            route: "/tentang"
        }
    ];

    return (
        <header className="w-full h-16 bg-emerald-500 fixed top-0 left-0 flex items-center justify-between min-px-4 px-6 min-py-0 py-2 z-999">
            <h1 
                onClick={() => router.push("/")}
                className="text-white font-bold text-xl cursor-pointer select-none"
            >
                HabaImbudee
            </h1>
            <div className="w-fit h-fit gap-6 flex">
                {headerData.map((value, index) => {
                    return (
                        <button 
                            key={index} 
                            className="text-white text-md hover:text-emerald-700 transition duration-100"
                            onClick={() => router.push(value.route)}
                        >
                            {value.title}
                        </button>
                    )
                })}
            </div>
        </header>
    );
}