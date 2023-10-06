import { Body, Controller, Delete, Get, Param, Patch, Post } from '@nestjs/common';
import { ProductService } from './product.service';
import { Product } from 'src/entities/Product.entity';
import { CreateProductDto, UpdateProductDto } from './models/product.dto';

@Controller('/products')
export class ProductController {
  constructor(private readonly service: ProductService) {}

  @Get('/')
  async getProducts(): Promise<Array<Product>>{
    return this.service.getProducts();
  }

  @Get('/:id')
  async getProduct(
    @Param('id') id : number): Promise<Product>{
    return this.service.getProduct(id);
  }

  @Delete('/:id')
  async deleteProduct(
    @Param('id') id : number): Promise<Product>{
    return this.service.deleteProduct(id);
  }

  @Post('/')
  async createProduct(@Body() dto : CreateProductDto) {
    return this.service.createProduct(dto);
  }

  @Patch('/:id')
  async updateProduct(
    @Param('id') id : number,
    @Body() dto : UpdateProductDto) {
    return this.service.updateProduct(id, dto);
  }

}
