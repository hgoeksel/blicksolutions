export interface ShoppingItem {
    _id: string;
    name: string;
    price: number;
    bought: boolean;
    createdAt: string;
}

export interface Product {
    _id: string;
    name: string;
    description?: string;
    price?: number;
    imageFileName?: string;
}