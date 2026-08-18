import { Test, TestingModule } from '@nestjs/testing';
import { ConflictException, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import * as bcrypt from 'bcrypt';
import { AuthService } from './auth.service';
import { PrismaService } from '../../prisma/prisma.service';

describe('AuthService', () => {
  let service: AuthService;
  let prisma: { user: Record<string, jest.Mock> };

  beforeEach(async () => {
    prisma = {
      user: {
        findUnique: jest.fn(),
        create: jest.fn(),
      },
    };

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AuthService,
        { provide: PrismaService, useValue: prisma },
        { provide: JwtService, useValue: { sign: jest.fn().mockReturnValue('signed-token') } },
        { provide: ConfigService, useValue: { get: jest.fn() } },
      ],
    }).compile();

    service = module.get<AuthService>(AuthService);
  });

  describe('register', () => {
    it('throws ConflictException when the email is already registered', async () => {
      prisma.user.findUnique.mockResolvedValue({ id: 'existing-user' });

      await expect(
        service.register({ name: 'A', email: 'a@b.com', password: 'password123' }),
      ).rejects.toThrow(ConflictException);
    });

    it('forces CUSTOMER role when none is provided', async () => {
      prisma.user.findUnique.mockResolvedValue(null);
      prisma.user.create.mockResolvedValue({ id: 'user-1', email: 'a@b.com', name: 'A', role: 'CUSTOMER' });

      await service.register({ name: 'A', email: 'a@b.com', password: 'password123' });

      expect(prisma.user.create).toHaveBeenCalledWith(
        expect.objectContaining({ data: expect.objectContaining({ role: 'CUSTOMER' }) }),
      );
    });

    it('never allows self-registration as ADMIN, even if requested', async () => {
      prisma.user.findUnique.mockResolvedValue(null);
      prisma.user.create.mockResolvedValue({ id: 'user-1', email: 'a@b.com', name: 'A', role: 'CUSTOMER' });

      await service.register({
        name: 'A',
        email: 'a@b.com',
        password: 'password123',
        role: 'ADMIN' as any,
      });

      expect(prisma.user.create).toHaveBeenCalledWith(
        expect.objectContaining({ data: expect.objectContaining({ role: 'CUSTOMER' }) }),
      );
    });

    it('allows self-registration as RESTAURANT_OWNER when explicitly requested', async () => {
      prisma.user.findUnique.mockResolvedValue(null);
      prisma.user.create.mockResolvedValue({ id: 'user-1', email: 'a@b.com', name: 'A', role: 'RESTAURANT_OWNER' });

      await service.register({
        name: 'A',
        email: 'a@b.com',
        password: 'password123',
        role: 'RESTAURANT_OWNER' as any,
      });

      expect(prisma.user.create).toHaveBeenCalledWith(
        expect.objectContaining({ data: expect.objectContaining({ role: 'RESTAURANT_OWNER' }) }),
      );
    });
  });

  describe('login', () => {
    it('throws UnauthorizedException when the user does not exist', async () => {
      prisma.user.findUnique.mockResolvedValue(null);

      await expect(
        service.login({ email: 'missing@b.com', password: 'password123' }),
      ).rejects.toThrow(UnauthorizedException);
    });

    it('throws UnauthorizedException when the password does not match', async () => {
      const hashed = await bcrypt.hash('correct-password', 10);
      prisma.user.findUnique.mockResolvedValue({ id: 'user-1', password: hashed });

      await expect(
        service.login({ email: 'a@b.com', password: 'wrong-password' }),
      ).rejects.toThrow(UnauthorizedException);
    });

    it('returns an access token on valid credentials', async () => {
      const hashed = await bcrypt.hash('correct-password', 10);
      prisma.user.findUnique.mockResolvedValue({
        id: 'user-1',
        email: 'a@b.com',
        name: 'A',
        role: 'CUSTOMER',
        password: hashed,
      });

      const result = await service.login({ email: 'a@b.com', password: 'correct-password' });

      expect(result.accessToken).toBe('signed-token');
    });
  });
});
