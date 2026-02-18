import { Trash2 } from "lucide-react";
import TemplateInput from "@/components/template/template-input";
import * as templateProps from "@/app/admin/dashboard/(template)/template-props";
import { PageActiveElement } from "./template-new";

export default function PlaceholderAttr({
    numPages,
    placeholders,
    state,
    onUpdateSetter,
    onDeleterSetter
}: {
    numPages: number;
    placeholders: templateProps.PlaceholderElement[][];
    state: PageActiveElement | null;
    onUpdateSetter: ( 
        pageIndex: number, 
        id: string, 
        updates: Partial<templateProps.PlaceholderElement> 
    ) => void;
    onDeleterSetter: (
        pageIndex: number, 
        id: string
    ) => void;
}) {
    return (
        <div className="w-full grow flex flex-col items-center justify-start gap-4">
            <h1 className="text-md font-medium text-nowrap truncate leading-10 border-b-2 border-emerald-500 w-full">
                Atribut Penampung
            </h1>
            <div className="w-full grow flex flex-col items-center justify-center">
                {Array.from({ length: numPages }).map((_, index) => (
                    placeholders[index]?.filter((element) => (index == state?.pageIndex && element.id == state.id)).map((placeholder) => {
                        return (
                            <div
                                key={placeholder.id}
                                className="flex flex-col items-center justify-start w-full grow gap-8"
                            >
                                <div className="flex flex-col items-center justify-start gap-4 w-full grow overflow-y-auto">
                                    <TemplateInput 
                                        title="Nama penampung"
                                        type="text"
                                        className="w-full h-fit flex flex-col items-start justify-center"
                                        value={placeholder.name}
                                        onChange={(event) => onUpdateSetter(index, placeholder.id, {
                                            name: event.target.value,
                                        })}
                                        required
                                    />
                                    <div className="flex items-center justify-center w-full h-fit gap-2">
                                        <TemplateInput 
                                            title="Lebar"
                                            type="text"
                                            className="w-full h-fit flex flex-col items-start justify-center"
                                            value={placeholder.width}
                                            min={0}
                                            onChange={(event) => onUpdateSetter(index, placeholder.id, {
                                                width: Number(event.target.value),
                                            })}
                                            required
                                        />
                                        <TemplateInput 
                                            title="Tinggi"
                                            type="text"
                                            className="w-full h-fit flex flex-col items-start justify-center"
                                            value={placeholder.height}
                                            min={0}
                                            onChange={(event) => onUpdateSetter(index, placeholder.id, {
                                                height: Number(event.target.value),
                                            })}
                                            required
                                        />
                                    </div>
                                    <div className="flex items-center justify-center w-full h-fit gap-2">
                                        <TemplateInput 
                                            title="Posisi X"
                                            type="text"
                                            className="w-full h-fit flex flex-col items-start justify-center"
                                            value={placeholder.x}
                                            onChange={(event) => onUpdateSetter(index, placeholder.id, {
                                                x: Number(event.target.value),
                                            })}
                                            required
                                        />
                                        <TemplateInput 
                                            title="Posisi Y"
                                            type="text"
                                            className="w-full h-fit flex flex-col items-start justify-center"
                                            value={placeholder.y}
                                            onChange={(event) => onUpdateSetter(index, placeholder.id, {
                                                y: Number(event.target.value),
                                            })}
                                            required
                                        />
                                    </div>
                                </div>
                                <button 
                                    className="flex items-center justify-center gap-2 w-full p-2 rounded-full bg-emerald-500 hover:bg-emerald-600 transition duration-100 text-white text-md max-w-64"
                                    onClick={() => onDeleterSetter(index, placeholder.id)}
                                >
                                    <Trash2 
                                        color="white"
                                        size={20}
                                        strokeWidth={2}
                                        className="shrink-0"
                                    />
                                    Hapus Penampung
                                </button>
                            </div>
                        )
                    })
                ))}
            </div>
        </div>
    );
}