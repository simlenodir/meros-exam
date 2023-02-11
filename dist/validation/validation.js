"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdateDiscontProduct = exports.CreateRateValidation = exports.CreateOrderValidation = exports.UpdateCommentsValidation = exports.CreateCommentsValidation = exports.UpdateProductsValidation = exports.ProductsValidation = exports.UpdateSubSubCategoryValidation = exports.SubSubCategoryValidation = exports.UpdateSubCategoryValidation = exports.SubCategoryValidation = exports.CategoryUpdateValidation = exports.CategoryValidation = exports.UserLogin = exports.UpdateUsersInfo = exports.UsersRegistration = void 0;
const joi_1 = __importDefault(require("joi"));
exports.UsersRegistration = joi_1.default.object({
    last_name: joi_1.default.string().min(2).max(64).required(),
    first_name: joi_1.default.string().min(2).max(64).required(),
    password: joi_1.default.string().min(1).max(64).required(),
    phone: joi_1.default.string().max(13).min(12).required(),
    email: joi_1.default.string().required(),
});
exports.UpdateUsersInfo = joi_1.default.object({
    last_name: joi_1.default.string().min(2).max(64),
    first_name: joi_1.default.string().min(2).max(64),
    password: joi_1.default.string().min(1).max(64),
    phone: joi_1.default.string().max(13).min(12),
    email: joi_1.default.string(),
    gender: joi_1.default.string()
});
exports.UserLogin = joi_1.default.object({
    password: joi_1.default.string().min(1).max(64).required(),
    email: joi_1.default.string().required()
});
exports.CategoryValidation = joi_1.default.object({
    title: joi_1.default.string().min(2).max(64).required(),
});
exports.CategoryUpdateValidation = joi_1.default.object({
    title: joi_1.default.string().min(2).max(64).required(),
});
exports.SubCategoryValidation = joi_1.default.object({
    title: joi_1.default.string().min(2).max(64).required(),
    categoryId: joi_1.default.string().required(),
});
exports.UpdateSubCategoryValidation = joi_1.default.object({
    title: joi_1.default.string().min(2).max(64),
    categoryId: joi_1.default.string(),
});
exports.SubSubCategoryValidation = joi_1.default.object({
    title: joi_1.default.string().min(2).max(64).required(),
    subCategoryId: joi_1.default.string().required(),
});
exports.UpdateSubSubCategoryValidation = joi_1.default.object({
    title: joi_1.default.string().min(2).max(64),
    subCategoryId: joi_1.default.string(),
});
exports.ProductsValidation = joi_1.default.object({
    subSubCategory: joi_1.default.string().required(),
    title: joi_1.default.string().required(),
    price: joi_1.default.number().required(),
    rate: joi_1.default.string(),
    brand: joi_1.default.string().required(),
    size: joi_1.default.string(),
    netto: joi_1.default.string(),
    author: joi_1.default.string(),
    description: joi_1.default.string().required(),
    discont: joi_1.default.number().min(0).max(100),
    color: joi_1.default.string(),
    made_in: joi_1.default.string().required(),
    img: joi_1.default.string().required(),
    img1: joi_1.default.string(),
    img2: joi_1.default.string(),
});
exports.UpdateProductsValidation = joi_1.default.object({
    subSubCategory: joi_1.default.string(),
    title: joi_1.default.string(),
    price: joi_1.default.number(),
    rate: joi_1.default.string(),
    brand: joi_1.default.string(),
    size: joi_1.default.string(),
    netto: joi_1.default.string(),
    author: joi_1.default.string(),
    description: joi_1.default.string(),
    color: joi_1.default.string(),
    made_in: joi_1.default.string(),
    img: joi_1.default.string(),
    img1: joi_1.default.string(),
    img2: joi_1.default.string(),
    likes: joi_1.default.number(),
    discont: joi_1.default.number()
});
exports.CreateCommentsValidation = joi_1.default.object({
    title: joi_1.default.string().min(2).required(),
    productId: joi_1.default.string().required(),
});
exports.UpdateCommentsValidation = joi_1.default.object({
    title: joi_1.default.string().min(2)
});
exports.CreateOrderValidation = joi_1.default.object({
    productId: joi_1.default.string().required(),
    count: joi_1.default.number().min(1)
});
exports.CreateRateValidation = joi_1.default.object({
    stars: joi_1.default.number().min(1).max(5).required(),
    productId: joi_1.default.string().required()
});
exports.UpdateDiscontProduct = joi_1.default.object({
    discont: joi_1.default.number().min(0).max(100).required(),
    count: joi_1.default.number().min(1)
});
