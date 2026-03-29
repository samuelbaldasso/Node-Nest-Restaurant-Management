import { ProductsService } from './products.service';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
export declare class ProductsController {
    private readonly productsService;
    constructor(productsService: ProductsService);
    findAll(categoryId: string): Promise<{
        name: string;
        id: string;
        createdAt: Date;
        updatedAt: Date;
        description: string | null;
        imageUrl: string | null;
        price: number;
        categoryId: string;
    }[]>;
    create(categoryId: string, userId: string, createProductDto: CreateProductDto): Promise<{
        name: string;
        id: string;
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
        } & {
            name: string;
            id: string;
            restaurantId: string;
            createdAt: Date;
            updatedAt: Date;
        };
    } & {
        name: string;
        id: string;
        createdAt: Date;
        updatedAt: Date;
        description: string | null;
        imageUrl: string | null;
        price: number;
        categoryId: string;
    }>;
    update(id: string, userId: string, updateProductDto: UpdateProductDto): Promise<{
        name: string;
        id: string;
        createdAt: Date;
        updatedAt: Date;
        description: string | null;
        imageUrl: string | null;
        price: number;
        categoryId: string;
    }>;
    remove(id: string, userId: string): Promise<{
        name: string;
        id: string;
        createdAt: Date;
        updatedAt: Date;
        description: string | null;
        imageUrl: string | null;
        price: number;
        categoryId: string;
    }>;
}
