import { Router } from 'express'
import validationMiddleware from '../../middleWares/validationMiddleware'
import { CheckToken } from '../../middleWares/verifyToken'
import upload from '../../utils/malter'
import { UpdateUsersInfo } from '../../validation/validation'
import { getCustommerById, PostUserDetail } from './custommer'

const custommerRouter = Router()

export default custommerRouter
  .put('/custommer-update', CheckToken, upload.single('avatar'), validationMiddleware(UpdateUsersInfo), PostUserDetail)
  .get('/custommer', CheckToken, getCustommerById)
