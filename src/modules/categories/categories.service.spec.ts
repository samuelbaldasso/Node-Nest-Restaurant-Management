import { Test, TestingModule } from '@nestjs/testing';
import { ForbiddenException, NotFoundException } from '@nestjs/common';
import { CategoriesService } from './categories.service';
import { PrismaService } from '../../prisma/prisma.service';

describe('CategoriesService', () => {
  let service: CategoriesService;
  let prisma: {
    category: Record<string, jest.Mock>;
    restaurant: Record<string, jest.Mock>;
  };

  beforeEach(async () => {
    prisma = {
      category: {
        findMany: jest.fn(),
        findUnique: jest.fn(),
        create: jest.fn(),
        update: jest.fn(),
        delete: jest.fn(),
      },
      restaurant: {
        findUnique: jest.fn(),
      },
    };

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        CategoriesService,
        { provide: PrismaService, useValue: prisma },
      ],
    }).compile();

    service = module.get<CategoriesService>(CategoriesService);
  });

  describe('create', () => {
    it('throws NotFoundException when the restaurant does not exist', async () => {
      prisma.restaurant.findUnique.mockResolvedValue(null);

      await expect(
        service.create('restaurant-1', 'user-1', { name: 'Pizzas' }),
      ).rejects.toThrow(NotFoundException);
    });

    it('throws ForbiddenException when the caller does not own the restaurant', async () => {
      prisma.restaurant.findUnique.mockResolvedValue({ id: 'restaurant-1', userId: 'owner-1' });

      await expect(
        service.create('restaurant-1', 'someone-else', { name: 'Pizzas' }),
      ).rejects.toThrow(ForbiddenException);
    });

    it('creates the category when the caller owns the restaurant', async () => {
      prisma.restaurant.findUnique.mockResolvedValue({ id: 'restaurant-1', userId: 'owner-1' });
      prisma.category.create.mockResolvedValue({ id: 'category-1', name: 'Pizzas' });

      const result = await service.create('restaurant-1', 'owner-1', { name: 'Pizzas' });

      expect(prisma.category.create).toHaveBeenCalledWith({
        data: { name: 'Pizzas', restaurantId: 'restaurant-1' },
      });
      expect(result).toEqual({ id: 'category-1', name: 'Pizzas' });
    });
  });

  describe('findOne', () => {
    it('throws NotFoundException when the category does not exist', async () => {
      prisma.category.findUnique.mockResolvedValue(null);

      await expect(service.findOne('category-1')).rejects.toThrow(NotFoundException);
    });
  });

  describe('update', () => {
    it('throws ForbiddenException when the caller does not own the parent restaurant', async () => {
      prisma.category.findUnique.mockResolvedValue({
        id: 'category-1',
        restaurant: { userId: 'owner-1' },
      });

      await expect(
        service.update('category-1', 'someone-else', { name: 'New name' }),
      ).rejects.toThrow(ForbiddenException);
    });

    it('updates the category when the caller owns the parent restaurant', async () => {
      prisma.category.findUnique.mockResolvedValue({
        id: 'category-1',
        restaurant: { userId: 'owner-1' },
      });
      prisma.category.update.mockResolvedValue({ id: 'category-1', name: 'New name' });

      const result = await service.update('category-1', 'owner-1', { name: 'New name' });

      expect(result).toEqual({ id: 'category-1', name: 'New name' });
    });
  });

  describe('remove', () => {
    it('throws ForbiddenException when the caller does not own the parent restaurant', async () => {
      prisma.category.findUnique.mockResolvedValue({
        id: 'category-1',
        restaurant: { userId: 'owner-1' },
      });

      await expect(service.remove('category-1', 'someone-else')).rejects.toThrow(ForbiddenException);
    });
  });
});
