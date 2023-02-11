import {
  PrimaryGeneratedColumn,
  Column,
  Entity,
  ManyToOne,
  JoinTable,
  OneToMany,
  ManyToMany,
  OneToOne,
  JoinColumn
} from 'typeorm'
import { CommentsEntity } from './comments.entity'
import { CustommersEntity } from './custommers.entity'
import { RatingEntity } from './rating.entity'
import { OrdersEntity } from './orders.entity'
import { SubSubCategoryEntity } from './sub_sub_category.entity'

@Entity({
  name: 'products'
})
export class ProductsEntity {
  @PrimaryGeneratedColumn('uuid', {
    name: 'product_id'
  })
  id: string

  @Column()
  title: string

  @Column('decimal', {
    nullable: true
  })
  price: number

  @Column('decimal', { default: 0 })
  discont_price: number

  @Column({
    nullable: true
  })
  brand: string

  @Column({
    nullable: true
  })
  size: string

  @Column({
    nullable: true
  })
  netto: string

  @Column({
    nullable: true
  })
  author: string

  @Column({
    nullable: true
  })
  description: string

  @Column({
    nullable: true
  })
  color: string

  @Column()
  made_in: string

  @Column()
  img: string

  @Column({
    nullable: true
  })
  img1: string

  @Column({
    nullable: true
  })
  img2: string

  @Column('boolean', { default: true })
  on_sale: boolean

  @Column('int', { default: 0 })
  discont: number

  @Column('int', { default: 0 })
  sold_count: number

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  time: string

  @ManyToOne(() => SubSubCategoryEntity, (subSubCategory) => subSubCategory.products)
  subSubCategory: SubSubCategoryEntity

  @OneToOne(() => RatingEntity, (rate) => rate.product)
  rate: RatingEntity[]

  @OneToMany(() => OrdersEntity, (order) => order.product)
  order: OrdersEntity[]

  @OneToMany(() => CommentsEntity, (comments) => comments.product, {
    onDelete: 'CASCADE',
    cascade: true
  })
  comments: CommentsEntity[]

  @ManyToMany(() => CustommersEntity, (customer) => customer.product)
  @JoinTable()
  customer: CustommersEntity
}
