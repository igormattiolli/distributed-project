import { Injectable } from '@nestjs/common';
import { Product, ProductStatus } from 'src/entities/Product.entity';
import { EntityManager, Not } from 'typeorm';
import { ProductsGateway } from './product.gateway';
import { ProductCycleResponse } from './models/products.response';

@Injectable()
export class ProductCycleService {

  constructor(
    private entityManager : EntityManager,
    private gateway : ProductsGateway
  ) {
    this.runCycle()
  }

  private async runCycle() : Promise<void> {
   const cycledProducts = await this.incrementProductStatus();
   this.gateway.changeProductStatus(cycledProducts)
   setTimeout(() => {
    this.runCycle();
   }, 60000);
   return;
  }

  private async incrementProductStatus() : Promise<Array<ProductCycleResponse>> {
    const products = await this.entityManager.find(Product, {
        where : {
            status : Not(ProductStatus.DELIVERED)
        }
    })
    let cycledProducts : Array<Product> = [];
    for (let product of products) {
        const oldStatus = product.status;
        let newStatus : ProductStatus;
        switch (oldStatus) {
            case ProductStatus.ORDERED:
                newStatus = ProductStatus.SHIPPED;
                break;
            case ProductStatus.SHIPPED:
                newStatus = ProductStatus.OUT_FOR_DELIVERY
                break;
            case ProductStatus.OUT_FOR_DELIVERY:
                newStatus = ProductStatus.DELIVERED;
                break;
        }
        product.status = newStatus;
        await this.entityManager.save(product)
        cycledProducts.push(product);
    }
    return cycledProducts.map((product) => {
      return {
        id : product.id,
        status : product.status
      }
    });
  }

}
