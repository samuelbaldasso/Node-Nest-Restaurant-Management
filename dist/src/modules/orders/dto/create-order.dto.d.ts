declare class OrderItemDto {
    productId: string;
    quantity: number;
}
export declare class CreateOrderDto {
    restaurantId: string;
    items: OrderItemDto[];
}
export {};
