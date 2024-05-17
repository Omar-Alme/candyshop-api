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
    tags: {
        id: number;
        name: string;
        slug: string;
    }[];
}