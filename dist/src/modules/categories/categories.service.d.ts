import { PrismaService } from '../../prisma/prisma.service';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
export declare class CategoriesService {
    private prisma;
    constructor(prisma: PrismaService);
    findAll(restaurantId: string): Promise<({
        products: {
            id: string;
            name: string;
            createdAt: Date;
            updatedAt: Date;
            description: string | null;
            imageUrl: string | null;
            price: number;
            categoryId: string;
        }[];
    } & {
        id: string;
        name: string;
        createdAt: Date;
        updatedAt: Date;
        restaurantId: string;
    })[]>;
    findOne(id: string): Promise<{
        restaurant: {
            user: {
                id: string;
                email: string;
                password: string | null;
                name: string;
                role: import("@prisma/client").$Enums.Role;
                googleId: string | null;
                avatar: string | null;
                createdAt: Date;
                updatedAt: Date;
            };
        } & {
            id: string;
            name: string;
            createdAt: Date;
            updatedAt: Date;
            description: string | null;
            address: string;
            imageUrl: string | null;
            userId: string;
        };
        products: {
            id: string;
            name: string;
            createdAt: Date;
            updatedAt: Date;
            description: string | null;
            imageUrl: string | null;
            price: number;
            categoryId: string;
        }[];
    } & {
        id: string;
        name: string;
        createdAt: Date;
        updatedAt: Date;
        restaurantId: string;
    }>;
    create(restaurantId: string, userId: string, createCategoryDto: CreateCategoryDto): Promise<{
        id: string;
        name: string;
        createdAt: Date;
        updatedAt: Date;
        restaurantId: string;
    }>;
    update(id: string, userId: string, updateCategoryDto: UpdateCategoryDto): Promise<{
        id: string;
        name: string;
        createdAt: Date;
        updatedAt: Date;
        restaurantId: string;
    }>;
    remove(id: string, userId: string): Promise<{
        id: string;
        name: string;
        createdAt: Date;
        updatedAt: Date;
        restaurantId: string;
    }>;
}
