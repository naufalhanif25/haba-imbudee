export default function StyleOpts({
    className,
    titles,
    state,
    onClick
}: {
    className?: string,
    titles: string[],
    state: any,
    onClick: (...args: any[]) => void
}) {
    return (
        <div className={`flex flex-wrap items-center justify-center gap-2 ${className}`}>
            {titles.map((value, index) => {
                return (
                    <button 
                        key={index}
                        className={`py-1 px-4 rounded-md border-2 border-emerald-500 ${
                            state === value.toLocaleLowerCase()
                                ? "bg-emerald-500 text-white"
                                : "bg-white"
                        }`}
                        onClick={() => onClick(value)}
                    >
                        {value}
                    </button>
                );
            })}
        </div>
    );
}