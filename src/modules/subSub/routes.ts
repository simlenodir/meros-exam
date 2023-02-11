import { Router } from 'express'
import validationMiddleware from '../../middleWares/validationMiddleware'
import { SubSubCategoryValidation, UpdateSubSubCategoryValidation } from '../../validation/validation'
import {
  createSubSubCategory,
  deleteSubSubCategory,
  getSubSubCategories,
  getSubSubCategoriesById,
  updateSubSubCategory
} from './subSubCategory'

const subSubRouter = Router()

export default subSubRouter
  .get('/sub-subcategory-get', getSubSubCategories)
  .get('/sub-subcategory-byId/:subSubId', getSubSubCategoriesById)
  .post('/create-subsubcategory', validationMiddleware(SubSubCategoryValidation), createSubSubCategory)
  .put('/udate-subsubcategory/:id', validationMiddleware(UpdateSubSubCategoryValidation), updateSubSubCategory)
  .delete('/delete-subsubcategory/:id', deleteSubSubCategory)
