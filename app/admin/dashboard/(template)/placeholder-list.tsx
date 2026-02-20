import * as templateProps from "@/app/admin/dashboard/(template)/template-props";
import { PageActiveElement } from "./template-new";

export default function PlaceholderList ({
    numPages,
    placeholders,
    state,
    setter
}: {
    numPages: number;
    placeholders: templateProps.PlaceholderElement[][],
    state: PageActiveElement | null;
    setter: (value: React.SetStateAction<PageActiveElement | null>) => void;
}) {
    return (
        <div className="w-full h-fit min-h-64 max-h-64 shrink-0 flex flex-col items-center justify-start gap-4">
            <h1 className="text-md font-medium shrink-0 text-nowrap truncate leading-10 border-b-2 border-emerald-500 w-full">
                Daftar Penampung
            </h1>
            <div className="w-full grow flex flex-col items-center justify-start overflow-y-auto gap-2">
                    {Array.from({ length: numPages }).map((_, index) => (
                        placeholders[index]?.map((placeholder) => {
                            return (
                                <div
                                    key={placeholder.id} 
                                    className="w-full flex shrink-0 items-center justify-start h-16 gap-1 rounded-lg overflow-hidden bg-gray-200 border-2 border-gray-600 cursor-pointer"
                                    onClick={() => setter({
                                        pageIndex: index,
                                        id: placeholder.id
                                    })}
                                >
                                    <span className="p-2 h-full flex items-center justify-center bg-emerald-500">
                                        <h1 className="text-md text-white select-none pointer-events-none">
                                            {index + 1}
                                        </h1>
                                    </span>
                                    <span className="h-fit grow flex flex-col items-start justify-center overflow-hidden p-2">
                                        <h1 className="text-md truncate text-nowrap select-none pointer-events-none">
                                            {placeholder.name}
                                        </h1>
                                        <h2 className="text-sm text-gray-600 truncate text-nowrap select-none pointer-events-none">
                                            {placeholder.type}
                                        </h2>
                                    </span>
                                    <span className="p-2 h-full w-fit flex items-center justify-center">
                                        {
                                            index == state?.pageIndex && placeholder.id == state.id
                                                ? (
                                                    <span className="w-1 h-full rounded-full bg-emerald-500"/>
                                                ) : (
                                                    <span className="w-1 h-full rounded-full bg-gray-200"/>
                                                )
                                        }
                                    </span>
                                </div>
                            )
                        })
                    ))}
            </div>
        </div>
    );
}