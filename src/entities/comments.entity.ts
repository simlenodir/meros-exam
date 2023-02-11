import { PrimaryGeneratedColumn, Column, Entity, ManyToOne, OneToOne } from 'typeorm'
import { CustommersEntity } from './custommers.entity'
import { ProductsEntity } from './product.entity'

@Entity({
  name: 'comments'
})
export class CommentsEntity {
  @PrimaryGeneratedColumn('uuid', {
    name: 'comment_id'
  })
  id: string

  @Column()
  title: string

  @ManyToOne(() => CustommersEntity, (custommer) => custommer.comments)
  custommer: CustommersEntity

  @ManyToOne(() => ProductsEntity, (product) => product.comments)
  product: ProductsEntity
}
