import { NextFunction, Request, Response } from 'express'
import dataSource from '../../config/ormconfig'
import { CommentsEntity } from '../../entities/comments.entity'
import { ErrorHandler } from '../../exeptions/erroHandler'

export const getComments = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const comments = await dataSource.getRepository(CommentsEntity).find({
      relations: { custommer: true, product: true },
      select: {
        id: true,
        title: true,
        product: {
          title: true,
          price: true
        },

        custommer: {
          first_name: true,
          last_name: true,
          avatar: true
        }
      }
    })

    res.status(200).json({
      data: comments,
      status: 200
    })
  } catch (error: unknown) {
    next(new ErrorHandler(error as string, 500))
  }
}

export const createComment = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const custommerId = req.id

    const { title, productId } = req.filtered
    const product: any = productId
    const custommer: any = custommerId

    if (typeof title === 'string') {
      const newComment = await dataSource
        .getRepository(CommentsEntity)
        .createQueryBuilder()
        .insert()
        .into(CommentsEntity)
        .values({ title, product, custommer })
        .returning(['*'])
        .execute()

      res.status(201).json({
        data: newComment,
        status: 201
      })
    }
  } catch (error: unknown) {
    next(new ErrorHandler(error as string, 500))
  }
}

export const updateComment = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const { title } = req.filtered
    const { id } = req.params
    console.log(title, id)

    const updateCategory = await dataSource
      .createQueryBuilder()
      .update(CommentsEntity)
      .set({ title })
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
