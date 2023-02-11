import { PrimaryGeneratedColumn, Column, JoinColumn, Entity, JoinTable, OneToMany, OneToOne, ManyToMany } from 'typeorm'
import { CommentsEntity } from './comments.entity'
import { OrdersEntity } from './orders.entity'
import { ProductsEntity } from './product.entity'

@Entity({
  name: 'custommers'
})
export class CustommersEntity {
  @PrimaryGeneratedColumn('uuid', {
    name: 'custommer_id'
  })
  id: string

  @Column()
  first_name: string

  @Column()
  last_name: string

  @Column()
  password: string

  @Column()
  phone: string

  @Column({
    unique: true
  })
  email: string

  @Column({
    nullable: true
  })
  gender: string

  @Column({
    nullable: true
  })
  avatar: string

  @OneToMany(() => OrdersEntity, (order) => order.custommer)
  order: CustommersEntity[]

  @OneToMany(() => CommentsEntity, (comments) => comments.custommer)
  comments: CommentsEntity[]

  @ManyToMany(() => ProductsEntity, (product) => product.customer)
  product: ProductsEntity[]
}
