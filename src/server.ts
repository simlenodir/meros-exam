import express, { Application } from 'express'
import { ErrorHandler } from './exeptions/erroHandler'
import ErrorMiddleware from './middleWares/ErrorMiddleware'
import router from './modules/routes'
import dotenv from 'dotenv'
import dataSource from './config/ormconfig'
import swagger from 'swagger-ui-express'
import docs from './docs.json'
dotenv.config()

const app: Application = express()
const PORT = process.env.PORT || 9090

const main = () => {
  try {
    app.use(express.json())

    dataSource.initialize()

    app.use(router)
    app.use(ErrorMiddleware)
    app.use('/swagger', swagger.serve, swagger.setup(docs))
  } catch (error) {
    throw new ErrorHandler('Interval server error', 500)
  } finally {
    app.listen(PORT, (): void => {
      console.log(`App started ${PORT}`)
    })
  }
}

main()
