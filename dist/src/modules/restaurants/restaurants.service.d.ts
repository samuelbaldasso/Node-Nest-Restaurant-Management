import { PrismaService } from '../../prisma/prisma.service';
import { CreateRestaurantDto } from './dto/create-restaurant.dto';
import { UpdateRestaurantDto } from './dto/update-restaurant.dto';
export declare class RestaurantsService {
    private prisma;
    constructor(prisma: PrismaService);
    findAll(): Promise<({
        user: {
            name: string;
            id: string;
            email: string;
        };
        categories: ({
            products: {
                name: string;
                id: string;
                createdAt: Date;
                updatedAt: Date;
                description: string | null;
                imageUrl: string | null;
                price: number;
                categoryId: string;
            }[];
        } & {
            name: string;
            id: string;
            restaurantId: string;
            createdAt: Date;
            updatedAt: Date;
        })[];
    } & {
        name: string;
        id: string;
        userId: string;
        createdAt: Date;
        updatedAt: Date;
        description: string | null;
        address: string;
        imageUrl: string | null;
    })[]>;
    findOne(id: string): Promise<{
        user: {
            name: string;
            id: string;
            email: string;
        };
        categories: ({
            products: {
                name: string;
                id: string;
                createdAt: Date;
                updatedAt: Date;
                description: string | null;
                imageUrl: string | null;
                price: number;
                categoryId: string;
            }[];
        } & {
            name: string;
            id: string;
            restaurantId: string;
            createdAt: Date;
            updatedAt: Date;
        })[];
    } & {
        name: string;
        id: string;
        userId: string;
        createdAt: Date;
        updatedAt: Date;
        description: string | null;
        address: string;
        imageUrl: string | null;
    }>;
    getMenu(id: string): Promise<({
        products: {
            name: string;
            id: string;
            createdAt: Date;
            updatedAt: Date;
            description: string | null;
            imageUrl: string | null;
            price: number;
            categoryId: string;
        }[];
    } & {
        name: string;
        id: string;
        restaurantId: string;
        createdAt: Date;
        updatedAt: Date;
    })[]>;
    create(userId: string, createRestaurantDto: CreateRestaurantDto): Promise<{
        user: {
            name: string;
            id: string;
            email: string;
        };
    } & {
        name: string;
        id: string;
        userId: string;
        createdAt: Date;
        updatedAt: Date;
        description: string | null;
        address: string;
        imageUrl: string | null;
    }>;
    update(id: string, userId: string, updateRestaurantDto: UpdateRestaurantDto): Promise<{
        user: {
            name: string;
            id: string;
            email: string;
        };
    } & {
        name: string;
        id: string;
        userId: string;
        createdAt: Date;
        updatedAt: Date;
        description: string | null;
        address: string;
        imageUrl: string | null;
    }>;
    remove(id: string, userId: string): Promise<{
        name: string;
        id: string;
        userId: string;
        createdAt: Date;
        updatedAt: Date;
        description: string | null;
        address: string;
        imageUrl: string | null;
    }>;
}
