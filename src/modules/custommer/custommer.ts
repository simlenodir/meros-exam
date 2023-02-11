import { NextFunction, Request, Response } from 'express'
import dataSource from '../../config/ormconfig'
import { CustommersEntity } from '../../entities/custommers.entity'
import { ErrorHandler } from '../../exeptions/erroHandler'
import jwt from '../../utils/jwt'

export const getCustommerById = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const id: string | undefined = req.id

    const foundCustommer = await dataSource.getRepository(CustommersEntity).find({
      relations: { comments: { product: true } },
      select: {
        comments: {
          title: true,
          product: {
            title: true,
            price: true,
            discont: true,
            discont_price: true,
            brand: true
          }
        }
      },
      where: { id: id }
    })

    res.status(200).json({
      data: foundCustommer,
      status: 200
    })
  } catch (error: unknown) {
    next(new ErrorHandler(error as string, 500))
  }
}

export const PostUserDetail = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const { first_name, last_name, email, phone, password, gender } = req.filtered as any
    const { filename } = req.file as any
    const avatar = filename
    const id = req.id as any
    console.log(filename, id, gender)
    console.log(req.filtered)

    const updateCustommerDetail = await dataSource
      .getRepository(CustommersEntity)
      .createQueryBuilder()
      .update(CustommersEntity)
      .set({ first_name, last_name, email, phone, password, gender, avatar })
      .where({ id })
      .returning(['*'])
      .execute()
    console.log(updateCustommerDetail)

    res.status(201).json({
      message: 'Updated successfuly',
      status: 201
    })
  } catch (error: any) {
    console.log(error)

    next(new ErrorHandler(error, 503))
  }
}
