import { Router } from 'express'
import { getDiscontProducts, getNewProducts, getOldProducts, getRateProducts, SortingBySoldProduct } from './sorting'

const sortingRouter = Router()

export default sortingRouter
  .get('/sortBySold-product', SortingBySoldProduct)
  .get('/discont-products', getDiscontProducts)
  .get('/rate-products', getRateProducts)
  .get('/get-newProducts', getNewProducts)
  .get('/get-oldProducts', getOldProducts)
