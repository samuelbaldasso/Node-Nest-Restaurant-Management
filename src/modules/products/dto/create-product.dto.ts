import { IsString, IsNotEmpty, IsOptional, IsNumber, Min } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateProductDto {
  @ApiProperty({ example: 'Whopper' })
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiProperty({ example: 'Delicious beef burger', required: false })
  @IsOptional()
  @IsString()
  description?: string;

  @ApiProperty({ example: 29.90 })
  @IsNumber()
  @Min(0)
  price: number;

  @ApiProperty({ example: 'https://example.com/burger.jpg', required: false })
  @IsOptional()
  @IsString()
  imageUrl?: string;
}
