import { Router } from 'express'
import validationMiddleware from '../../middleWares/validationMiddleware'
import { CategoryUpdateValidation, CategoryValidation } from '../../validation/validation'
import { getCategories, createCategory, updateCategory, deleteCategory, getCategoriesById } from './category'

const categoryRouter = Router()

export default categoryRouter
  .get('/category-get', getCategories)
  .get('/category-byId/:categoryId', getCategoriesById)
  .post('/create-category', validationMiddleware(CategoryValidation), createCategory)
  .put('/update-category/:id', validationMiddleware(CategoryUpdateValidation), updateCategory)
  .delete('/delete-category/:id', deleteCategory)
