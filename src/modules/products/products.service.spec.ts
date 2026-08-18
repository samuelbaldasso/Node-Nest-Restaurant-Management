import { Test, TestingModule } from '@nestjs/testing';
import { ForbiddenException, NotFoundException } from '@nestjs/common';
import { ProductsService } from './products.service';
import { PrismaService } from '../../prisma/prisma.service';

describe('ProductsService', () => {
  let service: ProductsService;
  let prisma: {
    product: Record<string, jest.Mock>;
    category: Record<string, jest.Mock>;
  };

  beforeEach(async () => {
    prisma = {
      product: {
        findMany: jest.fn(),
        findUnique: jest.fn(),
        create: jest.fn(),
        update: jest.fn(),
        delete: jest.fn(),
      },
      category: {
        findUnique: jest.fn(),
      },
    };

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ProductsService,
        { provide: PrismaService, useValue: prisma },
      ],
    }).compile();

    service = module.get<ProductsService>(ProductsService);
  });

  describe('create', () => {
    it('throws NotFoundException when the category does not exist', async () => {
      prisma.category.findUnique.mockResolvedValue(null);

      await expect(
        service.create('category-1', 'user-1', { name: 'Margherita', price: 2500 }),
      ).rejects.toThrow(NotFoundException);
    });

    it('throws ForbiddenException when the caller does not own the restaurant', async () => {
      prisma.category.findUnique.mockResolvedValue({
        id: 'category-1',
        restaurant: { userId: 'owner-1' },
      });

      await expect(
        service.create('category-1', 'someone-else', { name: 'Margherita', price: 2500 }),
      ).rejects.toThrow(ForbiddenException);
    });

    it('creates the product when the caller owns the restaurant', async () => {
      prisma.category.findUnique.mockResolvedValue({
        id: 'category-1',
        restaurant: { userId: 'owner-1' },
      });
      prisma.product.create.mockResolvedValue({ id: 'product-1', name: 'Margherita', price: 2500 });

      const result = await service.create('category-1', 'owner-1', { name: 'Margherita', price: 2500 });

      expect(prisma.product.create).toHaveBeenCalledWith({
        data: { name: 'Margherita', price: 2500, categoryId: 'category-1' },
      });
      expect(result).toEqual({ id: 'product-1', name: 'Margherita', price: 2500 });
    });
  });

  describe('findOne', () => {
    it('throws NotFoundException when the product does not exist', async () => {
      prisma.product.findUnique.mockResolvedValue(null);

      await expect(service.findOne('product-1')).rejects.toThrow(NotFoundException);
    });
  });

  describe('update', () => {
    it('throws ForbiddenException when the caller does not own the restaurant', async () => {
      prisma.product.findUnique.mockResolvedValue({
        id: 'product-1',
        category: { restaurant: { userId: 'owner-1' } },
      });

      await expect(
        service.update('product-1', 'someone-else', { price: 3000 }),
      ).rejects.toThrow(ForbiddenException);
    });

    it('updates the product when the caller owns the restaurant', async () => {
      prisma.product.findUnique.mockResolvedValue({
        id: 'product-1',
        category: { restaurant: { userId: 'owner-1' } },
      });
      prisma.product.update.mockResolvedValue({ id: 'product-1', price: 3000 });

      const result = await service.update('product-1', 'owner-1', { price: 3000 });

      expect(result).toEqual({ id: 'product-1', price: 3000 });
    });
  });

  describe('remove', () => {
    it('throws ForbiddenException when the caller does not own the restaurant', async () => {
      prisma.product.findUnique.mockResolvedValue({
        id: 'product-1',
        category: { restaurant: { userId: 'owner-1' } },
      });

      await expect(service.remove('product-1', 'someone-else')).rejects.toThrow(ForbiddenException);
    });
  });
});
