import { Test, TestingModule } from '@nestjs/testing';
import { ForbiddenException, NotFoundException } from '@nestjs/common';
import { RestaurantsService } from './restaurants.service';
import { PrismaService } from '../../prisma/prisma.service';

describe('RestaurantsService', () => {
  let service: RestaurantsService;
  let prisma: {
    restaurant: Record<string, jest.Mock>;
  };

  beforeEach(async () => {
    prisma = {
      restaurant: {
        findMany: jest.fn(),
        findUnique: jest.fn(),
        create: jest.fn(),
        update: jest.fn(),
        delete: jest.fn(),
      },
    };

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        RestaurantsService,
        { provide: PrismaService, useValue: prisma },
      ],
    }).compile();

    service = module.get<RestaurantsService>(RestaurantsService);
  });

  describe('findOne', () => {
    it('throws NotFoundException when the restaurant does not exist', async () => {
      prisma.restaurant.findUnique.mockResolvedValue(null);

      await expect(service.findOne('restaurant-1')).rejects.toThrow(NotFoundException);
    });
  });

  describe('getMenu', () => {
    it('throws NotFoundException when the restaurant does not exist', async () => {
      prisma.restaurant.findUnique.mockResolvedValue(null);

      await expect(service.getMenu('restaurant-1')).rejects.toThrow(NotFoundException);
    });

    it('returns the categories of the restaurant', async () => {
      prisma.restaurant.findUnique.mockResolvedValue({ id: 'restaurant-1', categories: [{ id: 'category-1' }] });

      await expect(service.getMenu('restaurant-1')).resolves.toEqual([{ id: 'category-1' }]);
    });
  });

  describe('update', () => {
    it('throws ForbiddenException when the caller is not the owner', async () => {
      prisma.restaurant.findUnique.mockResolvedValue({ id: 'restaurant-1', userId: 'owner-1' });

      await expect(
        service.update('restaurant-1', 'someone-else', { name: 'New name' }),
      ).rejects.toThrow(ForbiddenException);
    });

    it('updates the restaurant when the caller is the owner', async () => {
      prisma.restaurant.findUnique.mockResolvedValue({ id: 'restaurant-1', userId: 'owner-1' });
      prisma.restaurant.update.mockResolvedValue({ id: 'restaurant-1', name: 'New name' });

      const result = await service.update('restaurant-1', 'owner-1', { name: 'New name' });

      expect(result).toEqual({ id: 'restaurant-1', name: 'New name' });
    });
  });

  describe('remove', () => {
    it('throws ForbiddenException when the caller is not the owner', async () => {
      prisma.restaurant.findUnique.mockResolvedValue({ id: 'restaurant-1', userId: 'owner-1' });

      await expect(service.remove('restaurant-1', 'someone-else')).rejects.toThrow(ForbiddenException);
    });
  });
});
