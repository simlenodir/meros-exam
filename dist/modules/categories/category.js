"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteCategory = exports.updateCategory = exports.createCategory = exports.getCategoriesById = exports.getCategories = void 0;
const ormconfig_1 = __importDefault(require("../../config/ormconfig"));
const category_entity_1 = require("../../entities/category.entity");
const erroHandler_1 = require("../../exeptions/erroHandler");
const getCategories = async (req, res, next) => {
    try {
        const categories = await ormconfig_1.default
            .getRepository(category_entity_1.CategoriesEntity)
            .find({
        // relations: {
        //   sub_category: {
        //     sub_sub_category: {
        //       products: true,
        //     },
        //   },
        // },
        })
            .catch((err) => next(new erroHandler_1.ErrorHandler(err.message, 503)));
        res.status(200).json({
            data: categories,
            status: 200,
        });
    }
    catch (error) {
        next(new erroHandler_1.ErrorHandler(error, 500));
    }
};
exports.getCategories = getCategories;
const getCategoriesById = async (req, res, next) => {
    try {
        const { categoryId } = req.params;
        if (categoryId) {
            const categories = await ormconfig_1.default
                .getRepository(category_entity_1.CategoriesEntity)
                .find({
                where: { id: categoryId },
                relations: {
                    sub_category: {
                        sub_sub_category: {
                            products: true,
                        },
                    },
                },
            })
                .catch((err) => next(new erroHandler_1.ErrorHandler(err.message, 503)));
            res.status(200).json({
                data: categories,
                status: 200,
            });
        }
    }
    catch (error) {
        next(new erroHandler_1.ErrorHandler(error, 500));
    }
};
exports.getCategoriesById = getCategoriesById;
const createCategory = async (req, res, next) => {
    try {
        const { title } = req.filtered;
        if (typeof title === "string") {
            const newCategory = await ormconfig_1.default
                .getRepository(category_entity_1.CategoriesEntity)
                .createQueryBuilder()
                .insert()
                .into(category_entity_1.CategoriesEntity)
                .values({ title })
                .returning(["*"])
                .execute()
                .catch((err) => next(new erroHandler_1.ErrorHandler(err.message, 503)));
            res.status(200).json({
                data: newCategory,
                message: "Created succesfulluy",
                status: 200,
            });
        }
    }
    catch (error) {
        next(new erroHandler_1.ErrorHandler(error, 500));
    }
};
exports.createCategory = createCategory;
const updateCategory = async (req, res, next) => {
    try {
        const { title } = req.filtered;
        const { id } = req.params;
        const updateCategory = await ormconfig_1.default
            .createQueryBuilder()
            .update(category_entity_1.CategoriesEntity)
            .set({ title })
            .where({ id })
            .returning(["*"])
            .execute()
            .catch((err) => next(new erroHandler_1.ErrorHandler(err.message, 503)));
        if (updateCategory) {
            res.status(200).json({
                message: "Updated succesfuly",
                status: 200,
            });
        }
    }
    catch (error) {
        next(new erroHandler_1.ErrorHandler(error, 500));
    }
};
exports.updateCategory = updateCategory;
const deleteCategory = async (req, res, next) => {
    try {
        const { id } = req.params;
        const updateCategory = await ormconfig_1.default
            .createQueryBuilder()
            .delete()
            .from(category_entity_1.CategoriesEntity)
            .where({ id })
            .execute()
            .catch((err) => next(new erroHandler_1.ErrorHandler(err.message, 503)));
        console.log(updateCategory);
        res.status(200).json({
            message: "Deleted succesfuly",
            status: 200,
        });
    }
    catch (error) {
        next(new erroHandler_1.ErrorHandler(error, 500));
    }
};
exports.deleteCategory = deleteCategory;
