import { Order, OrderCreate, OrderUpdate, OrderResponse } from '../models/order.model';

export interface IOrderRepository {
    findById(id: number): Promise<OrderResponse | null>;
    findByUserId(userId: number): Promise<OrderResponse[]>;
    findAll(): Promise<OrderResponse[]>;
    create(order: OrderCreate): Promise<OrderResponse>;
    update(id: number, order: OrderUpdate): Promise<OrderResponse>;
    updateStatus(id: number, status: Order['status']): Promise<boolean>;
    delete(id: number): Promise<boolean>;
    getOrderItems(orderId: number): Promise<OrderResponse['items']>;
}