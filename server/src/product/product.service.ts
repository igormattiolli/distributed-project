import { Injectable, NotFoundException } from '@nestjs/common';
import { Product } from 'src/entities/Product.entity';
import { EntityManager } from 'typeorm';
import { CreateProductDto, UpdateProductDto } from './models/product.dto';

@Injectable()
export class ProductService {

  constructor(
    private entityManager : EntityManager
  ) {

  }

  async getProducts(): Promise<Array<Product>>{
    return this.entityManager.find(Product, {
      order : {
        updatedAt : "DESC"
      }
    })
  }

  async getProduct(id : number): Promise<Product>{
    const product = await this.entityManager.findOne(Product, {
      where : {
        id : id
      }
    })
    if(!product) {
      throw new NotFoundException("Product not found");
    }
    return product;
  }

  async deleteProduct(id : number): Promise<Product>{
    const product = await this.getProduct(id);
    await this.entityManager.softDelete(Product, product);
    return product;
  }

  async updateProduct(id : number, dto : UpdateProductDto): Promise<Product>{
    const product = await this.getProduct(id);
    await this.entityManager.save(Product, this.entityManager.create(Product, {
      ...product,
      ...dto
    }));
    return product;
  }

  async createProduct(dto : CreateProductDto) {
    return this.entityManager.save(Product, this.entityManager.create(Product, {
      ...dto
    }))
  }


}
