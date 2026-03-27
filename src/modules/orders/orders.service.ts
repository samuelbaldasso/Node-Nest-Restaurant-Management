import { Injectable, NotFoundException, ForbiddenException, BadRequestException } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { CreateOrderDto } from './dto/create-order.dto';
import { UpdateOrderStatusDto } from './dto/update-order-status.dto';

@Injectable()
export class OrdersService {
  constructor(private prisma: PrismaService) {}

  async findAll(userId: string, role: string) {
    if (role === 'ADMIN') {
      return this.prisma.order.findMany({
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
      });
    }

    const user = await this.prisma.user.findUnique({
      where: { id: userId },
      include: {
        restaurants: true,
      },
    });

    const restaurantIds = user?.restaurants.map(r => r.id) || [];

    return this.prisma.order.findMany({
      where: {
        OR: [
          { userId },
          { restaurantId: { in: restaurantIds } },
        ],
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
      orderBy: {
        createdAt: 'desc',
      },
    });
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

    let total = 0;
    const orderItemsData: any[] = [];

    for (const item of items) {
      const product = await this.prisma.product.findUnique({
        where: { id: item.productId },
      });

      if (!product) {
        throw new NotFoundException(`Product ${item.productId} not found`);
      }

      if (product.categoryId !== restaurantId) {
        throw new BadRequestException(`Product ${item.productId} does not belong to this restaurant`);
      }

      total += product.price * item.quantity;
      orderItemsData.push({
        productId: item.productId,
        quantity: item.quantity,
        price: product.price,
      });
    }

    return this.prisma.order.create({
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
