import { NextFunction, Request, Response } from 'express'
import dataSource from '../../config/ormconfig'
import { SubCategoryEntity } from '../../entities/sub_category.entity'
import { ErrorHandler } from '../../exeptions/erroHandler'

export const getSubCategories = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const subCategories = await dataSource.getRepository(SubCategoryEntity).find({
      relations: { sub_sub_category: true }
    })
    res.status(200).json({
      data: subCategories,
      status: 200
    })
  } catch (error: any) {
    next(new ErrorHandler(error, 500))
  }
}

export const getSubCategoriesById = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const { subId }: any = req.params
    if (subId) {
      const subCategories = await dataSource
        .getRepository(SubCategoryEntity)
        .find({
          where: { id: subId },
          relations: {
            sub_sub_category: {
              products: true
            }
          }
        })
        .catch((err: ErrorHandler) => next(new ErrorHandler(err.message, 503)))

      res.status(200).json({
        data: subCategories,
        status: 200
      })
    }
  } catch (error: unknown) {
    next(new ErrorHandler(error as string, 500))
  }
}

export const createSubCategory = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const { title, categoryId } = req.filtered
    console.log(title)
    console.log(categoryId)

    const category: any = categoryId

    if (typeof title === 'string') {
      const newSubCategory = await dataSource
        .getRepository(SubCategoryEntity)
        .createQueryBuilder()
        .insert()
        .into(SubCategoryEntity)
        .values({ title, category })
        .returning(['*'])
        .execute()

      res.status(201).json({
        data: newSubCategory,
        status: 201
      })
    }
  } catch (error: any) {
    next(new ErrorHandler(error.message, 500))
  }
}

export const updateSubCategory = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const { id } = req.params
    const { title, categoryId } = req.filtered

    const category: any = categoryId

    const updateCategory = await dataSource
      .createQueryBuilder()
      .update(SubCategoryEntity)
      .set({ title, category })
      .where({ id })
      .returning(['*'])
      .execute()

    if (updateCategory) {
      res.status(200).json({
        message: 'Updated succesfuly',
        status: 200
      })
    }
  } catch (error) {
    next(new ErrorHandler(error as string, 500))
  }
}
export const deleteSubCategory = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const { id } = req.params

    const updateCategory = await dataSource
      .createQueryBuilder()
      .delete()
      .from(SubCategoryEntity)
      .where({ id })
      .execute()

    console.log(updateCategory)
    res.status(200).json({
      message: 'Deleted succesfuly',
      status: 200
    })
  } catch (error) {
    next(new ErrorHandler(error as string, 500))
  }
}
