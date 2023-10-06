import { IsEnum, IsNotEmpty, IsNumber, IsOptional, IsString } from "class-validator";
import { ProductStatus } from "src/entities/Product.entity";

export class CreateProductDto {
    @IsNotEmpty()
    @IsString()
    name : string

    @IsOptional()
    @IsEnum(ProductStatus)
    status : ProductStatus
}

export class UpdateProductDto extends CreateProductDto {

}