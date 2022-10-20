import { Injectable, NotFoundException } from '@nestjs/common';
import { Product } from '../../entities/product.entity';

@Injectable()
export class ProductsService {
  private products: Product[] = [
    {
      id: 1,
      name: 'laptop',
      description: 'One description of the product',
      price: 123,
      stock: 1,
      image: 'https//:ruta.com',
    },
  ];

  findAll() {
    return this.products;
  }

  findOne(id: number) {
    const product = this.products.find((el) => el.id == id);
    if (!product) {
      throw new NotFoundException('producto no encontrado');
    }
    return product;
  }

  create() {
    return this.products;
  }

  update() {
    return this.products;
  }

  delete() {
    return this.products;
  }
}
