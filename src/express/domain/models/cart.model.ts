export interface CartItem {
    id?: number;
    userId: number;
    productId: number;
    quantity: number;
    createdAt?: Date;
    updatedAt?: Date;
}

export interface CartItemCreate extends Omit<CartItem, 'id' | 'createdAt' | 'updatedAt'> {}

export interface CartItemUpdate extends Partial<CartItemCreate> {}

export interface CartItemResponse extends CartItem {
    product?: {
        name: string;
        price: number;
        imageUrl?: string;
    };
}

export interface Cart {
    userId: number;
    items: CartItemResponse[];
    total: number;
}