"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteSubCategory = exports.updateSubCategory = exports.createSubCategory = exports.getSubCategoriesById = exports.getSubCategories = void 0;
const ormconfig_1 = __importDefault(require("../../config/ormconfig"));
const sub_category_entity_1 = require("../../entities/sub_category.entity");
const erroHandler_1 = require("../../exeptions/erroHandler");
const getSubCategories = async (req, res, next) => {
    try {
        const subCategories = await ormconfig_1.default.getRepository(sub_category_entity_1.SubCategoryEntity).find({
            relations: { sub_sub_category: true }
        });
        res.status(200).json({
            data: subCategories,
            status: 200
        });
    }
    catch (error) {
        next(new erroHandler_1.ErrorHandler(error, 500));
    }
};
exports.getSubCategories = getSubCategories;
const getSubCategoriesById = async (req, res, next) => {
    try {
        const { subId } = req.params;
        if (subId) {
            const subCategories = await ormconfig_1.default.getRepository(sub_category_entity_1.SubCategoryEntity)
                .find({
                where: { id: subId },
                relations: {
                    sub_sub_category: {
                        products: true
                    }
                }
            }).catch((err) => next(new erroHandler_1.ErrorHandler(err.message, 503)));
            res.status(200).json({
                data: subCategories,
                status: 200
            });
        }
    }
    catch (error) {
        next(new erroHandler_1.ErrorHandler(error, 500));
    }
};
exports.getSubCategoriesById = getSubCategoriesById;
const createSubCategory = async (req, res, next) => {
    try {
        const { title, categoryId } = req.filtered;
        console.log(title);
        console.log(categoryId);
        const category = categoryId;
        if (typeof title === 'string') {
            const newSubCategory = await ormconfig_1.default.getRepository(sub_category_entity_1.SubCategoryEntity)
                .createQueryBuilder()
                .insert()
                .into(sub_category_entity_1.SubCategoryEntity)
                .values({ title, category })
                .returning(["*"])
                .execute();
            res.status(201).json({
                data: newSubCategory,
                status: 201
            });
        }
    }
    catch (error) {
        next(new erroHandler_1.ErrorHandler(error.message, 500));
    }
};
exports.createSubCategory = createSubCategory;
const updateSubCategory = async (req, res, next) => {
    try {
        const { id } = req.params;
        const { title, categoryId } = req.filtered;
        const category = categoryId;
        const updateCategory = await ormconfig_1.default
            .createQueryBuilder()
            .update(sub_category_entity_1.SubCategoryEntity)
            .set({ title, category })
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
exports.updateSubCategory = updateSubCategory;
const deleteSubCategory = async (req, res, next) => {
    try {
        const { id } = req.params;
        const updateCategory = await ormconfig_1.default.createQueryBuilder()
            .delete()
            .from(sub_category_entity_1.SubCategoryEntity)
            .where({ id })
            .execute();
        console.log(updateCategory);
        res.status(200).json({
            message: 'Deleted succesfuly',
            status: 200
        });
    }
    catch (error) {
        next(new erroHandler_1.ErrorHandler(error, 500));
    }
};
exports.deleteSubCategory = deleteSubCategory;
