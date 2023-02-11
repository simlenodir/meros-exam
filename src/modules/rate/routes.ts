import { Router } from 'express'
import validationMiddleware from '../../middleWares/validationMiddleware'
import { CreateRateValidation } from '../../validation/validation'
import { CreateRate, getRate } from './rate'

const rateRouter = Router()

export default rateRouter
  .get('/rate-get', getRate)
  .post('/create-rate', validationMiddleware(CreateRateValidation), CreateRate)
