import { Provider } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';

export const databaseProviders: Provider[] = [
  {
    provide: 'PRISMA_CONNECTION',
    useFactory: async (): Promise<PrismaClient> => {
      const prisma = new PrismaClient({
        datasources: {
          db: {
            url: process.env.DATABASE_URL,
          },
        },
      });

      await prisma.$connect();
      return prisma;
    },
  },
];
