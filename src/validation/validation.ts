import Joi from 'joi'

export const UsersRegistration = Joi.object({
  last_name: Joi.string().min(2).max(64).required(),
  first_name: Joi.string().min(2).max(64).required(),
  password: Joi.string().min(1).max(64).required(),
  phone: Joi.string().max(13).min(12).required(),
  email: Joi.string().required()
})

export const UpdateUsersInfo = Joi.object({
  last_name: Joi.string().min(2).max(64),
  first_name: Joi.string().min(2).max(64),
  password: Joi.string().min(1).max(64),
  phone: Joi.string().max(13).min(12),
  email: Joi.string(),
  gender: Joi.string()
})

export const UserLogin = Joi.object({
  password: Joi.string().min(1).max(64).required(),
  email: Joi.string().required()
})

export const CategoryValidation = Joi.object({
  title: Joi.string().min(2).max(64).required()
})

export const CategoryUpdateValidation = Joi.object({
  title: Joi.string().min(2).max(64).required()
})

export const SubCategoryValidation = Joi.object({
  title: Joi.string().min(2).max(64).required(),
  categoryId: Joi.string().required()
})

export const UpdateSubCategoryValidation = Joi.object({
  title: Joi.string().min(2).max(64),
  categoryId: Joi.string()
})

export const SubSubCategoryValidation = Joi.object({
  title: Joi.string().min(2).max(64).required(),
  subCategoryId: Joi.string().required()
})

export const UpdateSubSubCategoryValidation = Joi.object({
  title: Joi.string().min(2).max(64),
  subCategoryId: Joi.string()
})

export const ProductsValidation = Joi.object({
  subSubCategory: Joi.string().required(),
  title: Joi.string().required(),
  price: Joi.number().required(),
  rate: Joi.string(),
  brand: Joi.string().required(),
  size: Joi.string(),
  netto: Joi.string(),
  author: Joi.string(),
  description: Joi.string().required(),
  discont: Joi.number().min(0).max(100),
  color: Joi.string(),
  made_in: Joi.string().required(),
  img: Joi.string().required(),
  img1: Joi.string(),
  img2: Joi.string()
})

export const UpdateProductsValidation = Joi.object({
  subSubCategory: Joi.string(),
  title: Joi.string(),
  price: Joi.number(),
  rate: Joi.string(),
  brand: Joi.string(),
  size: Joi.string(),
  netto: Joi.string(),
  author: Joi.string(),
  description: Joi.string(),
  color: Joi.string(),
  made_in: Joi.string(),
  img: Joi.string(),
  img1: Joi.string(),
  img2: Joi.string(),
  likes: Joi.number(),
  discont: Joi.number()
})

export const CreateCommentsValidation = Joi.object({
  title: Joi.string().min(2).required(),
  productId: Joi.string().required()
})

export const UpdateCommentsValidation = Joi.object({
  title: Joi.string().min(2)
})

export const CreateOrderValidation = Joi.object({
  productId: Joi.string().required(),
  count: Joi.number().min(1)
})

export const CreateRateValidation = Joi.object({
  stars: Joi.number().min(1).max(5).required(),
  productId: Joi.string().required()
})

export const UpdateDiscontProduct = Joi.object({
  discont: Joi.number().min(0).max(100).required(),
  count: Joi.number().min(1)
})
