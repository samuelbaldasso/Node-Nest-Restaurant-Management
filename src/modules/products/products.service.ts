import { Injectable, NotFoundException, ForbiddenException } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';

@Injectable()
export class ProductsService {
  constructor(private prisma: PrismaService) {}

  async findAll(categoryId: string) {
    return this.prisma.product.findMany({
      where: { categoryId },
    });
  }

  async findOne(id: string) {
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
      throw new NotFoundException('Product not found');
    }

    return product;
  }

  async create(categoryId: string, userId: string, createProductDto: CreateProductDto) {
    const category = await this.prisma.category.findUnique({
      where: { id: categoryId },
      include: {
        restaurant: true,
      },
    });

    if (!category) {
      throw new NotFoundException('Category not found');
    }

    if (category.restaurant.userId !== userId) {
      throw new ForbiddenException('You can only add products to your own restaurants');
    }

    return this.prisma.product.create({
      data: {
        ...createProductDto,
        categoryId,
      },
    });
  }

  async update(id: string, userId: string, updateProductDto: UpdateProductDto) {
    const product = await this.findOne(id);

    if (product.category.restaurant.userId !== userId) {
      throw new ForbiddenException('You can only update your own products');
    }

    return this.prisma.product.update({
      where: { id },
      data: updateProductDto,
    });
  }

  async remove(id: string, userId: string) {
    const product = await this.findOne(id);

    if (product.category.restaurant.userId !== userId) {
      throw new ForbiddenException('You can only delete your own products');
    }

    return this.prisma.product.delete({ where: { id } });
  }
}
