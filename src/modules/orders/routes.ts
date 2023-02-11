import { Router } from 'express'
import validationMiddleware from '../../middleWares/validationMiddleware'
import { CheckToken } from '../../middleWares/verifyToken'
import { CreateOrderValidation } from '../../validation/validation'
import { createOrder, deleteOrder, getOrders } from './order'

const ordersRouter = Router()

export default ordersRouter
  .get('/orders-get', CheckToken, getOrders)
  .post('/create-order', CheckToken, validationMiddleware(CreateOrderValidation), createOrder)
  .delete('/delete-order/:id', CheckToken, deleteOrder)
