import { PrimaryGeneratedColumn, Column, Entity, ManyToOne, OneToMany } from 'typeorm'
import { ProductsEntity } from './product.entity'
import { SubCategoryEntity } from './sub_category.entity'

@Entity({
  name: 'sub_sub_categories'
})
export class SubSubCategoryEntity {
  @PrimaryGeneratedColumn('uuid', {
    name: 'sub_sub_id'
  })
  id: string

  @Column()
  title: string

  @ManyToOne(() => SubCategoryEntity, (sub_category) => sub_category.sub_sub_category)
  sub_category: SubCategoryEntity

  @OneToMany(() => ProductsEntity, (products) => products.subSubCategory)
  products: ProductsEntity[]
}
