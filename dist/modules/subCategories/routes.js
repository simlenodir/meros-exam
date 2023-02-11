"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const validationMiddleware_1 = __importDefault(require("../../middleWares/validationMiddleware"));
const validation_1 = require("../../validation/validation");
const subCategories_1 = require("./subCategories");
const subRouter = (0, express_1.Router)();
exports.default = subRouter
    .get('/subcategory-get', subCategories_1.getSubCategories)
    .get('/subcategory-byId/:subId', subCategories_1.getSubCategoriesById)
    .post('/create-subcategory', (0, validationMiddleware_1.default)(validation_1.SubCategoryValidation), subCategories_1.createSubCategory)
    .put('/update-subcategory/:id', (0, validationMiddleware_1.default)(validation_1.UpdateSubCategoryValidation), subCategories_1.updateSubCategory)
    .delete('/delete-subcategory/:id', subCategories_1.deleteSubCategory);
