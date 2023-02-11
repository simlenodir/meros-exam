import { PrimaryGeneratedColumn, Column, Entity, ManyToOne, OneToOne, JoinColumn } from 'typeorm'
import { CustommersEntity } from './custommers.entity'
import { ProductsEntity } from './product.entity'

@Entity({
  name: 'rate'
})
export class RatingEntity {
  @PrimaryGeneratedColumn('uuid', {
    name: 'rate_id'
  })
  id: string

  @Column({ nullable: true })
  stars: number

  @Column({ nullable: true })
  count_stars: number

  @Column('decimal', { nullable: true })
  avarage_stars: number

  @OneToOne(() => ProductsEntity, (product) => product.rate)
  @JoinColumn()
  product: ProductsEntity
}
