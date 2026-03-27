import { OrdersService } from './orders.service';
import { CreateOrderDto } from './dto/create-order.dto';
import { UpdateOrderStatusDto } from './dto/update-order-status.dto';
export declare class OrdersController {
    private readonly ordersService;
    constructor(ordersService: OrdersService);
    findAll(userId: string, role: string): Promise<({
        user: {
            id: string;
            email: string;
            name: string;
        };
        restaurant: {
            id: string;
            name: string;
            createdAt: Date;
            updatedAt: Date;
            description: string | null;
            address: string;
            imageUrl: string | null;
            userId: string;
        };
        items: ({
            product: {
                id: string;
                name: string;
                createdAt: Date;
                updatedAt: Date;
                description: string | null;
                imageUrl: string | null;
                price: number;
                categoryId: string;
            };
        } & {
            id: string;
            price: number;
            orderId: string;
            productId: string;
            quantity: number;
        })[];
    } & {
        id: string;
        createdAt: Date;
        updatedAt: Date;
        userId: string;
        restaurantId: string;
        status: import("@prisma/client").$Enums.OrderStatus;
        total: number;
    })[]>;
    create(userId: string, createOrderDto: CreateOrderDto): Promise<{
        user: {
            id: string;
            email: string;
            name: string;
        };
        restaurant: {
            id: string;
            name: string;
            createdAt: Date;
            updatedAt: Date;
            description: string | null;
            address: string;
            imageUrl: string | null;
            userId: string;
        };
        items: ({
            product: {
                id: string;
                name: string;
                createdAt: Date;
                updatedAt: Date;
                description: string | null;
                imageUrl: string | null;
                price: number;
                categoryId: string;
            };
        } & {
            id: string;
            price: number;
            orderId: string;
            productId: string;
            quantity: number;
        })[];
    } & {
        id: string;
        createdAt: Date;
        updatedAt: Date;
        userId: string;
        restaurantId: string;
        status: import("@prisma/client").$Enums.OrderStatus;
        total: number;
    }>;
    findOne(id: string, userId: string, role: string): Promise<{
        user: {
            id: string;
            email: string;
            name: string;
        };
        restaurant: {
            id: string;
            name: string;
            createdAt: Date;
            updatedAt: Date;
            description: string | null;
            address: string;
            imageUrl: string | null;
            userId: string;
        };
        items: ({
            product: {
                id: string;
                name: string;
                createdAt: Date;
                updatedAt: Date;
                description: string | null;
                imageUrl: string | null;
                price: number;
                categoryId: string;
            };
        } & {
            id: string;
            price: number;
            orderId: string;
            productId: string;
            quantity: number;
        })[];
    } & {
        id: string;
        createdAt: Date;
        updatedAt: Date;
        userId: string;
        restaurantId: string;
        status: import("@prisma/client").$Enums.OrderStatus;
        total: number;
    }>;
    updateStatus(id: string, userId: string, updateOrderStatusDto: UpdateOrderStatusDto): Promise<{
        user: {
            id: string;
            email: string;
            name: string;
        };
        restaurant: {
            id: string;
            name: string;
            createdAt: Date;
            updatedAt: Date;
            description: string | null;
            address: string;
            imageUrl: string | null;
            userId: string;
        };
        items: ({
            product: {
                id: string;
                name: string;
                createdAt: Date;
                updatedAt: Date;
                description: string | null;
                imageUrl: string | null;
                price: number;
                categoryId: string;
            };
        } & {
            id: string;
            price: number;
            orderId: string;
            productId: string;
            quantity: number;
        })[];
    } & {
        id: string;
        createdAt: Date;
        updatedAt: Date;
        userId: string;
        restaurantId: string;
        status: import("@prisma/client").$Enums.OrderStatus;
        total: number;
    }>;
}
