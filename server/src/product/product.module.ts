import { Module } from '@nestjs/common';
import { ProductGateway } from './product.gateway';
import { ProductCycleService } from './product-cycle.service';
import { ProductService } from './product.service';
import { ProductController } from './product.controller';

@Module({
  imports: [
],
  controllers: [
    ProductController
  ],
  providers: [
    ProductCycleService,
    ProductGateway,
    ProductService
  ],
})
export class ProductModule {}
