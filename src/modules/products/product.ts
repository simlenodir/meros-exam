import e, { NextFunction, Request, Response } from 'express'
import dataSource from '../../config/ormconfig'
import { Client } from '../../config/redis.config'
import { ProductsEntity } from '../../entities/product.entity'
import { ErrorHandler } from '../../exeptions/erroHandler'

export const getAllProducts = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const client = await Client()
    const cachProducts = await client?.get('allProducts')

    if (!cachProducts) {
      const products: ProductsEntity[] = await dataSource.getRepository(ProductsEntity).find()

      const resultProduct: ProductsEntity[] = products

      await client?.setEx('allProducts', 15, JSON.stringify(resultProduct))

      res.status(200).json({
        data: resultProduct,
        status: 200
      })
    }
    if (cachProducts) {
      res.status(200).json({
        data: JSON.parse(cachProducts),
        status: 200
      })
    }
  } catch (error: unknown) {
    console.log(error)
    next(new ErrorHandler(error as string, 500))
  }
}

export const getProducts = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const { page, limit } = req.query as any
    const page1 = page ? page : 1
    const limit1 = limit ? limit : 10

    const client = await Client()
    const cachPaginate = await client?.get('paginatePruducts')

    if (!cachPaginate) {
      const products: ProductsEntity[] = await dataSource.getRepository(ProductsEntity).find()

      await client?.setEx('paginatePruducts', 15, JSON.stringify(products))

      const result = products.slice((page1 - 1) * limit1, limit1 * page1)
      res.json({
        data: result,
        status: 200
      })
    }
    if (cachPaginate) {
      const data = JSON.parse(cachPaginate)

      const result = data.slice((page1 - 1) * limit1, limit1 * page1)

      res.json({
        data: result,
        status: 200
      })
    }
  } catch (error: unknown) {
    console.log(error)
    next(new ErrorHandler(error as string, 500))
  }
}

export const getProductsById = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const { productId }: any = req.params
    if (productId) {
      const allProducts = await dataSource
        .getRepository(ProductsEntity)
        .find({
          where: { id: productId },
          relations: {
            comments: {
              custommer: true
            },
            rate: true
          },
          select: {
            comments: {
              title: true,
              custommer: {
                first_name: true,
                last_name: true,
                avatar: true
              }
            }
          }
        })
        .catch((err: ErrorHandler) => next(new ErrorHandler(err.message, 503)))

      if (allProducts) {
        res.status(200).json({
          data: allProducts,
          status: 200
        })
      }
    }
  } catch (error: unknown) {
    next(new ErrorHandler(error as string, 500))
  }
}

export const createProduct = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const {
      subSubCategory,
      title,
      price,
      rate,
      brand,
      size,
      netto,
      author,
      description,
      color,
      made_in,
      img,
      img1,
      img2
    } = req.filtered as any

    const newProduct = await dataSource
      .getRepository(ProductsEntity)
      .createQueryBuilder()
      .insert()
      .into(ProductsEntity)
      .values({
        title,
        price,
        rate,
        brand,
        size,
        netto,
        author,
        description,
        color,
        made_in,
        img,
        img1,
        img2,
        subSubCategory
      })
      .execute()
      .catch((err: ErrorHandler) => next(new ErrorHandler(err.message, 503)))

    res.status(200).json({
      data: newProduct,
      status: 200
    })
  } catch (error: unknown) {
    next(new ErrorHandler(error as string, 500))
  }
}

export const updateProduct = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const { id } = req.params

    const {
      subSubCategory,
      title,
      price,
      rate,
      brand,
      size,
      netto,
      author,
      description,
      color,
      made_in,
      img,
      img1,
      img2,
      likes
    } = req.filtered as any

    const updatedProduct = await dataSource
      .getRepository(ProductsEntity)
      .createQueryBuilder()
      .update(ProductsEntity)
      .set({
        title,
        price,
        rate,
        brand,
        size,
        netto,
        author,
        description,
        color,
        made_in,
        img,
        img1,
        img2,
        subSubCategory
      })
      .where({ id })
      .execute()
      .catch((err: ErrorHandler) => next(new ErrorHandler(err.message, 503)))

    if (updatedProduct) {
      res.status(200).json({
        message: 'Updated succesfully',
        status: 200
      })
    }
  } catch (error: unknown) {
    next(new ErrorHandler(error as string, 500))
  }
}

export const deletedProduct = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const { id } = req.params

    const deletedProduct = await dataSource
      .createQueryBuilder()
      .delete()
      .from(ProductsEntity)
      .where({ id })
      .execute()
      .catch((err: ErrorHandler) => next(new ErrorHandler(err.message, 503)))

    res.status(200).json({
      message: 'Deleted succesfuly',
      status: 200
    })
  } catch (error) {
    next(new ErrorHandler(error as string, 500))
  }
}
