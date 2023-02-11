import { NextFunction, Request, Response } from 'express'
import dataSource from '../../config/ormconfig'
import { CustommersEntity } from '../../entities/custommers.entity'
import { ErrorHandler } from '../../exeptions/erroHandler'
import { FILTERED } from '../../types/interfaces'
import jwt from '../../utils/jwt'

export const authRegistration = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const { first_name, last_name, email, phone, password } = req.filtered as FILTERED

    const existingUser = await dataSource.getRepository(CustommersEntity).findOne({
      where: {
        email,
        password
      }
    })

    if (existingUser) {
      res.status(401).json({
        message: 'Sorry Exists in database'
      })
      return
    }

    const newCustommer = await dataSource
      .getRepository(CustommersEntity)
      .createQueryBuilder()
      .insert()
      .into(CustommersEntity)
      .values({ first_name, last_name, email, phone, password })
      .returning('*')
      .execute()

    const id = newCustommer.raw[0].custommer_id

    res.status(201).json({
      token: jwt.sign(id)
    })
  } catch (error: any) {
    next(new ErrorHandler(error, 503))
  }
}

export const authLogin = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const { email, password } = req.filtered as any

    const foundUser = await dataSource.getRepository(CustommersEntity).findOne({
      where: {
        email,
        password
      }
    })

    if (!foundUser) {
      res.status(401).json({
        message: 'Sorry password or email is error'
      })
      return
    }

    const id: string | undefined = foundUser.id

    res.status(201).json({
      token: jwt.sign(id)
    })
  } catch (error: any) {
    next(new ErrorHandler(error, 503))
  }
}

export const foundUser = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const { token } = req.headers
    if (typeof token == 'string') {
      const id: string = jwt.verify(token) as any

      const foundUser = await dataSource.getRepository(CustommersEntity).findOne({
        where: {
          id
        }
      })

      if (!foundUser) {
        res.status(401).json({
          message: 'Sorry Exists in database'
        })
        return
      }
    }
  } catch (error: any) {
    next(new ErrorHandler(error, 503))
  }
}
