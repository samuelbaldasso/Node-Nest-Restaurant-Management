import { IsString, IsNotEmpty, IsOptional } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateRestaurantDto {
  @ApiProperty({ example: 'Burger King' })
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiProperty({ example: 'Best burgers in town', required: false })
  @IsOptional()
  @IsString()
  description?: string;

  @ApiProperty({ example: '123 Main St' })
  @IsString()
  @IsNotEmpty()
  address: string;

  @ApiProperty({ example: 'https://example.com/image.jpg', required: false })
  @IsOptional()
  @IsString()
  imageUrl?: string;
}
