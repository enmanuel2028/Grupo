import { Product, ProductCreate, ProductUpdate, ProductResponse } from '../models/product.model';

export interface IProductRepository {
    findById(id: number): Promise<ProductResponse | null>;
    findAll(): Promise<ProductResponse[]>;
    findByCategory(category: string): Promise<ProductResponse[]>;
    search(query: string): Promise<ProductResponse[]>;
    create(product: ProductCreate): Promise<ProductResponse>;
    update(id: number, product: ProductUpdate): Promise<ProductResponse>;
    delete(id: number): Promise<boolean>;
    updateStock(id: number, quantity: number): Promise<boolean>;
}