import { Router } from 'express'
import validationMiddleware from '../../middleWares/validationMiddleware'
import upload from '../../utils/malter'
import { UserLogin, UsersRegistration } from '../../validation/validation'
import { authLogin, authRegistration } from './auth'

const authRouter = Router()

export default authRouter
  .post('/auth', upload.single('avatar'), validationMiddleware(UsersRegistration), authRegistration)
  .post('/login', validationMiddleware(UserLogin), authLogin)
