import { Controller, Get, Param } from '@nestjs/common';

@Controller('categories')
export class CategoriesController {
  @Get('estatica')
  getCategoriesEstatica() {
    return {
      message: `Valor estatico también`,
    };
  }

  @Get(':id')
  getCategoriesDinamica(@Param('id') id: string) {
    return {
      message: `${id}`,
    };
  }

  @Get(':id/products/:productId')
  getCategories(
    @Param('id') id: string,
    @Param('productId') productId: string,
  ) {
    return {
      message: `ProductId: ${id}, productId: ${productId}`,
    };
  }
}
