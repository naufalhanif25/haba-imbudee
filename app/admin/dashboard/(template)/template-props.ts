export type ToolProps = {
    title: string;
    icon: React.ReactElement;
    action?: () => void;
};

export type ToolIconProps = {
    size: number;
    color?: string;
    className?: string;
    strokeWidth?: number;
};

export type PlaceholderType = "text" | "date" | "number";

export type PlaceholderElement = {
    id: string;
    name: string;
    type: PlaceholderType;
    x: number;
    y: number;
    width: number;
    height: number;
    bounds?: string;
    className?: string;
    style?: React.CSSProperties;
};

export type TamplatePlaceholder = {
    id: string;
    name: string;
    type: PlaceholderType;
    x: number;
    y: number;
    width: number;
    height: number;
};

export type TemplatePageData = {
    image: string;
    placeholders: TamplatePlaceholder[]
};

export type TemplateData = {
    id: string;
    name: string;
    numPages: number;
    cover: string;
    data: TemplatePageData[];
};