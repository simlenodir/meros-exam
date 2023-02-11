import { NextFunction, Request, Response } from 'express'
import { ErrorHandler } from '../exeptions/erroHandler'
import jwt, { JsonWebTokenError } from 'jsonwebtoken'
import dataSource from '../config/ormconfig'
import { CustommersEntity } from '../entities/custommers.entity'
import UtilsJwt from '../utils/jwt'
import { HEADERS } from '../types/interfaces'

export const CheckToken = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const { token } = req.headers as any

    if (!token) {
      res.json({
        message: 'You have not access token'
      })
    }
    const tokenId = UtilsJwt.verify(token) as any

    const foundUser = (await dataSource
      .getRepository(CustommersEntity)
      .find({
        where: {
          id: tokenId
        }
      })
      .catch((error: ErrorHandler) => next(new ErrorHandler('Invalid token', 500)))) as any

    jwt.verify(token, String(process.env.SECRET_KEY), (err: any, decode: any) => {
      if (err instanceof JsonWebTokenError) {
        return next(new ErrorHandler('Invalid token', 401))
      }
    })
    req.id = foundUser[0]?.id as string
    next()
  } catch (error) {
    next(new ErrorHandler('Provide access token', 401))
  }
}
