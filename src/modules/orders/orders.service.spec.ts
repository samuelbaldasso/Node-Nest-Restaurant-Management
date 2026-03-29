import { Test, TestingModule } from '@nestjs/testing';
import { OrdersService } from './orders.service';
import { PrismaService } from '../../prisma/prisma.service';
import { NotFoundException, ForbiddenException, BadRequestException } from '@nestjs/common';

describe('OrdersService', () => {
  let service: OrdersService;
  let prisma: PrismaService;

  const mockPrisma = {
    order: {
      findMany: jest.fn(),
      findUnique: jest.fn(),
      create: jest.fn(),
      update: jest.fn(),
      count: jest.fn(),
    },
    restaurant: {
      findUnique: jest.fn(),
    },
    product: {
      findMany: jest.fn(),
      findUnique: jest.fn(),
    },
    user: {
      findUnique: jest.fn(),
    },
    $transaction: jest.fn((callback) => callback(mockPrisma)),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        OrdersService,
        {
          provide: PrismaService,
          useValue: mockPrisma,
        },
      ],
    }).compile();

    service = module.get<OrdersService>(OrdersService);
    prisma = module.get<PrismaService>(PrismaService);
    jest.clearAllMocks();
  });

  describe('findAll', () => {
    it('should return paginated orders for admin', async () => {
      const mockOrders = [{ id: '1' }, { id: '2' }];
      mockPrisma.order.findMany.mockResolvedValue(mockOrders);
      mockPrisma.order.count.mockResolvedValue(2);

      const result = await service.findAll('admin-id', 'ADMIN', { page: 1, limit: 10 });

      expect(result.data).toEqual(mockOrders);
      expect(result.meta.total).toBe(2);
      expect(result.meta.page).toBe(1);
      expect(mockPrisma.order.findMany).toHaveBeenCalled();
    });

    it('should return paginated orders for customer', async () => {
      const mockOrders = [{ id: '1', userId: 'user-1' }];
      mockPrisma.order.findMany.mockResolvedValue(mockOrders);
      mockPrisma.order.count.mockResolvedValue(1);

      const result = await service.findAll('user-1', 'CUSTOMER', { page: 1, limit: 10 });

      expect(result.data).toEqual(mockOrders);
      expect(mockPrisma.order.findMany).toHaveBeenCalledWith(
        expect.objectContaining({
          where: expect.objectContaining({
            OR: expect.any(Array),
          }),
        })
      );
    });

    it('should use default pagination values', async () => {
      mockPrisma.order.findMany.mockResolvedValue([]);
      mockPrisma.order.count.mockResolvedValue(0);

      await service.findAll('user-id', 'CUSTOMER');

      expect(mockPrisma.order.findMany).toHaveBeenCalledWith(
        expect.objectContaining({
          skip: 0,
          take: 20,
        })
      );
    });
  });

  describe('create', () => {
    const createOrderDto = {
      restaurantId: 'restaurant-1',
      items: [
        { productId: 'product-1', quantity: 2 },
        { productId: 'product-2', quantity: 1 },
      ],
    };

    it('should throw NotFoundException if restaurant not found', async () => {
      mockPrisma.restaurant.findUnique.mockResolvedValue(null);

      await expect(service.create('user-1', createOrderDto)).rejects.toThrow(NotFoundException);
    });

    it('should throw NotFoundException if product not found', async () => {
      mockPrisma.restaurant.findUnique.mockResolvedValue({ id: 'restaurant-1' });
      mockPrisma.product.findMany.mockResolvedValue([]);

      await expect(service.create('user-1', createOrderDto)).rejects.toThrow(NotFoundException);
    });

    it('should throw BadRequestException if product belongs to different restaurant', async () => {
      mockPrisma.restaurant.findUnique.mockResolvedValue({ id: 'restaurant-1' });
      mockPrisma.product.findMany.mockResolvedValue([
        { id: 'product-1', price: 1000, category: { restaurantId: 'restaurant-2' } },
        { id: 'product-2', price: 500, category: { restaurantId: 'restaurant-1' } },
      ]);

      await expect(service.create('user-1', createOrderDto)).rejects.toThrow(BadRequestException);
    });

    it('should create order with correct total', async () => {
      mockPrisma.restaurant.findUnique.mockResolvedValue({ id: 'restaurant-1' });
      mockPrisma.product.findMany.mockResolvedValue([
        { id: 'product-1', price: 1000, category: { restaurantId: 'restaurant-1' } },
        { id: 'product-2', price: 500, category: { restaurantId: 'restaurant-1' } },
      ]);

      const mockOrder = {
        id: 'order-1',
        userId: 'user-1',
        restaurantId: 'restaurant-1',
        total: 2500,
        items: [],
      };

      mockPrisma.order.create = jest.fn().mockResolvedValue(mockOrder);

      const result = await service.create('user-1', createOrderDto);

      expect(result.total).toBe(2500);
    });

    it('should create order within transaction', async () => {
      mockPrisma.restaurant.findUnique.mockResolvedValue({ id: 'restaurant-1' });
      mockPrisma.product.findMany.mockResolvedValue([
        { id: 'product-1', price: 1000, category: { restaurantId: 'restaurant-1' } },
        { id: 'product-2', price: 500, category: { restaurantId: 'restaurant-1' } },
      ]);

      const mockOrder = {
        id: 'order-1',
        total: 2500,
      };

      mockPrisma.order.create = jest.fn().mockResolvedValue(mockOrder);

      await service.create('user-1', createOrderDto);

      expect(mockPrisma.$transaction).toHaveBeenCalled();
    });
  });

  describe('findOne', () => {
    it('should throw NotFoundException if order not found', async () => {
      mockPrisma.order.findUnique.mockResolvedValue(null);

      await expect(service.findOne('order-1', 'user-1', 'CUSTOMER')).rejects.toThrow(NotFoundException);
    });

    it('should allow owner to view order', async () => {
      const mockOrder = {
        id: 'order-1',
        userId: 'user-1',
        restaurant: { userId: 'owner-1' },
      };
      mockPrisma.order.findUnique.mockResolvedValue(mockOrder);

      const result = await service.findOne('order-1', 'user-1', 'CUSTOMER');

      expect(result).toEqual(mockOrder);
    });

    it('should allow restaurant owner to view order', async () => {
      const mockOrder = {
        id: 'order-1',
        userId: 'customer-1',
        restaurant: { userId: 'owner-1' },
      };
      mockPrisma.order.findUnique.mockResolvedValue(mockOrder);

      const result = await service.findOne('order-1', 'owner-1', 'RESTAURANT_OWNER');

      expect(result).toEqual(mockOrder);
    });

    it('should throw ForbiddenException if user has no access', async () => {
      const mockOrder = {
        id: 'order-1',
        userId: 'customer-1',
        restaurant: { userId: 'owner-1' },
      };
      mockPrisma.order.findUnique.mockResolvedValue(mockOrder);

      await expect(
        service.findOne('order-1', 'other-user', 'CUSTOMER')
      ).rejects.toThrow(ForbiddenException);
    });
  });

  describe('updateStatus', () => {
    it('should throw NotFoundException if order not found', async () => {
      mockPrisma.order.findUnique.mockResolvedValue(null);

      await expect(
        service.updateStatus('order-1', 'owner-1', { status: 'CONFIRMED' })
      ).rejects.toThrow(NotFoundException);
    });

    it('should throw ForbiddenException if not restaurant owner', async () => {
      const mockOrder = {
        id: 'order-1',
        restaurant: { userId: 'owner-1' },
      };
      mockPrisma.order.findUnique.mockResolvedValue(mockOrder);

      await expect(
        service.updateStatus('order-1', 'other-user', { status: 'CONFIRMED' })
      ).rejects.toThrow(ForbiddenException);
    });

    it('should update order status', async () => {
      const mockOrder = {
        id: 'order-1',
        restaurant: { userId: 'owner-1' },
        status: 'PENDING',
      };
      const updatedOrder = { ...mockOrder, status: 'CONFIRMED' };
      mockPrisma.order.findUnique.mockResolvedValue(mockOrder);
      mockPrisma.order.update.mockResolvedValue(updatedOrder);

      const result = await service.updateStatus('order-1', 'owner-1', { status: 'CONFIRMED' });

      expect(result.status).toBe('CONFIRMED');
      expect(mockPrisma.order.update).toHaveBeenCalledWith({
        where: { id: 'order-1' },
        data: { status: 'CONFIRMED' },
        include: expect.any(Object),
      });
    });
  });
});
