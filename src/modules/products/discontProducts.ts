import { NextFunction, Request, Response } from 'express'
import dataSource from '../../config/ormconfig'
import { Client } from '../../config/redis.config'
import { ProductsEntity } from '../../entities/product.entity'
import { ErrorHandler } from '../../exeptions/erroHandler'
import { DISCONT } from '../../types/interfaces'

export const updatedDiscontProduct = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const { id } = req.params
    const { discont } = req.filtered as DISCONT

    const foundProduct = (await dataSource.getRepository(ProductsEntity).findOne({
      where: { id }
    })) as any

    const newPrice = foundProduct?.price - (foundProduct?.price * discont) / 100

    const updatedProduct = await dataSource
      .getRepository(ProductsEntity)
      .createQueryBuilder()
      .update(ProductsEntity)
      .set({
        discont,
        discont_price: newPrice
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
