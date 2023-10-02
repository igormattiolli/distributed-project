import { Module } from '@nestjs/common';
import { ProductsGateway } from './product.gateway';
import { ProductCycleService } from './product-cycle.service';

@Module({
  imports: [
],
  controllers: [],
  providers: [
    ProductCycleService,
    ProductsGateway
  ],
})
export class ProductModule {}
