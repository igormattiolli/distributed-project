import { ProductStatus } from "src/entities/Product.entity";

export class ProductCycleResponse {
    id : number;
    status : ProductStatus;
}

export class ProductGenericResponse {
    id : number;
}