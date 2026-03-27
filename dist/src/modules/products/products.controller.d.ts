import { ProductsService } from './products.service';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
export declare class ProductsController {
    private readonly productsService;
    constructor(productsService: ProductsService);
    findAll(categoryId: string): Promise<{
        id: string;
        name: string;
        createdAt: Date;
        updatedAt: Date;
        description: string | null;
        imageUrl: string | null;
        price: number;
        categoryId: string;
    }[]>;
    create(categoryId: string, userId: string, createProductDto: CreateProductDto): Promise<{
        id: string;
        name: string;
        createdAt: Date;
        updatedAt: Date;
        description: string | null;
        imageUrl: string | null;
        price: number;
        categoryId: string;
    }>;
    findOne(id: string): Promise<{
        category: {
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
        } & {
            id: string;
            name: string;
            createdAt: Date;
            updatedAt: Date;
            restaurantId: string;
        };
    } & {
        id: string;
        name: string;
        createdAt: Date;
        updatedAt: Date;
        description: string | null;
        imageUrl: string | null;
        price: number;
        categoryId: string;
    }>;
    update(id: string, userId: string, updateProductDto: UpdateProductDto): Promise<{
        id: string;
        name: string;
        createdAt: Date;
        updatedAt: Date;
        description: string | null;
        imageUrl: string | null;
        price: number;
        categoryId: string;
    }>;
    remove(id: string, userId: string): Promise<{
        id: string;
        name: string;
        createdAt: Date;
        updatedAt: Date;
        description: string | null;
        imageUrl: string | null;
        price: number;
        categoryId: string;
    }>;
}
