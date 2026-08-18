import { Test, TestingModule } from '@nestjs/testing';
import { NotFoundException } from '@nestjs/common';
import { UsersService } from './users.service';
import { PrismaService } from '../../prisma/prisma.service';

describe('UsersService', () => {
  let service: UsersService;
  let prisma: {
    user: Record<string, jest.Mock>;
  };

  beforeEach(async () => {
    prisma = {
      user: {
        findMany: jest.fn(),
        findUnique: jest.fn(),
        update: jest.fn(),
        delete: jest.fn(),
      },
    };

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UsersService,
        { provide: PrismaService, useValue: prisma },
      ],
    }).compile();

    service = module.get<UsersService>(UsersService);
  });

  describe('findOne', () => {
    it('throws NotFoundException when the user does not exist', async () => {
      prisma.user.findUnique.mockResolvedValue(null);

      await expect(service.findOne('user-1')).rejects.toThrow(NotFoundException);
    });

    it('returns the user without the password field', async () => {
      const user = { id: 'user-1', email: 'a@b.com', name: 'A', role: 'CUSTOMER' };
      prisma.user.findUnique.mockResolvedValue(user);

      await expect(service.findOne('user-1')).resolves.toEqual(user);
      expect(prisma.user.findUnique).toHaveBeenCalledWith(
        expect.objectContaining({
          select: expect.not.objectContaining({ password: true }),
        }),
      );
    });
  });

  describe('update', () => {
    it('throws NotFoundException when the user does not exist', async () => {
      prisma.user.findUnique.mockResolvedValue(null);

      await expect(service.update('user-1', { name: 'New name' })).rejects.toThrow(NotFoundException);
      expect(prisma.user.update).not.toHaveBeenCalled();
    });

    it('updates the user when it exists', async () => {
      prisma.user.findUnique.mockResolvedValue({ id: 'user-1' });
      prisma.user.update.mockResolvedValue({ id: 'user-1', name: 'New name' });

      const result = await service.update('user-1', { name: 'New name' });

      expect(result).toEqual({ id: 'user-1', name: 'New name' });
    });
  });

  describe('remove', () => {
    it('throws NotFoundException when the user does not exist', async () => {
      prisma.user.findUnique.mockResolvedValue(null);

      await expect(service.remove('user-1')).rejects.toThrow(NotFoundException);
      expect(prisma.user.delete).not.toHaveBeenCalled();
    });
  });
});
