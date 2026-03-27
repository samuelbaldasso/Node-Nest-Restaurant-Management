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
exports.ProductsService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../../prisma/prisma.service");
let ProductsService = class ProductsService {
    constructor(prisma) {
        this.prisma = prisma;
    }
    async findAll(categoryId) {
        return this.prisma.product.findMany({
            where: { categoryId },
        });
    }
    async findOne(id) {
        const product = await this.prisma.product.findUnique({
            where: { id },
            include: {
                category: {
                    include: {
                        restaurant: {
                            include: {
                                user: true,
                            },
                        },
                    },
                },
            },
        });
        if (!product) {
            throw new common_1.NotFoundException('Product not found');
        }
        return product;
    }
    async create(categoryId, userId, createProductDto) {
        const category = await this.prisma.category.findUnique({
            where: { id: categoryId },
            include: {
                restaurant: true,
            },
        });
        if (!category) {
            throw new common_1.NotFoundException('Category not found');
        }
        if (category.restaurant.userId !== userId) {
            throw new common_1.ForbiddenException('You can only add products to your own restaurants');
        }
        return this.prisma.product.create({
            data: {
                ...createProductDto,
                categoryId,
            },
        });
    }
    async update(id, userId, updateProductDto) {
        const product = await this.findOne(id);
        if (product.category.restaurant.userId !== userId) {
            throw new common_1.ForbiddenException('You can only update your own products');
        }
        return this.prisma.product.update({
            where: { id },
            data: updateProductDto,
        });
    }
    async remove(id, userId) {
        const product = await this.findOne(id);
        if (product.category.restaurant.userId !== userId) {
            throw new common_1.ForbiddenException('You can only delete your own products');
        }
        return this.prisma.product.delete({ where: { id } });
    }
};
exports.ProductsService = ProductsService;
exports.ProductsService = ProductsService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], ProductsService);
//# sourceMappingURL=products.service.js.map