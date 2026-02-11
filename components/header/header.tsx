import { useRouter } from "next/navigation";
import { useState } from "react";
import {
    X, 
    Menu
} from "lucide-react";

type HeaderButtonProps = {
    title: string, 
    route: string
};

export default function Header() {
    const router = useRouter();
    const [menuOpen, setMenuOpen] = useState<boolean>(false);

    const menuIconProps = {
        color: "white",
        size: 24,
        className: "cursor-pointer",
    }

    // TODO: Tambagkan halaman-halaman di bawah ini
    const headerData: HeaderButtonProps[] = [
        {
            title: "Beranda",
            route: "/"
        },
        {
            title: "Buat Surat",
            route: "/surat"
        },
        {
            title: "Buat Laporan",
            route: "/lapor"
        },
        {
            title: "Admin Desa",
            route: "/admin"
        }
    ];

    return (
        <header className="w-full h-fit bg-emerald-500 fixed top-0 left-0 flex flex-col items-center justify-center z-999">
            <div className="w-full h-16 flex items-center justify-between min-px-4 px-6 min-py-0 py-2">
                <h1 
                    onClick={() => router.push("/")}
                    className="text-white font-bold text-xl cursor-pointer select-none"
                >
                    HabaImbudee
                </h1>
                <div className="w-fit h-fit gap-6 flex">
                    {!menuOpen ? (
                        <Menu 
                            {...menuIconProps}
                            onClick={() => setMenuOpen(true)}
                        />
                    ): (
                        <X 
                            {...menuIconProps}
                            onClick={() => setMenuOpen(false)}
                        />
                    )}
                </div>
            </div>
            <div className={`w-full h-fit overflow-hidden transition-[max-height] duration-500 ${
                menuOpen 
                    ? "max-h-80" 
                    : "max-h-0"
            }`}>
                <div className="flex flex-col gap-2 items-center justify-center mb-4">
                    {headerData.map((value, index) => {
                        return (
                            <button 
                                key={index} 
                                className="text-white text-md hover:bg-emerald-600 transition duration-100 w-full py-2 px-4"
                                onClick={() => {
                                    setMenuOpen(false);
                                    router.push(value.route);
                                }}
                            >
                                {value.title}
                            </button>
                        )
                    })}
                </div>
            </div>
        </header>
    );
}