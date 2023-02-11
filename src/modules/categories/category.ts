import { NextFunction, Request, Response } from 'express'
import dataSource from '../../config/ormconfig'
import { CategoriesEntity } from '../../entities/category.entity'
import { ErrorHandler } from '../../exeptions/erroHandler'

export const getCategories = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const categories = await dataSource
      .getRepository(CategoriesEntity)
      .find({
        // relations: {
        //   sub_category: {
        //     sub_sub_category: {
        //       products: true,
        //     },
        //   },
        // },
      })
      .catch((err: ErrorHandler) => next(new ErrorHandler(err.message, 503)))

    res.status(200).json({
      data: categories,
      status: 200
    })
  } catch (error: unknown) {
    next(new ErrorHandler(error as string, 500))
  }
}

export const getCategoriesById = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const { categoryId }: any = req.params
    if (categoryId) {
      const categories = await dataSource
        .getRepository(CategoriesEntity)
        .find({
          where: { id: categoryId },
          relations: {
            sub_category: {
              sub_sub_category: {
                products: true
              }
            }
          }
        })
        .catch((err: ErrorHandler) => next(new ErrorHandler(err.message, 503)))

      res.status(200).json({
        data: categories,
        status: 200
      })
    }
  } catch (error: unknown) {
    next(new ErrorHandler(error as string, 500))
  }
}

export const createCategory = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const { title } = req.filtered

    if (typeof title === 'string') {
      const newCategory = await dataSource
        .getRepository(CategoriesEntity)
        .createQueryBuilder()
        .insert()
        .into(CategoriesEntity)
        .values({ title })
        .returning(['*'])
        .execute()
        .catch((err: ErrorHandler) => next(new ErrorHandler(err.message, 503)))

      res.status(200).json({
        data: newCategory,
        message: 'Created succesfulluy',
        status: 200
      })
    }
  } catch (error: unknown) {
    next(new ErrorHandler(error as string, 500))
  }
}

export const updateCategory = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const { title } = req.filtered
    const { id } = req.params

    const updateCategory = await dataSource
      .createQueryBuilder()
      .update(CategoriesEntity)
      .set({ title })
      .where({ id })
      .returning(['*'])
      .execute()
      .catch((err: ErrorHandler) => next(new ErrorHandler(err.message, 503)))

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

export const deleteCategory = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const { id } = req.params

    const updateCategory = await dataSource
      .createQueryBuilder()
      .delete()
      .from(CategoriesEntity)
      .where({ id })
      .execute()
      .catch((err: ErrorHandler) => next(new ErrorHandler(err.message, 503)))

    console.log(updateCategory)
    res.status(200).json({
      message: 'Deleted succesfuly',
      status: 200
    })
  } catch (error) {
    next(new ErrorHandler(error as string, 500))
  }
}
