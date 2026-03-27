import { Controller, Get, Post, Patch, Delete, Body, Param, UseGuards } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiBearerAuth } from '@nestjs/swagger';
import { ProductsService } from './products.service';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { JwtAuthGuard } from '../../common/guards/jwt-auth.guard';
import { CurrentUser } from '../../common/decorators/current-user.decorator';

@ApiTags('Products')
@Controller('categories/:categoryId/products')
@UseGuards(JwtAuthGuard)
@ApiBearerAuth()
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  @Get()
  @ApiOperation({ summary: 'Get all products for a category' })
  findAll(@Param('categoryId') categoryId: string) {
    return this.productsService.findAll(categoryId);
  }

  @Post()
  @ApiOperation({ summary: 'Create a new product' })
  create(
    @Param('categoryId') categoryId: string,
    @CurrentUser('id') userId: string,
    @Body() createProductDto: CreateProductDto,
  ) {
    return this.productsService.create(categoryId, userId, createProductDto);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get product by ID' })
  findOne(@Param('id') id: string) {
    return this.productsService.findOne(id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Update product' })
  update(
    @Param('id') id: string,
    @CurrentUser('id') userId: string,
    @Body() updateProductDto: UpdateProductDto,
  ) {
    return this.productsService.update(id, userId, updateProductDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete product' })
  remove(@Param('id') id: string, @CurrentUser('id') userId: string) {
    return this.productsService.remove(id, userId);
  }
}
