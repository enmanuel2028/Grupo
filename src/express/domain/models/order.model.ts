export interface OrderItem {
    id?: number;
    orderId: number;
    productId: number;
    quantity: number;
    price: number;
    createdAt?: Date;
    updatedAt?: Date;
}

export interface Order {
    id?: number;
    userId: number;
    status: 'pending' | 'processing' | 'shipped' | 'delivered' | 'cancelled';
    total: number;
    shippingAddress: string;
    paymentMethod: 'credit_card' | 'debit_card' | 'paypal';
    items: OrderItem[];
    createdAt?: Date;
    updatedAt?: Date;
}

export interface OrderCreate extends Omit<Order, 'id' | 'status' | 'createdAt' | 'updatedAt'> {}

export interface OrderUpdate extends Partial<Omit<Order, 'id' | 'userId' | 'createdAt' | 'updatedAt'>> {}

export interface OrderResponse extends Order {
    items: (OrderItem & {
        product: {
            name: string;
            imageUrl?: string;
        };
    })[];
}