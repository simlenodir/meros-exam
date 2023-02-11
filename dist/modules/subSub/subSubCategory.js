"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteSubSubCategory = exports.updateSubSubCategory = exports.createSubSubCategory = exports.getSubSubCategoriesById = exports.getSubSubCategories = void 0;
const ormconfig_1 = __importDefault(require("../../config/ormconfig"));
const sub_sub_category_entity_1 = require("../../entities/sub_sub_category.entity");
const erroHandler_1 = require("../../exeptions/erroHandler");
const getSubSubCategories = async (req, res, next) => {
    try {
        const subSubCategories = await ormconfig_1.default.getRepository(sub_sub_category_entity_1.SubSubCategoryEntity).find({
            relations: { products: true }
        });
        res.status(200).json({
            data: subSubCategories,
            status: 200
        });
    }
    catch (error) {
        next(new erroHandler_1.ErrorHandler(error, 500));
    }
};
exports.getSubSubCategories = getSubSubCategories;
const getSubSubCategoriesById = async (req, res, next) => {
    try {
        const { subSubId } = req.params;
        if (subSubId) {
            const subSubCategories = await ormconfig_1.default.getRepository(sub_sub_category_entity_1.SubSubCategoryEntity)
                .find({
                where: { id: subSubId },
                relations: {
                    products: true
                }
            }).catch((err) => next(new erroHandler_1.ErrorHandler(err.message, 503)));
            res.status(200).json({
                data: subSubCategories,
                status: 200
            });
        }
    }
    catch (error) {
        next(new erroHandler_1.ErrorHandler(error, 500));
    }
};
exports.getSubSubCategoriesById = getSubSubCategoriesById;
const createSubSubCategory = async (req, res, next) => {
    try {
        const { title, subCategoryId } = req.filtered;
        const sub_category = subCategoryId;
        if (typeof title === 'string') {
            const newSubSubCategory = await ormconfig_1.default.getRepository(sub_sub_category_entity_1.SubSubCategoryEntity)
                .createQueryBuilder()
                .insert()
                .into(sub_sub_category_entity_1.SubSubCategoryEntity)
                .values({ title, sub_category })
                .returning(["*"])
                .execute();
            // console.log(newSubSubCategory);
            res.status(200).json({
                data: newSubSubCategory,
                status: 200
            });
        }
    }
    catch (error) {
        next(new erroHandler_1.ErrorHandler(error.message, 500));
    }
};
exports.createSubSubCategory = createSubSubCategory;
const updateSubSubCategory = async (req, res, next) => {
    try {
        const { id } = req.params;
        const { title, subCategoryId } = req.filtered;
        console.log(title);
        console.log(subCategoryId);
        const sub_category = subCategoryId;
        const updateCategory = await ormconfig_1.default
            .createQueryBuilder()
            .update(sub_sub_category_entity_1.SubSubCategoryEntity)
            .set({ title, sub_category })
            .where({ id })
            .returning(["*"])
            .execute();
        if (updateCategory) {
            res.status(200).json({
                message: 'Updated succesfuly',
                status: 200
            });
        }
    }
    catch (error) {
        next(new erroHandler_1.ErrorHandler(error, 500));
    }
};
exports.updateSubSubCategory = updateSubSubCategory;
const deleteSubSubCategory = async (req, res, next) => {
    try {
        const { id } = req.params;
        console.log(id);
        const deletedSubSubCategory = await ormconfig_1.default.createQueryBuilder()
            .delete()
            .from(sub_sub_category_entity_1.SubSubCategoryEntity)
            .where({ id })
            .execute();
        console.log(deletedSubSubCategory);
        res.status(200).json({
            message: 'Deleted succesfuly',
            status: 200
        });
    }
    catch (error) {
        next(new erroHandler_1.ErrorHandler(error, 500));
    }
};
exports.deleteSubSubCategory = deleteSubSubCategory;
