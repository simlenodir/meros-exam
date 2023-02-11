import { Router } from 'express'
import categoryRouter from '../categories/routes'
import productRouter from '../products/routes'
import subRouter from '../subCategories/routes'
import subSubRouter from '../subSub/routes'
import authRouter from '../auth/routes'
import customerRouter from '../custommer/routes'
import commentsRouter from '../comments/routes'
import ordersRouter from '../orders/routes'
import rateRouter from '../rate/routes'
import sortingRouter from '../sorting/routes'

const router = Router()

export default router
  .use('/meros', categoryRouter)
  .use('/meros', subRouter)
  .use('/meros', subSubRouter)
  .use('/meros', productRouter)
  .use('/meros', authRouter)
  .use('/meros', customerRouter)
  .use('/meros', commentsRouter)
  .use('/meros', ordersRouter)
  .use('/meros', rateRouter)
  .use('/meros', sortingRouter)
