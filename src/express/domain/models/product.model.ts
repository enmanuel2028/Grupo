export interface Product {
    id?: number;
    name: string;
    description: string;
    price: number;
    stock: number;
    category: string;
    imageUrl?: string;
    createdAt?: Date;
    updatedAt?: Date;
}

export interface ProductCreate extends Omit<Product, 'id' | 'createdAt' | 'updatedAt'> {}

export interface ProductUpdate extends Partial<ProductCreate> {}

export interface ProductResponse extends Product {}