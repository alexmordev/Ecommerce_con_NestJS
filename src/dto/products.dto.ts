import { IsString } from 'class-validator';
import {
  IsNotEmpty,
  IsNumber,
  IsPositive,
  IsUrl,
} from 'class-validator/types/decorator/decorators';
import { PartialType } from '@nestjs/mapped-types';
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
