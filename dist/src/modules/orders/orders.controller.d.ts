import { OrdersService } from './orders.service';
import { CreateOrderDto } from './dto/create-order.dto';
import { UpdateOrderStatusDto } from './dto/update-order-status.dto';
export declare class OrdersController {
    private readonly ordersService;
    constructor(ordersService: OrdersService);
    findAll(userId: string, role: string, page?: string, limit?: string): Promise<{
        data: ({
            user: {
                name: string;
                id: string;
                email: string;
            };
            restaurant: {
                name: string;
                id: string;
                userId: string;
                createdAt: Date;
                updatedAt: Date;
                description: string | null;
                address: string;
                imageUrl: string | null;
            };
            items: ({
                product: {
                    name: string;
                    id: string;
                    createdAt: Date;
                    updatedAt: Date;
                    description: string | null;
                    imageUrl: string | null;
                    price: number;
                    categoryId: string;
                };
            } & {
                id: string;
                orderId: string;
                productId: string;
                quantity: number;
                price: number;
            })[];
        } & {
            id: string;
            userId: string;
            restaurantId: string;
            status: import("@prisma/client").$Enums.OrderStatus;
            total: number;
            createdAt: Date;
            updatedAt: Date;
        })[];
        meta: {
            total: number;
            page: number;
            limit: number;
            totalPages: number;
        };
    }>;
    create(userId: string, createOrderDto: CreateOrderDto): Promise<{
        user: {
            name: string;
            id: string;
            email: string;
        };
        restaurant: {
            name: string;
            id: string;
            userId: string;
            createdAt: Date;
            updatedAt: Date;
            description: string | null;
            address: string;
            imageUrl: string | null;
        };
        items: ({
            product: {
                name: string;
                id: string;
                createdAt: Date;
                updatedAt: Date;
                description: string | null;
                imageUrl: string | null;
                price: number;
                categoryId: string;
            };
        } & {
            id: string;
            orderId: string;
            productId: string;
            quantity: number;
            price: number;
        })[];
    } & {
        id: string;
        userId: string;
        restaurantId: string;
        status: import("@prisma/client").$Enums.OrderStatus;
        total: number;
        createdAt: Date;
        updatedAt: Date;
    }>;
    findOne(id: string, userId: string, role: string): Promise<{
        user: {
            name: string;
            id: string;
            email: string;
        };
        restaurant: {
            name: string;
            id: string;
            userId: string;
            createdAt: Date;
            updatedAt: Date;
            description: string | null;
            address: string;
            imageUrl: string | null;
        };
        items: ({
            product: {
                name: string;
                id: string;
                createdAt: Date;
                updatedAt: Date;
                description: string | null;
                imageUrl: string | null;
                price: number;
                categoryId: string;
            };
        } & {
            id: string;
            orderId: string;
            productId: string;
            quantity: number;
            price: number;
        })[];
    } & {
        id: string;
        userId: string;
        restaurantId: string;
        status: import("@prisma/client").$Enums.OrderStatus;
        total: number;
        createdAt: Date;
        updatedAt: Date;
    }>;
    updateStatus(id: string, userId: string, updateOrderStatusDto: UpdateOrderStatusDto): Promise<{
        user: {
            name: string;
            id: string;
            email: string;
        };
        restaurant: {
            name: string;
            id: string;
            userId: string;
            createdAt: Date;
            updatedAt: Date;
            description: string | null;
            address: string;
            imageUrl: string | null;
        };
        items: ({
            product: {
                name: string;
                id: string;
                createdAt: Date;
                updatedAt: Date;
                description: string | null;
                imageUrl: string | null;
                price: number;
                categoryId: string;
            };
        } & {
            id: string;
            orderId: string;
            productId: string;
            quantity: number;
            price: number;
        })[];
    } & {
        id: string;
        userId: string;
        restaurantId: string;
        status: import("@prisma/client").$Enums.OrderStatus;
        total: number;
        createdAt: Date;
        updatedAt: Date;
    }>;
}
