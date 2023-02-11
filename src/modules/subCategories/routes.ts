import { Router } from 'express'
import validationMiddleware from '../../middleWares/validationMiddleware'
import { SubCategoryValidation, UpdateSubCategoryValidation } from '../../validation/validation'
import {
  createSubCategory,
  deleteSubCategory,
  getSubCategories,
  getSubCategoriesById,
  updateSubCategory
} from './subCategories'

const subRouter = Router()

export default subRouter
  .get('/subcategory-get', getSubCategories)
  .get('/subcategory-byId/:subId', getSubCategoriesById)
  .post('/create-subcategory', validationMiddleware(SubCategoryValidation), createSubCategory)
  .put('/update-subcategory/:id', validationMiddleware(UpdateSubCategoryValidation), updateSubCategory)
  .delete('/delete-subcategory/:id', deleteSubCategory)
