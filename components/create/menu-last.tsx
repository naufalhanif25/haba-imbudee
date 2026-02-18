import { 
    Download,
    X 
} from "lucide-react";

export default function MenuLast({ 
    onDownload, 
    onClose 
}: { 
    onDownload: () => void, 
    onClose: () => void 
}) {
    return (
        <div className="w-full h-fit flex flex-col items-center justify-center gap-2 py-4">
            <button 
                className="bg-emerald-500 hover:bg-emerald-600 transition duration-100 rounded-full w-full px-4 py-2 text-white flex items-center justify-center gap-2"
                onClick={onDownload}
            >
                <Download 
                    color="white"
                    strokeWidth={2}
                    size={20}
                />
                <h1 className="text-md font-medium text-nowrap">
                    Ekspor Surat
                </h1>
            </button>
            <button 
                className="bg-red-500 hover:bg-red-600 transition duration-100 rounded-full w-full px-4 py-2 text-white flex items-center justify-center gap-2"
                onClick={onClose}
            >
                <X 
                    color="white"
                    strokeWidth={2}
                    size={20}
                />
                <h1 className="text-md font-medium text-nowrap">
                    Batalkan
                </h1>
            </button>
        </div>
    );
}