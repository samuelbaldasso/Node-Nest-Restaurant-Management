import { Injectable, NotFoundException, ForbiddenException, BadRequestException } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { CreateOrderDto } from './dto/create-order.dto';
import { UpdateOrderStatusDto } from './dto/update-order-status.dto';
import { Prisma } from '@prisma/client';

@Injectable()
export class OrdersService {
  constructor(private prisma: PrismaService) {}

  async findAll(userId: string, role: string, pagination: { page?: number; limit?: number } = {}) {
    const { page = 1, limit = 20 } = pagination;
    const skip = (page - 1) * limit;

    const whereClause: Prisma.OrderWhereInput = role === 'ADMIN'
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

  async findOne(id: string, userId: string, role: string) {
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
      throw new NotFoundException('Order not found');
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
      throw new ForbiddenException('You can only view your own orders');
    }

    return order;
  }

  async create(userId: string, createOrderDto: CreateOrderDto) {
    const { restaurantId, items } = createOrderDto;

    const restaurant = await this.prisma.restaurant.findUnique({
      where: { id: restaurantId },
    });

    if (!restaurant) {
      throw new NotFoundException('Restaurant not found');
    }

    const productIds = items.map(item => item.productId);
    const products = await this.prisma.product.findMany({
      where: { id: { in: productIds } },
      include: { category: true },
    });

    if (products.length !== productIds.length) {
      const foundIds = products.map(p => p.id);
      const missingId = productIds.find(id => !foundIds.includes(id));
      throw new NotFoundException(`Product ${missingId} not found`);
    }

    for (const product of products) {
      if (product.category.restaurantId !== restaurantId) {
        throw new BadRequestException(`Product ${product.id} does not belong to this restaurant`);
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

    const total = orderItemsData.reduce(
      (sum, item) => sum + item.price * item.quantity,
      0
    );

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

  async updateStatus(id: string, userId: string, updateOrderStatusDto: UpdateOrderStatusDto) {
    const order = await this.prisma.order.findUnique({
      where: { id },
      include: {
        restaurant: true,
      },
    });

    if (!order) {
      throw new NotFoundException('Order not found');
    }

    if (order.restaurant.userId !== userId) {
      throw new ForbiddenException('You can only update orders for your own restaurants');
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
}
