import { NextFunction, Request, Response } from 'express'
import { any, string } from 'joi'
import dataSource from '../../config/ormconfig'
import { Client } from '../../config/redis.config'
import { CustommersEntity } from '../../entities/custommers.entity'
import { OrdersEntity } from '../../entities/orders.entity'
import { ProductsEntity } from '../../entities/product.entity'
import { ErrorHandler } from '../../exeptions/erroHandler'
// import { ORDER } from "../../types/interfaces"

export const getOrders = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const id: string | undefined = req.id

    const client = await Client()
    const cachOrders = (await client?.get('orderProducts')) as any

    if (!cachOrders) {
      const foundCustommer = await dataSource
        .getRepository(OrdersEntity)
        .find({
          relations: {
            custommer: true,
            product: true
          },
          select: {
            custommer: {
              last_name: true,
              first_name: true,
              avatar: true
            },
            product: {
              price: true,
              title: true,
              brand: true,
              discont: true,
              discont_price: true,
              made_in: true
            }
          },
          where: { custommer: { id } }
        })
        .catch((err: ErrorHandler) => next(new ErrorHandler(err.message, 503)))

      res.status(200).json({
        data: foundCustommer,
        status: 200
      })

      await client?.setEx('orderProducts', 15, JSON.stringify(foundCustommer))
    }

    if (cachOrders) {
      res.status(200).json({
        data: JSON.parse(cachOrders),
        status: 200
      })
    }
  } catch (error: any) {
    console.log(error)

    next(new ErrorHandler(error as string, 500))
  }
}

export const createOrder = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const custommerId = req.id as any

    const { productId, count } = req.filtered as any

    const foundProduct = await dataSource
      .getRepository(ProductsEntity)
      .findOne({
        where: { id: productId }
      })
      .catch((err: ErrorHandler) => next(new ErrorHandler(err.message, 500)))

    const foundOrder = await dataSource
      .getRepository(OrdersEntity)
      .findOne({
        where: { product: { id: productId }, custommer: { id: custommerId } }
      })
      .catch((err: ErrorHandler) => next(new ErrorHandler(err.message, 500)))

    if (!foundOrder) {
      const product = productId as any
      const custommer: any = custommerId
      const newCountProduct = foundProduct?.sold_count + count

      const newOrder = await dataSource
        .createQueryBuilder()
        .insert()
        .into(OrdersEntity)
        .values({ count, custommer, product })
        .returning(['*'])
        .execute()
        .catch((err: ErrorHandler) => next(new ErrorHandler(err.message, 500)))

      const updatedProduct = await dataSource
        .getRepository(ProductsEntity)
        .createQueryBuilder()
        .update(ProductsEntity)
        .set({ sold_count: newCountProduct })
        .where({ id: product })
        .execute()

      return res.status(201).json({
        data: newOrder,
        status: 201
      })
    }

    if (foundOrder) {
      const newCount = foundOrder.count + count
      const allSoldProduct = foundProduct?.sold_count + count
      const product = productId as any
      const custommer: any = custommerId

      const updatedProduct = await dataSource
        .getRepository(ProductsEntity)
        .createQueryBuilder()
        .update(ProductsEntity)
        .set({ sold_count: allSoldProduct })
        .where({ id: product })
        .execute()

      const newOrder = await dataSource
        .createQueryBuilder()
        .update(OrdersEntity)
        .set({ count: newCount })
        .returning(['*'])
        .execute()
        .catch((err: ErrorHandler) => next(new ErrorHandler(err.message, 500)))

      return res.status(201).json({
        data: newOrder,
        status: 201
      })
    }
  } catch (error: unknown) {
    console.log(error)
    next(new ErrorHandler('Erorr In Server', 500))
  }
}

export const deleteOrder = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const { id } = req.params

    const deletedOrder = await dataSource
      .createQueryBuilder()
      .delete()
      .from('products_entity_customer_custommers_entity')
      .where({ productsEntityProductId: id })
      .execute()
      .catch((err: ErrorHandler) => next(new ErrorHandler(err.message, 500)))

    console.log(deletedOrder)
    res.status(200).json({
      message: 'Deleted succesfuly',
      status: 200
    })
  } catch (error) {
    next(new ErrorHandler(error as string, 500))
  }
}
