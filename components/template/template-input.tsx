import React from "react"

type TemplateAttrInputProps = React.InputHTMLAttributes<HTMLInputElement> & {
    title: string;
    className?: string;
    type: string;
    required?: boolean;
    value?: string | number | readonly string[] | undefined;
}

export default function TemplateInput({
    title,
    className,
    type,
    required,
    value,
    ...props
}: TemplateAttrInputProps) {
    return (
        <div className={className}>
            <div className="flex items-center justify-center w-fit h-fit gap-1">
                <h1 className="text-sm font-medium text-nowrap">
                    {title}
                </h1>
                {required && (
                    <p className="text-sm text-red-500 font-medium">
                        *
                    </p>
                )}
            </div>
            <input 
                type={type} 
                className="w-full py-1 border-b-2 outline-none border-gray-400 focus:border-emerald-500 text-md text-nowrap"
                placeholder={title}
                value={value}
                {...props}
            />
        </div>
    )
}