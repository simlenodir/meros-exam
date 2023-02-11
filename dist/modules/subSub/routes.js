"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const validationMiddleware_1 = __importDefault(require("../../middleWares/validationMiddleware"));
const validation_1 = require("../../validation/validation");
const subSubCategory_1 = require("./subSubCategory");
const subSubRouter = (0, express_1.Router)();
exports.default = subSubRouter
    .get('/sub-subcategory-get', subSubCategory_1.getSubSubCategories)
    .get('/sub-subcategory-byId/:subSubId', subSubCategory_1.getSubSubCategoriesById)
    .post('/create-subsubcategory', (0, validationMiddleware_1.default)(validation_1.SubSubCategoryValidation), subSubCategory_1.createSubSubCategory)
    .put('/udate-subsubcategory/:id', (0, validationMiddleware_1.default)(validation_1.UpdateSubSubCategoryValidation), subSubCategory_1.updateSubSubCategory)
    .delete('/delete-subsubcategory/:id', subSubCategory_1.deleteSubSubCategory);
