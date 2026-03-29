import { UsersService } from './users.service';
import { UpdateUserDto } from './dto/update-user.dto';
export declare class UsersController {
    private readonly usersService;
    constructor(usersService: UsersService);
    findAll(): Promise<{
        name: string;
        id: string;
        createdAt: Date;
        updatedAt: Date;
        email: string;
        role: import("@prisma/client").$Enums.Role;
        avatar: string;
    }[]>;
    getProfile(userId: string): Promise<{
        name: string;
        id: string;
        createdAt: Date;
        updatedAt: Date;
        email: string;
        role: import("@prisma/client").$Enums.Role;
        avatar: string;
    }>;
    updateProfile(userId: string, updateUserDto: UpdateUserDto): Promise<{
        name: string;
        id: string;
        createdAt: Date;
        updatedAt: Date;
        email: string;
        role: import("@prisma/client").$Enums.Role;
        avatar: string;
    }>;
    findOne(id: string): Promise<{
        name: string;
        id: string;
        createdAt: Date;
        updatedAt: Date;
        email: string;
        role: import("@prisma/client").$Enums.Role;
        avatar: string;
    }>;
    update(id: string, updateUserDto: UpdateUserDto): Promise<{
        name: string;
        id: string;
        createdAt: Date;
        updatedAt: Date;
        email: string;
        role: import("@prisma/client").$Enums.Role;
        avatar: string;
    }>;
    remove(id: string): Promise<{
        name: string;
        id: string;
        createdAt: Date;
        updatedAt: Date;
        email: string;
        password: string | null;
        role: import("@prisma/client").$Enums.Role;
        googleId: string | null;
        avatar: string | null;
    }>;
}
