import { PrismaService } from '../../prisma/prisma.service';
export declare class HealthController {
    private prisma;
    constructor(prisma: PrismaService);
    check(): Promise<{
        status: string;
        timestamp: string;
        database: string;
        error?: undefined;
    } | {
        status: string;
        timestamp: string;
        database: string;
        error: any;
    }>;
}
