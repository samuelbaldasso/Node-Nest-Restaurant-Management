import { CategoriesService } from './categories.service';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
export declare class CategoriesController {
    private readonly categoriesService;
    constructor(categoriesService: CategoriesService);
    findAll(restaurantId: string): Promise<({
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
    create(restaurantId: string, userId: string, createCategoryDto: CreateCategoryDto): Promise<{
        name: string;
        id: string;
        restaurantId: string;
        createdAt: Date;
        updatedAt: Date;
    }>;
    findOne(id: string): Promise<{
        restaurant: {
            user: {
                name: string;
                id: string;
                createdAt: Date;
                updatedAt: Date;
                email: string;
                password: string | null;
                role: import("@prisma/client").$Enums.Role;
                googleId: string | null;
                avatar: string | null;
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
        };
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
    }>;
    update(id: string, userId: string, updateCategoryDto: UpdateCategoryDto): Promise<{
        name: string;
        id: string;
        restaurantId: string;
        createdAt: Date;
        updatedAt: Date;
    }>;
    remove(id: string, userId: string): Promise<{
        name: string;
        id: string;
        restaurantId: string;
        createdAt: Date;
        updatedAt: Date;
    }>;
}
