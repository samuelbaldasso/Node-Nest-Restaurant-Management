import { IsEmail, IsNotEmpty, IsString, MinLength, IsOptional, IsIn } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { Role } from '@prisma/client';

const SELF_REGISTRABLE_ROLES = [Role.CUSTOMER, Role.RESTAURANT_OWNER] as const;

export class RegisterDto {
  @ApiProperty({ example: 'John Doe' })
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiProperty({ example: 'user@example.com' })
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @ApiProperty({ example: 'password123' })
  @IsString()
  @IsNotEmpty()
  @MinLength(6)
  password: string;

  @ApiProperty({ enum: SELF_REGISTRABLE_ROLES, required: false })
  @IsOptional()
  @IsIn(SELF_REGISTRABLE_ROLES)
  role?: typeof SELF_REGISTRABLE_ROLES[number];
}
