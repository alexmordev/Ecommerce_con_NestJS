
# Generales

## Archivo Main
nestJS guarda el archivo principal en main

## Live Reload
Ejecuta un server con caracteristica live reload
~~~
npm run start:dev
~~~

## Sin slashes
No son necesarias los slash para las rutas, como se ve en el siguiente decorador:
~~~
  @Get('nueva')
  test(): string {
    return 'nueva ruta/ con varios/slashes';
  }
~~~

## Decoradores anidados
En peticiones que reciben más de un parametro de diferentes rutas puedes hacer esto
~~~
  @Get('categories/:id/products/:productId')
  getCategorie(@Param('id') id: string, @Param('productId') productId: string) {
    return `ProductId: ${id}, productId: ${productId}`;
  }
~~~
la ruta: http://localhost:3000/categories/1/products/12 
devolverá = ProductId: 1, productId: 12

## Errores de rutas dinámicas contra rutas estáticas
Supongamos que tengo dos rutas una que espera un id (dinamica) y otra que devuelve un string (estatica)
~~~
  @Get('categories/:id')
  getCategoriesDinamica(@Param('id') id: string) {
    return `${id}`;
  }
  @Get('categories/estatica')
  getCategoriesEstatica() {
    return `Valor estatico también`;
  }

~~~
Si accedo a la primera el resultado será el esperado, pero en la segunda me devolvera "estatica", la razon es que no está entrando a la segunda ruta, sino que es "interceptada" su funcionalidad por la primera. Para corregir estos errores siempre pon de ultimo lugar tus rutas dinamicas (que reciben valores y cambian su resultado en función a estos)
~~~
  @Get('categories/estatica')
  getCategoriesEstatica() {
    return `Valor estatico también`;
  }
  @Get('categories/:id')
  getCategoriesDinamica(@Param('id') id: string) {
    return `${id}`;
  }
~~~
Ahora devolverá "Valor estatico también"

## Query Params limit y offset
Puedes setear un valor por defecto para tus variables.
~~~
  @Get('products')
  getProducts(
    @Query('limit') limit = 100,
    @Query('offset') offset = 0,
    @Query('brand') brand: string,
  ) {
    return `Limit: ${limit}, Offset: ${offset}, brand: ${brand}`;
  }
~~~
la ruta: http://localhost:3000/products?limit=30&offset=5&brand=cpu
devolverá: Limit: 30, Offset: 5, brand: cpu

## Crea un metodo Post
Puedes crear tu metodo post de la misma manera en que hiciste tu get, solo cambiando el verbo
~~~
 @Post()
  create(@Body() someParam: any) {
    return {
      message: 'registro creado',
      someParam,
    };
  }
}
~~~

## Diferencia entre PUT y PATCH
PUT es para cambiar completamente un registro.
PATCH es para cambiarlo parcialmente

# Inicio del proyecto
Crea tu proyecto 
~~~
nest new projectName
~~~
Crea tus primeros controladores
~~~
  nest g controller controller Name
~~~
Siguiendo el paso anterior crea los modulos order, user, customer, category, product, brand

EJEMPLO....
Product:
~~~
nest g controller product
~~~
product.cotroller.ts
~~~
import { Controller, Get, Query } from '@nestjs/common';

@Controller('products')
export class ProductsController {
  @Get()
  getProducts(
    @Query('limit') limit = 100,
    @Query('offset') offset = 0,
    @Query('brand') brand: string,
  ) {
    return `Limit: ${limit}, Offset: ${offset}, brand: ${brand}`;
  }
}
~~~

# ANKI

## Codigo de Estatus.
Debes importar  HttpStatus, HttpCode de nestJS
~~~
import { HttpStatus, HttpCode  } from '@nestjs/common';
~~~
- el ejemplo devolverá 202
~~~
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
~~~
## Usar Express en NestJS
Importa Res de NestJs
~~~
import { Res } from '@nestjs/common';
~~~
Importa Response de express
~~~
import { Response } from 'express';
~~~
Crea tu ruta
~~~
 @Get(':id')
  @HttpCode(HttpStatus.ACCEPTED)
  GetProduct(@Res() response: Response, @Param('id') id: string) {
    response.status(200).send({
      message: `product ${id}`,
    });
  }
~~~

## Crear un servicio
Para crear un servicio debes correr la siguiente funcion
~~~
  nest g service service name
~~~
Los servicios usan el decorador @Injectable() que es el inyector de dependecia de Solid

## Entidades
Para que las instancias que creas en tus servicios cumplan con las caracteristicas requeridas, debes crear entidades, las entidades te ayudaran a crear instancias de tus objetos más controlada, es uno de los filtros usados.
Crea la carpeta entities, dentro crea product.entity.ts y codifica...
~~~
export class Product {
  id: number;
  name: string;
  description: string;
  price: number;
  stock: number;
  image: string;
}

~~~
Importa esto en tu servicio de producto, como ejemplo puedes usar un arreglo de un producto, tendras que crearlo con las condiciones provistas por entity
~~~
import { Injectable } from '@nestjs/common';
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
}

~~~

## Implementa un servicio

Modifica tu servicio para que reciba los campos que requerirá 
~~~
import { Injectable } from '@nestjs/common';
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

  findOne() {
    return this.products;
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

~~~
Importa tu sevicio en el controlador donde lo usaras, crea una instancia de tu clase con el constructor y por defecto recibirás la inyeccion de depencias, ahora puedes usar todos los metodos definidos en tu servicio
~~~
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
  Res,
} from '@nestjs/common';
import { Delete } from '@nestjs/common/decorators';
import { Response } from 'express';
import { ProductsService } from 'src/services/products/products.service';

@Controller('products')
export class ProductsController {
  constructor(private productService: ProductsService) {}
  @Get(':id')
  @HttpCode(HttpStatus.ACCEPTED)
  GetProduct(@Res() response: Response, @Param('id') id: string) {
    response.status(200).send({
      message: this.productService.findOne(),
    });
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

~~~
## Concepto de Error First y manejo de errores
Primero refactoriza, encapsula o maneja los posibles errores y si todo sale bien, entonces muestra el resultado

Importa NotFoundException, pregunta si tu elemento existe, si no levanta la excepcion
~~~
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

~~~

## Pipes
Tienen dos usos principales, transformar o validar la informacion
Para validar por ejemplo que un valor pasado por parametro en una url es de tipo numerico:
Primero importa tu pipe
~~~
import { ParseIntPipe } from '@nestjs/common';
~~~
Valida en tu controlador que el elemento pasado sea de tipo entero
~~~
findOne(id: number) {
  const product = this.products.find((el) => el.id == id);
  if (!product) {
    throw new NotFoundException('producto no encontrado');
  }
  return product;
}
~~~

## Generar Pipes

~~~
nest g pipe common/parse-int
~~~

Creando un pipe para convertir a enteros
~~~
import {
  ArgumentMetadata,
  BadRequestException,
  Injectable,
  PipeTransform,
} from '@nestjs/common';

@Injectable()
export class ParseIntPipe implements PipeTransform {
  transform(value: string, metadata: ArgumentMetadata) {
    const val = parseInt(value, 10);
    if (isNaN(val)) {
      throw new BadRequestException(` ${val} is not a number  `);
    }
    return value;
  }
}
~~~

Traer el pipe e implementarlo
~~~
import { ParseIntPipe } from 'src/common/parse-int.pipe';
 @Get(':id')
  @HttpCode(HttpStatus.ACCEPTED)
  GetProduct(@Param('id', ParseIntPipe) id: number) {
    return {
      message: this.productService.findOne(id),
    };
  }
~~~

## Data Transfers Objects
Es buena paractica tener nuestros DTO de nuestras entidades porque en ocaciones no quieres insertar en la base de datos cada elemento contenido en los DTOs así puedes manejarlos mejor

## Crea un DTO (Pendiente)
crea la carpeta DTO

## Class Validator
instala la dependencia
~~~
 npm i class-validator class-transformer
~~~
importa los decoradores que usaras
~~~
import {
  IsNotEmpty,
  IsNumber,
  IsPositive,
  IsUrl,
} from 'class-validator/types/decorator/decorators';
~~~
Emplea los decoradores
~~~
export class CreateProductDTO {
  @IsString()
  readonly name: string;

  @IsString()
  readonly description: string;

  @IsNumber()
  readonly price: number;

  @IsNumber()
  @IsPositive()
  @IsNotEmpty()
  readonly stock: number;

  @IsUrl()
  @IsNotEmpty()
  readonly image: string;
}
export class UpdateProductDTO extends PartialType(CreateProductDTO) {}

~~~

## Prohibir que envien elementos no requeridos
Agregamos 
 whitelist: true, para ignorar elementos no requeridos
 forbidNonWhitelisted: true, para alertar al usuario sobre elementos no requeridos
~~~
import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
    }),
  );
  await app.listen(3000);
}
bootstrap();

~~~