import {
  Body,
  Controller,
  Get,
  Param,
  Patch,
  Post,
  Query,
  HttpStatus,
  HttpCode,
} from '@nestjs/common';
import { Delete } from '@nestjs/common/decorators';
import { ProductsService } from 'src/services/products/products.service';
import { ParseIntPipe } from 'src/common/parse-int.pipe';
import { CreateProductDTO } from 'src/dto/products.dto';

@Controller('products')
export class ProductsController {
  constructor(private productService: ProductsService) {}
  @Get(':id')
  @HttpCode(HttpStatus.ACCEPTED)
  GetProduct(@Param('id', ParseIntPipe) id: number) {
    return {
      message: this.productService.findOne(id),
    };
  }

  @Get()
  @HttpCode(HttpStatus.ACCEPTED)
  getProducts(
    @Query('limit') limit = 100,
    @Query('offset') offset = 0,
    @Query('brand') brand: string,
  ) {
    return {
      message: `Limit: ${limit}, Offset: ${offset}, brand: ${brand}`,
    };
  }
  @Post()
  create(@Body() someParam: any) {
    return {
      message: 'registro creado',
      someParam,
    };
  }
  @Patch(':id')
  updateProduct(@Param('id') id: number, @Body() someParam: any) {
    return {
      id,
      someParam,
    };
  }
  @Delete(':id')
  deleteProduct(@Param('id') id: number) {
    return {
      message: `registro eliminado: ${id}`,
    };
  }
}
