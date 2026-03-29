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
exports.OrdersService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../../prisma/prisma.service");
let OrdersService = class OrdersService {
    constructor(prisma) {
        this.prisma = prisma;
    }
    async findAll(userId, role, pagination = {}) {
        const { page = 1, limit = 20 } = pagination;
        const skip = (page - 1) * limit;
        const whereClause = role === 'ADMIN'
            ? {}
            : {
                OR: [
                    { userId },
                    { restaurant: { userId } },
                ],
            };
        const [orders, total] = await Promise.all([
            this.prisma.order.findMany({
                where: whereClause,
                include: {
                    user: {
                        select: {
                            id: true,
                            name: true,
                            email: true,
                        },
                    },
                    restaurant: true,
                    items: {
                        include: {
                            product: true,
                        },
                    },
                },
                orderBy: {
                    createdAt: 'desc',
                },
                skip,
                take: limit,
            }),
            this.prisma.order.count({ where: whereClause }),
        ]);
        return {
            data: orders,
            meta: {
                total,
                page,
                limit,
                totalPages: Math.ceil(total / limit),
            },
        };
    }
    async findOne(id, userId, role) {
        const order = await this.prisma.order.findUnique({
            where: { id },
            include: {
                user: {
                    select: {
                        id: true,
                        name: true,
                        email: true,
                    },
                },
                restaurant: true,
                items: {
                    include: {
                        product: true,
                    },
                },
            },
        });
        if (!order) {
            throw new common_1.NotFoundException('Order not found');
        }
        const user = await this.prisma.user.findUnique({
            where: { id: userId },
            include: {
                restaurants: true,
            },
        });
        const restaurantIds = user?.restaurants.map(r => r.id) || [];
        const isOwner = order.restaurant.userId === userId;
        const isCustomer = order.userId === userId;
        const isAdmin = role === 'ADMIN';
        if (!isOwner && !isCustomer && !isAdmin) {
            throw new common_1.ForbiddenException('You can only view your own orders');
        }
        return order;
    }
    async create(userId, createOrderDto) {
        const { restaurantId, items } = createOrderDto;
        const restaurant = await this.prisma.restaurant.findUnique({
            where: { id: restaurantId },
        });
        if (!restaurant) {
            throw new common_1.NotFoundException('Restaurant not found');
        }
        const productIds = items.map(item => item.productId);
        const products = await this.prisma.product.findMany({
            where: { id: { in: productIds } },
            include: { category: true },
        });
        if (products.length !== productIds.length) {
            const foundIds = products.map(p => p.id);
            const missingId = productIds.find(id => !foundIds.includes(id));
            throw new common_1.NotFoundException(`Product ${missingId} not found`);
        }
        for (const product of products) {
            if (product.category.restaurantId !== restaurantId) {
                throw new common_1.BadRequestException(`Product ${product.id} does not belong to this restaurant`);
            }
        }
        const productMap = new Map(products.map(p => [p.id, p]));
        const orderItemsData = items.map(item => {
            const product = productMap.get(item.productId);
            return {
                productId: item.productId,
                quantity: item.quantity,
                price: product.price,
            };
        });
        const total = orderItemsData.reduce((sum, item) => sum + item.price * item.quantity, 0);
        return this.prisma.$transaction(async (tx) => {
            return tx.order.create({
                data: {
                    userId,
                    restaurantId,
                    total,
                    items: {
                        create: orderItemsData,
                    },
                },
                include: {
                    user: {
                        select: {
                            id: true,
                            name: true,
                            email: true,
                        },
                    },
                    restaurant: true,
                    items: {
                        include: {
                            product: true,
                        },
                    },
                },
            });
        });
    }
    async updateStatus(id, userId, updateOrderStatusDto) {
        const order = await this.prisma.order.findUnique({
            where: { id },
            include: {
                restaurant: true,
            },
        });
        if (!order) {
            throw new common_1.NotFoundException('Order not found');
        }
        if (order.restaurant.userId !== userId) {
            throw new common_1.ForbiddenException('You can only update orders for your own restaurants');
        }
        return this.prisma.order.update({
            where: { id },
            data: { status: updateOrderStatusDto.status },
            include: {
                user: {
                    select: {
                        id: true,
                        name: true,
                        email: true,
                    },
                },
                restaurant: true,
                items: {
                    include: {
                        product: true,
                    },
                },
            },
        });
    }
};
exports.OrdersService = OrdersService;
exports.OrdersService = OrdersService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], OrdersService);
//# sourceMappingURL=orders.service.js.map