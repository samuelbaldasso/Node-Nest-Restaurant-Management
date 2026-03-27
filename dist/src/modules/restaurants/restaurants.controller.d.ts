import { RestaurantsService } from './restaurants.service';
import { CreateRestaurantDto } from './dto/create-restaurant.dto';
import { UpdateRestaurantDto } from './dto/update-restaurant.dto';
export declare class RestaurantsController {
    private readonly restaurantsService;
    constructor(restaurantsService: RestaurantsService);
    findAll(): Promise<({
        user: {
            id: string;
            email: string;
            name: string;
        };
        categories: ({
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
        })[];
    } & {
        id: string;
        name: string;
        createdAt: Date;
        updatedAt: Date;
        description: string | null;
        address: string;
        imageUrl: string | null;
        userId: string;
    })[]>;
    findOne(id: string): Promise<{
        user: {
            id: string;
            email: string;
            name: string;
        };
        categories: ({
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
        })[];
    } & {
        id: string;
        name: string;
        createdAt: Date;
        updatedAt: Date;
        description: string | null;
        address: string;
        imageUrl: string | null;
        userId: string;
    }>;
    getMenu(id: string): Promise<({
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
    create(userId: string, createRestaurantDto: CreateRestaurantDto): Promise<{
        user: {
            id: string;
            email: string;
            name: string;
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
    }>;
    update(id: string, userId: string, updateRestaurantDto: UpdateRestaurantDto): Promise<{
        user: {
            id: string;
            email: string;
            name: string;
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
    }>;
    remove(id: string, userId: string): Promise<{
        id: string;
        name: string;
        createdAt: Date;
        updatedAt: Date;
        description: string | null;
        address: string;
        imageUrl: string | null;
        userId: string;
    }>;
}
