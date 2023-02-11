"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const validationMiddleware_1 = __importDefault(require("../../middleWares/validationMiddleware"));
const validation_1 = require("../../validation/validation");
const category_1 = require("./category");
const categoryRouter = (0, express_1.Router)();
exports.default = categoryRouter
    .get('/category-get', category_1.getCategories)
    .get('/category-byId/:categoryId', category_1.getCategoriesById)
    .post('/create-category', (0, validationMiddleware_1.default)(validation_1.CategoryValidation), category_1.createCategory)
    .put('/update-category/:id', (0, validationMiddleware_1.default)(validation_1.CategoryUpdateValidation), category_1.updateCategory)
    .delete('/delete-category/:id', category_1.deleteCategory);
