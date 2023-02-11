import { PrimaryGeneratedColumn, Column, Entity, OneToMany } from 'typeorm'
import { SubCategoryEntity } from './sub_category.entity'

@Entity({
  name: 'categories'
})
export class CategoriesEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string

  @Column()
  title: string

  @OneToMany(() => SubCategoryEntity, (sub_category) => sub_category.category)
  sub_category: SubCategoryEntity[]
}
