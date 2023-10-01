import {
    Column,
    CreateDateColumn,
    DeleteDateColumn,
    Entity,
    Index,
    PrimaryGeneratedColumn,
    UpdateDateColumn,
} from 'typeorm';

export enum ProductStatus {
    ORDERED = "ordered",
    SHIPPED = "shipped",
    OUT_FOR_DELIVERY = "out_for_delivery",
    DELIVERED = "delivered"
}

@Entity('product', { schema: 'public' })
export class Product {

    @PrimaryGeneratedColumn({ type: 'integer', name: 'id' })
    id: number;

    @Column('text', { name: 'name' })
    name: string;

    @CreateDateColumn({ name: 'createdat', type: 'timestamp with time zone' })
    createdAt: Date;

    @UpdateDateColumn({ name: 'updatedat', type: 'timestamp with time zone' })
    updatedAt: Date;

    @DeleteDateColumn({ name: 'deletedat', type: 'timestamp with time zone' })
    deletedAt: Date;

    @Column({enum : true, enumName: "product_status_enum"})
    status: ProductStatus;
}
