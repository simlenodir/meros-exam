import { Router } from 'express'
import validationMiddleware from '../../middleWares/validationMiddleware'
import { CheckToken } from '../../middleWares/verifyToken'
import { CreateCommentsValidation, UpdateCommentsValidation } from '../../validation/validation'
import { createComment, getComments, updateComment } from './comments'

const commentsRouter = Router()

export default commentsRouter
  .get('/comments', getComments)
  .post('/create-comments', validationMiddleware(CreateCommentsValidation), CheckToken, createComment)
  .put('/update-comment/:id', validationMiddleware(UpdateCommentsValidation), updateComment)
