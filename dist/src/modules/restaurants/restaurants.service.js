"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.RestaurantsService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../../prisma/prisma.service");
let RestaurantsService = class RestaurantsService {
    constructor(prisma) {
        this.prisma = prisma;
    }
    async findAll() {
        return this.prisma.restaurant.findMany({
            include: {
                categories: {
                    include: {
                        products: true,
                    },
                },
                user: {
                    select: {
                        id: true,
                        name: true,
                        email: true,
                    },
                },
            },
        });
    }
    async findOne(id) {
        const restaurant = await this.prisma.restaurant.findUnique({
            where: { id },
            include: {
                categories: {
                    include: {
                        products: true,
                    },
                },
                user: {
                    select: {
                        id: true,
                        name: true,
                        email: true,
                    },
                },
            },
        });
        if (!restaurant) {
            throw new common_1.NotFoundException('Restaurant not found');
        }
        return restaurant;
    }
    async getMenu(id) {
        const restaurant = await this.prisma.restaurant.findUnique({
            where: { id },
            include: {
                categories: {
                    include: {
                        products: true,
                    },
                },
            },
        });
        if (!restaurant) {
            throw new common_1.NotFoundException('Restaurant not found');
        }
        return restaurant.categories;
    }
    async create(userId, createRestaurantDto) {
        return this.prisma.restaurant.create({
            data: {
                ...createRestaurantDto,
                userId,
            },
            include: {
                user: {
                    select: {
                        id: true,
                        name: true,
                        email: true,
                    },
                },
            },
        });
    }
    async update(id, userId, updateRestaurantDto) {
        const restaurant = await this.findOne(id);
        if (restaurant.userId !== userId) {
            throw new common_1.ForbiddenException('You can only update your own restaurants');
        }
        return this.prisma.restaurant.update({
            where: { id },
            data: updateRestaurantDto,
            include: {
                user: {
                    select: {
                        id: true,
                        name: true,
                        email: true,
                    },
                },
            },
        });
    }
    async remove(id, userId) {
        const restaurant = await this.findOne(id);
        if (restaurant.userId !== userId) {
            throw new common_1.ForbiddenException('You can only delete your own restaurants');
        }
        return this.prisma.restaurant.delete({ where: { id } });
    }
};
exports.RestaurantsService = RestaurantsService;
exports.RestaurantsService = RestaurantsService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], RestaurantsService);
//# sourceMappingURL=restaurants.service.js.map