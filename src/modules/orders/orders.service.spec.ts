import { Test, TestingModule } from '@nestjs/testing';
import { ForbiddenException, NotFoundException, BadRequestException } from '@nestjs/common';
import { OrdersService } from './orders.service';
import { PrismaService } from '../../prisma/prisma.service';

describe('OrdersService', () => {
  let service: OrdersService;
  let prisma: {
    order: Record<string, jest.Mock>;
    restaurant: Record<string, jest.Mock>;
    product: Record<string, jest.Mock>;
    $transaction: jest.Mock;
  };

  beforeEach(async () => {
    prisma = {
      order: {
        findMany: jest.fn(),
        count: jest.fn(),
        findUnique: jest.fn(),
        update: jest.fn(),
      },
      restaurant: {
        findUnique: jest.fn(),
      },
      product: {
        findMany: jest.fn(),
      },
      $transaction: jest.fn((cb) => cb({ order: { create: jest.fn() } })),
    };

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        OrdersService,
        { provide: PrismaService, useValue: prisma },
      ],
    }).compile();

    service = module.get<OrdersService>(OrdersService);
  });

  describe('create', () => {
    const restaurantId = 'restaurant-1';
    const dto = {
      restaurantId,
      items: [{ productId: 'product-1', quantity: 2 }],
    };

    it('throws NotFoundException when the restaurant does not exist', async () => {
      prisma.restaurant.findUnique.mockResolvedValue(null);

      await expect(service.create('user-1', dto)).rejects.toThrow(NotFoundException);
    });

    it('throws NotFoundException when a product does not exist', async () => {
      prisma.restaurant.findUnique.mockResolvedValue({ id: restaurantId });
      prisma.product.findMany.mockResolvedValue([]);

      await expect(service.create('user-1', dto)).rejects.toThrow(NotFoundException);
    });

    it('throws BadRequestException when a product belongs to another restaurant', async () => {
      prisma.restaurant.findUnique.mockResolvedValue({ id: restaurantId });
      prisma.product.findMany.mockResolvedValue([
        { id: 'product-1', price: 1000, category: { restaurantId: 'other-restaurant' } },
      ]);

      await expect(service.create('user-1', dto)).rejects.toThrow(BadRequestException);
    });

    it('computes the total from product prices and quantities', async () => {
      prisma.restaurant.findUnique.mockResolvedValue({ id: restaurantId });
      prisma.product.findMany.mockResolvedValue([
        { id: 'product-1', price: 1500, category: { restaurantId } },
      ]);
      const create = jest.fn().mockResolvedValue({ id: 'order-1', total: 3000 });
      prisma.$transaction.mockImplementation((cb) => cb({ order: { create } }));

      const result = await service.create('user-1', dto);

      expect(create).toHaveBeenCalledWith(
        expect.objectContaining({
          data: expect.objectContaining({
            total: 3000,
            items: { create: [{ productId: 'product-1', quantity: 2, price: 1500 }] },
          }),
        }),
      );
      expect(result).toEqual({ id: 'order-1', total: 3000 });
    });
  });

  describe('findOne', () => {
    const baseOrder = {
      id: 'order-1',
      userId: 'customer-1',
      restaurant: { userId: 'owner-1' },
    };

    it('throws NotFoundException when the order does not exist', async () => {
      prisma.order.findUnique.mockResolvedValue(null);

      await expect(service.findOne('order-1', 'user-1', 'CUSTOMER')).rejects.toThrow(NotFoundException);
    });

    it('allows the customer who placed the order', async () => {
      prisma.order.findUnique.mockResolvedValue(baseOrder);

      await expect(service.findOne('order-1', 'customer-1', 'CUSTOMER')).resolves.toBe(baseOrder);
    });

    it('allows the restaurant owner', async () => {
      prisma.order.findUnique.mockResolvedValue(baseOrder);

      await expect(service.findOne('order-1', 'owner-1', 'RESTAURANT_OWNER')).resolves.toBe(baseOrder);
    });

    it('allows an admin regardless of ownership', async () => {
      prisma.order.findUnique.mockResolvedValue(baseOrder);

      await expect(service.findOne('order-1', 'someone-else', 'ADMIN')).resolves.toBe(baseOrder);
    });

    it('rejects a user unrelated to the order', async () => {
      prisma.order.findUnique.mockResolvedValue(baseOrder);

      await expect(service.findOne('order-1', 'stranger', 'CUSTOMER')).rejects.toThrow(ForbiddenException);
    });
  });

  describe('updateStatus', () => {
    it('throws NotFoundException when the order does not exist', async () => {
      prisma.order.findUnique.mockResolvedValue(null);

      await expect(
        service.updateStatus('order-1', 'owner-1', { status: 'CONFIRMED' as any }),
      ).rejects.toThrow(NotFoundException);
    });

    it('throws ForbiddenException when the caller does not own the restaurant', async () => {
      prisma.order.findUnique.mockResolvedValue({ id: 'order-1', restaurant: { userId: 'owner-1' } });

      await expect(
        service.updateStatus('order-1', 'someone-else', { status: 'CONFIRMED' as any }),
      ).rejects.toThrow(ForbiddenException);
    });

    it('updates the status when the caller owns the restaurant', async () => {
      prisma.order.findUnique.mockResolvedValue({ id: 'order-1', restaurant: { userId: 'owner-1' } });
      prisma.order.update.mockResolvedValue({ id: 'order-1', status: 'CONFIRMED' });

      const result = await service.updateStatus('order-1', 'owner-1', { status: 'CONFIRMED' as any });

      expect(prisma.order.update).toHaveBeenCalledWith(
        expect.objectContaining({ where: { id: 'order-1' }, data: { status: 'CONFIRMED' } }),
      );
      expect(result).toEqual({ id: 'order-1', status: 'CONFIRMED' });
    });
  });

  describe('findAll', () => {
    it('scopes the query to the user for non-admin roles', async () => {
      prisma.order.findMany.mockResolvedValue([]);
      prisma.order.count.mockResolvedValue(0);

      await service.findAll('user-1', 'CUSTOMER', {});

      expect(prisma.order.findMany).toHaveBeenCalledWith(
        expect.objectContaining({
          where: { OR: [{ userId: 'user-1' }, { restaurant: { userId: 'user-1' } }] },
          skip: 0,
          take: 20,
        }),
      );
    });

    it('does not scope the query for admins', async () => {
      prisma.order.findMany.mockResolvedValue([]);
      prisma.order.count.mockResolvedValue(0);

      await service.findAll('admin-1', 'ADMIN', { page: 2, limit: 10 });

      expect(prisma.order.findMany).toHaveBeenCalledWith(
        expect.objectContaining({ where: {}, skip: 10, take: 10 }),
      );
    });
  });
});
