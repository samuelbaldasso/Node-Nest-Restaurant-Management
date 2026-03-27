import { Injectable, NotFoundException, ForbiddenException } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';

@Injectable()
export class CategoriesService {
  constructor(private prisma: PrismaService) {}

  async findAll(restaurantId: string) {
    return this.prisma.category.findMany({
      where: { restaurantId },
      include: {
        products: true,
      },
    });
  }

  async findOne(id: string) {
    const category = await this.prisma.category.findUnique({
      where: { id },
      include: {
        products: true,
        restaurant: {
          include: {
            user: true,
          },
        },
      },
    });

    if (!category) {
      throw new NotFoundException('Category not found');
    }

    return category;
  }

  async create(restaurantId: string, userId: string, createCategoryDto: CreateCategoryDto) {
    const restaurant = await this.prisma.restaurant.findUnique({
      where: { id: restaurantId },
    });

    if (!restaurant) {
      throw new NotFoundException('Restaurant not found');
    }

    if (restaurant.userId !== userId) {
      throw new ForbiddenException('You can only add categories to your own restaurants');
    }

    return this.prisma.category.create({
      data: {
        ...createCategoryDto,
        restaurantId,
      },
    });
  }

  async update(id: string, userId: string, updateCategoryDto: UpdateCategoryDto) {
    const category = await this.findOne(id);

    if (category.restaurant.userId !== userId) {
      throw new ForbiddenException('You can only update your own categories');
    }

    return this.prisma.category.update({
      where: { id },
      data: updateCategoryDto,
    });
  }

  async remove(id: string, userId: string) {
    const category = await this.findOne(id);

    if (category.restaurant.userId !== userId) {
      throw new ForbiddenException('You can only delete your own categories');
    }

    return this.prisma.category.delete({ where: { id } });
  }
}
