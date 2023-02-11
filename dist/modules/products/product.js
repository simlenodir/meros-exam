"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deletedProduct = exports.updateProduct = exports.createProduct = exports.getProductsById = exports.getProducts = exports.getAllProducts = void 0;
const ormconfig_1 = __importDefault(require("../../config/ormconfig"));
const redis_config_1 = require("../../config/redis.config");
const product_entity_1 = require("../../entities/product.entity");
const erroHandler_1 = require("../../exeptions/erroHandler");
const getAllProducts = async (req, res, next) => {
    try {
        const client = await (0, redis_config_1.Client)();
        const cachProducts = (await client?.get("allProducts"));
        if (!cachProducts) {
            const products = await ormconfig_1.default.getRepository(product_entity_1.ProductsEntity).find();
            const resultProduct = products;
            await client?.setEx("allProducts", 15, JSON.stringify(resultProduct));
            res.status(200).json({
                data: resultProduct,
                status: 200,
            });
        }
        if (cachProducts) {
            res.status(200).json({
                data: JSON.parse(cachProducts),
                status: 200,
            });
        }
    }
    catch (error) {
        console.log(error);
        next(new erroHandler_1.ErrorHandler(error, 500));
    }
};
exports.getAllProducts = getAllProducts;
const getProducts = async (req, res, next) => {
    try {
        const { page, limit } = req.query;
        const page1 = page ? page : 1;
        const limit1 = limit ? limit : 10;
        const client = await (0, redis_config_1.Client)();
        const cachPaginate = await client?.get('paginatePruducts');
        if (!cachPaginate) {
            const products = await ormconfig_1.default.getRepository(product_entity_1.ProductsEntity).find();
            await client?.setEx('paginatePruducts', 15, JSON.stringify(products));
            const result = products.slice((page1 - 1) * limit1, limit1 * page1);
            res.json({
                data: result,
                status: 200,
            });
        }
        if (cachPaginate) {
            const data = JSON.parse(cachPaginate);
            const result = data.slice((page1 - 1) * limit1, limit1 * page1);
            res.json({
                data: result,
                status: 200,
            });
        }
    }
    catch (error) {
        console.log(error);
        next(new erroHandler_1.ErrorHandler(error, 500));
    }
};
exports.getProducts = getProducts;
const getProductsById = async (req, res, next) => {
    try {
        const { productId } = req.params;
        if (productId) {
            const allProducts = await ormconfig_1.default
                .getRepository(product_entity_1.ProductsEntity)
                .find({
                where: { id: productId },
                relations: {
                    comments: {
                        custommer: true,
                    },
                    rate: true,
                },
                select: {
                    comments: {
                        title: true,
                        custommer: {
                            first_name: true,
                            last_name: true,
                            avatar: true,
                        },
                    },
                },
            })
                .catch((err) => next(new erroHandler_1.ErrorHandler(err.message, 503)));
            if (allProducts) {
                res.status(200).json({
                    data: allProducts,
                    status: 200,
                });
            }
        }
    }
    catch (error) {
        next(new erroHandler_1.ErrorHandler(error, 500));
    }
};
exports.getProductsById = getProductsById;
const createProduct = async (req, res, next) => {
    try {
        const { subSubCategory, title, price, rate, brand, size, netto, author, description, color, made_in, img, img1, img2, } = req.filtered;
        const newProduct = await ormconfig_1.default
            .getRepository(product_entity_1.ProductsEntity)
            .createQueryBuilder()
            .insert()
            .into(product_entity_1.ProductsEntity)
            .values({
            title,
            price,
            rate,
            brand,
            size,
            netto,
            author,
            description,
            color,
            made_in,
            img,
            img1,
            img2,
            subSubCategory
        })
            .execute()
            .catch((err) => next(new erroHandler_1.ErrorHandler(err.message, 503)));
        res.status(200).json({
            data: newProduct,
            status: 200,
        });
    }
    catch (error) {
        next(new erroHandler_1.ErrorHandler(error, 500));
    }
};
exports.createProduct = createProduct;
const updateProduct = async (req, res, next) => {
    try {
        const { id } = req.params;
        const { subSubCategory, title, price, rate, brand, size, netto, author, description, color, made_in, img, img1, img2, likes, } = req.filtered;
        const updatedProduct = await ormconfig_1.default
            .getRepository(product_entity_1.ProductsEntity)
            .createQueryBuilder()
            .update(product_entity_1.ProductsEntity)
            .set({
            title,
            price,
            rate,
            brand,
            size,
            netto,
            author,
            description,
            color,
            made_in,
            img,
            img1,
            img2,
            subSubCategory,
        })
            .where({ id })
            .execute()
            .catch((err) => next(new erroHandler_1.ErrorHandler(err.message, 503)));
        if (updatedProduct) {
            res.status(200).json({
                message: "Updated succesfully",
                status: 200,
            });
        }
    }
    catch (error) {
        next(new erroHandler_1.ErrorHandler(error, 500));
    }
};
exports.updateProduct = updateProduct;
const deletedProduct = async (req, res, next) => {
    try {
        const { id } = req.params;
        const deletedProduct = await ormconfig_1.default
            .createQueryBuilder()
            .delete()
            .from(product_entity_1.ProductsEntity)
            .where({ id })
            .execute()
            .catch((err) => next(new erroHandler_1.ErrorHandler(err.message, 503)));
        res.status(200).json({
            message: "Deleted succesfuly",
            status: 200,
        });
    }
    catch (error) {
        next(new erroHandler_1.ErrorHandler(error, 500));
    }
};
exports.deletedProduct = deletedProduct;
