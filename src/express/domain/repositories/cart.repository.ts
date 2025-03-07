import { CartItem, CartItemCreate, CartItemUpdate, CartItemResponse, Cart } from '../models/cart.model';

export interface ICartRepository {
    findByUserId(userId: number): Promise<Cart>;
    addItem(item: CartItemCreate): Promise<CartItemResponse>;
    updateItem(id: number, item: CartItemUpdate): Promise<CartItemResponse>;
    removeItem(id: number): Promise<boolean>;
    clearCart(userId: number): Promise<boolean>;
    getItem(id: number): Promise<CartItemResponse | null>;
    getItems(userId: number): Promise<CartItemResponse[]>;
}