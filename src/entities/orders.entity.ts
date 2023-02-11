import { PrimaryGeneratedColumn, Column, Entity, ManyToOne, OneToOne, JoinColumn } from 'typeorm'
import { CustommersEntity } from './custommers.entity'
import { ProductsEntity } from './product.entity'

@Entity({
  name: 'orders'
})
export class OrdersEntity {
  @PrimaryGeneratedColumn('uuid', {
    name: 'order_id'
  })
  id: string

  @Column({ nullable: true, default: 0 })
  count: number

  @ManyToOne(() => CustommersEntity, (custommer) => custommer.order)
  custommer: CustommersEntity

  @ManyToOne(() => ProductsEntity, (product) => product.order)
  @JoinColumn()
  product: ProductsEntity
}
