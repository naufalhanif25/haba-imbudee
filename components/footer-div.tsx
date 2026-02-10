import React from "react";

type FooterDivProps = React.HTMLAttributes<HTMLDivElement> & {
    title: string;
    children?: React.ReactNode;
};

export default function FooterDiv({
  children,
  title,
  ...props
}: FooterDivProps) {
    return (
        <div {...props}>
            <h1 className="text-xl font-medium text-center">
                {title}
            </h1>
            <div className="flex flex-col items-start justify-center w-fit h-fit gap-2">
                {children}
            </div>
        </div>
    );
}