"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const validationMiddleware_1 = __importDefault(require("../../middleWares/validationMiddleware"));
const validation_1 = require("../../validation/validation");
const discontProducts_1 = require("./discontProducts");
const product_1 = require("./product");
const productRouter = (0, express_1.Router)();
exports.default = productRouter
    .get('/product-get', product_1.getProducts)
    .get('/product-getById/:productId', product_1.getProductsById)
    .get('/all-products', product_1.getAllProducts)
    .post('/create-product', (0, validationMiddleware_1.default)(validation_1.ProductsValidation), product_1.createProduct)
    .put('/update-product/:id', (0, validationMiddleware_1.default)(validation_1.UpdateProductsValidation), product_1.updateProduct)
    .put('/update-product-discont/:id', (0, validationMiddleware_1.default)(validation_1.UpdateDiscontProduct), discontProducts_1.updatedDiscontProduct)
    .delete('/delete-product/:id', product_1.deletedProduct);
