import { NextFunction, Request, Response } from 'express'
import dataSource from '../../config/ormconfig'
import { Client } from '../../config/redis.config'
import { ProductsEntity } from '../../entities/product.entity'
import { RatingEntity } from '../../entities/rating.entity'
import { ErrorHandler } from '../../exeptions/erroHandler'

export const SortingBySoldProduct = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const client = await Client()
    const cachSoldProducts = (await client?.get('soldproducts')) as any

    if (!cachSoldProducts) {
      const sortedBySoldProducts: ProductsEntity[] = (await dataSource
        .getRepository(ProductsEntity)
        .find({
          order: {
            sold_count: 'DESC'
          },
          select: {
            title: true,
            price: true,
            discont: true,
            sold_count: true,
            discont_price: true,
            img: true,
            made_in: true
          }
        })
        .catch((err: ErrorHandler) => next(new ErrorHandler(err.message, 500)))) as any
      await client?.setEx('soldproducts', 15, JSON.stringify(sortedBySoldProducts))

      res.status(200).json({
        data: sortedBySoldProducts,
        status: 200
      })
    }
    if (cachSoldProducts) {
      res.status(200).json({
        data: JSON.parse(cachSoldProducts),
        status: 200
      })
    }
  } catch (error) {
    console.log(error)
  }
}

export const getDiscontProducts = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const client = await Client()
    const cachDiscont = (await client?.get('discontProducts')) as any

    if (!cachDiscont) {
      const products: ProductsEntity[] = await dataSource.getRepository(ProductsEntity).find({
        order: {
          discont: 'DESC'
        },
        select: {
          title: true,
          price: true,
          discont: true,
          sold_count: true,
          discont_price: true,
          img: true,
          made_in: true
        }
      })
      await client?.setEx('discontProducts', 15, JSON.stringify(products))

      res.status(200).json({
        data: products,
        status: 200
      })
    }
    if (cachDiscont) {
      res.status(200).json({
        data: JSON.parse(cachDiscont),
        status: 200
      })
    }
  } catch (error: unknown) {
    next(new ErrorHandler(error as string, 500))
  }
}

export const getRateProducts = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const client = await Client()
    const cachRateProduct = (await client?.get('rateProducts')) as any

    if (!cachRateProduct) {
      const statistic = await dataSource.getRepository(RatingEntity).find({
        relations: { product: true },
        order: {
          avarage_stars: 'DESC'
        },
        select: {
          product: {
            title: true,
            price: true,
            discont: true,
            sold_count: true,
            discont_price: true,
            img: true,
            made_in: true
          }
        }
      })
      await client?.setEx('rateProducts', 15, JSON.stringify(statistic))

      res.status(200).json({
        data: statistic,
        status: 200
      })
    }
    if (cachRateProduct) {
      res.status(200).json({
        data: JSON.parse(cachRateProduct),
        status: 200
      })
    }
  } catch (error: unknown) {
    next(new ErrorHandler(error as string, 500))
  }
}

export const getNewProducts = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const client = await Client()
    const cachNewProduct = (await client?.get('newProducts')) as any

    if (!cachNewProduct) {
      const products: ProductsEntity[] = await dataSource.getRepository(ProductsEntity).find({
        relations: { rate: true },
        order: {
          time: 'DESC'
        },
        select: {
          title: true,
          price: true,
          discont: true,
          sold_count: true,
          discont_price: true,
          img: true,
          made_in: true,
          time: true
        }
      })
      await client?.setEx('newProducts', 15, JSON.stringify(products))

      res.status(200).json({
        data: products,
        status: 200
      })
    }
    if (cachNewProduct) {
      res.status(200).json({
        data: JSON.parse(cachNewProduct),
        status: 200
      })
    }
  } catch (error: unknown) {
    next(new ErrorHandler(error as string, 500))
  }
}

export const getOldProducts = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const client = await Client()
    const cachOldProduct = (await client?.get('newProducts')) as any

    if (!cachOldProduct) {
      const products: ProductsEntity[] = await dataSource.getRepository(ProductsEntity).find({
        relations: { rate: true },
        order: {
          time: 'ASC'
        },
        select: {
          title: true,
          price: true,
          discont: true,
          sold_count: true,
          discont_price: true,
          img: true,
          made_in: true,
          time: true
        }
      })
      await client?.setEx('newProducts', 15, JSON.stringify(products))

      res.status(200).json({
        data: products,
        status: 200
      })
    }
    if (cachOldProduct) {
      res.status(200).json({
        data: JSON.parse(cachOldProduct),
        status: 200
      })
    }
  } catch (error: unknown) {
    next(new ErrorHandler(error as string, 500))
  }
}
