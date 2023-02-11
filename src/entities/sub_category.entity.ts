import { PrimaryGeneratedColumn, Column, Entity, ManyToOne, OneToMany } from 'typeorm'
import { CategoriesEntity } from './category.entity'
import { SubSubCategoryEntity } from './sub_sub_category.entity'

@Entity({
  name: 'sub_categories'
})
export class SubCategoryEntity {
  @PrimaryGeneratedColumn('uuid', {
    name: 'sub_id'
  })
  id: string

  @Column()
  title: string

  @ManyToOne(() => CategoriesEntity, (category) => category.sub_category)
  category: CategoriesEntity

  @OneToMany(() => SubSubCategoryEntity, (sub_sub_category) => sub_sub_category.sub_category)
  sub_sub_category: SubSubCategoryEntity[]
}
