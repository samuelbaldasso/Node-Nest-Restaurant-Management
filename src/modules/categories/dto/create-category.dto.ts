import { IsString, IsNotEmpty } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateCategoryDto {
  @ApiProperty({ example: 'Burgers' })
  @IsString()
  @IsNotEmpty()
  name: string;
}
