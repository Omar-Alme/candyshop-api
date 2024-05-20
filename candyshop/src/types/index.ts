import {SxProps} from '@mui/material';
import { MouseEventHandler, ReactNode } from 'react';

export interface ProductDataProps {
    id: number;
    name: string;
    price: number;
    description: string;
    on_sale: boolean;
    images: {
        large: string;
        thumbnail: string;
    }
    stock_quantity: number;
    stock_status: string;
    tags: {
        id: number;
        name: string;
        slug: string;
    }[];
}

export interface ProductsByTagResponse {
    id: number;
    name: string;
    slug: string;
    products: ProductDataProps[];
    status: string;
}

export interface TagsProps {
    id: number;
    name: string;
    slug: string;
}


export interface CustomButtonProps {
    title: string | ReactNode;
    color?:
        "inherit"
        | "primary"
        | "secondary"
        | "success"
        | "error"
        | "info"
        | "warning"
        | string;
    variant?: "contained" | "outlined" | "text" | string;
    size?: "small" | "medium" | "large";
    index?: string;
    onClick?: MouseEventHandler<HTMLButtonElement>;
    onMouseOver?: MouseEventHandler<HTMLButtonElement>;
    onMouseLeave?: MouseEventHandler<HTMLButtonElement>;
    sx?: SxProps;
    disabled?: boolean;
    startIcon?: ReactNode;
    endIcon?: ReactNode;
    type?: "button" | "submit" | "reset" | undefined;
    form?: string;
    fullWidth?: boolean;
}    
