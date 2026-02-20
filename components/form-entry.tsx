import React from "react";
import { useState } from "react";
import { 
    Eye,
    EyeOff 
} from "lucide-react";

type FormEntryProps = React.InputHTMLAttributes<HTMLInputElement> & {
    title: string;
    type: string;
    parentClassName?: string;
    className?: string;
    required?: boolean;
    hideText?: boolean;
}

export default function FormEntry({
    title,
    type,
    parentClassName,
    className,
    required,
    hideText,
    ...props
}: FormEntryProps) {
    const [showPass, setShowPass] = useState<boolean>(false);

    return (
        <div 
            className={`flex flex-col items-start justify-center gap-2 ${parentClassName}`}
        >
            <div className="flex items-center justify-center gap-1 w-fit h-fit">
                <h1 className="text-md text-medium">
                    {title}
                </h1>
                <p className="text-md text-red-500">
                    {required && "*"}
                </p>
            </div>
            <div className={`relative flex items-center justify-start w-full h-fit gap-2 overflow-hidden ${className}`}>
                <input 
                    type={
                        hideText 
                            ? (
                                showPass 
                                ? type 
                                : "password" 
                            ) : type
                    } 
                    className="grow outline-none text-md h-full min-w-0"
                    required={required}
                    {...props}
                />
                {hideText && (
                    <span 
                        className="h-fit w-fit cursor-pointer"
                        onClick={
                            () => showPass
                                ? setShowPass(false)
                                : setShowPass(true)
                        }
                    >
                        {
                            !showPass
                                ? (
                                    <Eye
                                        size={20}
                                        strokeWidth={2}
                                        className="text-gray-600"
                                    />
                                )
                                : (
                                    <EyeOff 
                                        size={20}
                                        strokeWidth={2}
                                        className="text-gray-600"
                                    />
                                )
                        }
                    </span>
                )}
            </div>
        </div>
    );
}