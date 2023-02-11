import { NextFunction, Request, Response } from 'express'
import { any, number } from 'joi'
import dataSource from '../../config/ormconfig'
import { RatingEntity } from '../../entities/rating.entity'
import { ErrorHandler } from '../../exeptions/erroHandler'

export const getRate = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const id: string | undefined = req.id

    const statistic = await dataSource.getRepository(RatingEntity).find({
      relations: { product: true },
      order: {
        avarage_stars: 'DESC'
      }
    })

    res.status(200).json({
      data: statistic,
      status: 200
    })
  } catch (error: unknown) {
    next(new ErrorHandler(error as string, 500))
  }
}

export const CreateRate = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { stars, productId } = req.filtered as any
    const foundRate = (await dataSource
      .getRepository(RatingEntity)
      .findOne({
        where: {
          product: { id: productId }
        }
      })
      .catch((err: ErrorHandler) => next(new ErrorHandler(err.message, 500)))) as any

    if (!foundRate) {
      const updateCustommerDetail = await dataSource
        .getRepository(RatingEntity)
        .createQueryBuilder()
        .insert()
        .into(RatingEntity)
        .values({ product: productId, stars, count_stars: 1, avarage_stars: stars })
        .returning(['*'])
        .execute()

      return res.status(201).json({
        message: 'Created successfuly',
        status: 201
      })
    }

    if (foundRate) {
      const newStars = foundRate?.stars + stars
      const newCountStars = foundRate?.count_stars + 1
      const avarage_stars = newStars / newCountStars

      const updateCustommerDetail = await dataSource
        .getRepository(RatingEntity)
        .createQueryBuilder()
        .update(RatingEntity)
        .set({ product: productId, stars: newStars, count_stars: newCountStars, avarage_stars })
        .where({ product: productId })
        .execute()

      return res.status(201).json({
        message: 'Updated successfuly',
        status: 201
      })
    }
  } catch (error: any) {
    console.log(error)
    next(new ErrorHandler(error, 503))
  }
}
