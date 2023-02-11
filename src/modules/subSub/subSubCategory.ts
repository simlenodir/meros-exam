import { NextFunction, Request, Response } from 'express'
import dataSource from '../../config/ormconfig'
import { SubCategoryEntity } from '../../entities/sub_category.entity'
import { SubSubCategoryEntity } from '../../entities/sub_sub_category.entity'
import { ErrorHandler } from '../../exeptions/erroHandler'

export const getSubSubCategories = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const subSubCategories = await dataSource.getRepository(SubSubCategoryEntity).find({
      relations: { products: true }
    })
    res.status(200).json({
      data: subSubCategories,
      status: 200
    })
  } catch (error: any) {
    next(new ErrorHandler(error, 500))
  }
}

export const getSubSubCategoriesById = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const { subSubId }: any = req.params
    if (subSubId) {
      const subSubCategories = await dataSource
        .getRepository(SubSubCategoryEntity)
        .find({
          where: { id: subSubId },
          relations: {
            products: true
          }
        })
        .catch((err: ErrorHandler) => next(new ErrorHandler(err.message, 503)))

      res.status(200).json({
        data: subSubCategories,
        status: 200
      })
    }
  } catch (error: unknown) {
    next(new ErrorHandler(error as string, 500))
  }
}

export const createSubSubCategory = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const { title, subCategoryId } = req.filtered

    const sub_category: any = subCategoryId

    if (typeof title === 'string') {
      const newSubSubCategory = await dataSource
        .getRepository(SubSubCategoryEntity)
        .createQueryBuilder()
        .insert()
        .into(SubSubCategoryEntity)
        .values({ title, sub_category })
        .returning(['*'])
        .execute()

      // console.log(newSubSubCategory);

      res.status(200).json({
        data: newSubSubCategory,
        status: 200
      })
    }
  } catch (error: any) {
    next(new ErrorHandler(error.message, 500))
  }
}

export const updateSubSubCategory = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const { id } = req.params
    const { title, subCategoryId } = req.filtered
    console.log(title)
    console.log(subCategoryId)

    const sub_category: any = subCategoryId

    const updateCategory = await dataSource
      .createQueryBuilder()
      .update(SubSubCategoryEntity)
      .set({ title, sub_category })
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
export const deleteSubSubCategory = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const { id } = req.params
    console.log(id)

    const deletedSubSubCategory = await dataSource
      .createQueryBuilder()
      .delete()
      .from(SubSubCategoryEntity)
      .where({ id })
      .execute()

    console.log(deletedSubSubCategory)
    res.status(200).json({
      message: 'Deleted succesfuly',
      status: 200
    })
  } catch (error) {
    next(new ErrorHandler(error as string, 500))
  }
}
