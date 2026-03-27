import { Injectable, NotFoundException, ForbiddenException } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { CreateRestaurantDto } from './dto/create-restaurant.dto';
import { UpdateRestaurantDto } from './dto/update-restaurant.dto';

@Injectable()
export class RestaurantsService {
  constructor(private prisma: PrismaService) {}

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

  async findOne(id: string) {
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
      throw new NotFoundException('Restaurant not found');
    }

    return restaurant;
  }

  async getMenu(id: string) {
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
      throw new NotFoundException('Restaurant not found');
    }

    return restaurant.categories;
  }

  async create(userId: string, createRestaurantDto: CreateRestaurantDto) {
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

  async update(id: string, userId: string, updateRestaurantDto: UpdateRestaurantDto) {
    const restaurant = await this.findOne(id);

    if (restaurant.userId !== userId) {
      throw new ForbiddenException('You can only update your own restaurants');
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

  async remove(id: string, userId: string) {
    const restaurant = await this.findOne(id);

    if (restaurant.userId !== userId) {
      throw new ForbiddenException('You can only delete your own restaurants');
    }

    return this.prisma.restaurant.delete({ where: { id } });
  }
}
