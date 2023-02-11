import { Router } from 'express'
import validationMiddleware from '../../middleWares/validationMiddleware'
import { CheckToken } from '../../middleWares/verifyToken'
import { ProductsValidation, UpdateDiscontProduct, UpdateProductsValidation } from '../../validation/validation'
import { updatedDiscontProduct } from './discontProducts'
import { createProduct, deletedProduct, getAllProducts, getProducts, getProductsById, updateProduct } from './product'

const productRouter = Router()

export default productRouter
  .get('/product-get', getProducts)
  .get('/product-getById/:productId', getProductsById)
  .get('/all-products', getAllProducts)
  .post('/create-product', validationMiddleware(ProductsValidation), createProduct)
  .put('/update-product/:id', validationMiddleware(UpdateProductsValidation), updateProduct)
  .put('/update-product-discont/:id', validationMiddleware(UpdateDiscontProduct), updatedDiscontProduct)
  .delete('/delete-product/:id', deletedProduct)
