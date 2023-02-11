"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getOldProducts = exports.getNewProducts = exports.getRateProducts = exports.getDiscontProducts = exports.SortingBySoldProduct = void 0;
const ormconfig_1 = __importDefault(require("../../config/ormconfig"));
const redis_config_1 = require("../../config/redis.config");
const product_entity_1 = require("../../entities/product.entity");
const rating_entity_1 = require("../../entities/rating.entity");
const erroHandler_1 = require("../../exeptions/erroHandler");
const SortingBySoldProduct = async (req, res, next) => {
    try {
        const client = await (0, redis_config_1.Client)();
        const cachSoldProducts = (await client?.get("soldproducts"));
        if (!cachSoldProducts) {
            const sortedBySoldProducts = (await ormconfig_1.default
                .getRepository(product_entity_1.ProductsEntity)
                .find({
                order: {
                    sold_count: "DESC",
                },
                select: {
                    title: true,
                    price: true,
                    discont: true,
                    sold_count: true,
                    discont_price: true,
                    img: true,
                    made_in: true,
                },
            })
                .catch((err) => next(new erroHandler_1.ErrorHandler(err.message, 500))));
            await client?.setEx("soldproducts", 15, JSON.stringify(sortedBySoldProducts));
            res.status(200).json({
                data: sortedBySoldProducts,
                status: 200,
            });
        }
        if (cachSoldProducts) {
            res.status(200).json({
                data: JSON.parse(cachSoldProducts),
                status: 200,
            });
        }
    }
    catch (error) {
        console.log(error);
    }
};
exports.SortingBySoldProduct = SortingBySoldProduct;
const getDiscontProducts = async (req, res, next) => {
    try {
        const client = await (0, redis_config_1.Client)();
        const cachDiscont = (await client?.get("discontProducts"));
        if (!cachDiscont) {
            const products = await ormconfig_1.default.getRepository(product_entity_1.ProductsEntity).find({
                order: {
                    discont: "DESC",
                },
                select: {
                    title: true,
                    price: true,
                    discont: true,
                    sold_count: true,
                    discont_price: true,
                    img: true,
                    made_in: true,
                },
            });
            await client?.setEx("discontProducts", 15, JSON.stringify(products));
            res.status(200).json({
                data: products,
                status: 200,
            });
        }
        if (cachDiscont) {
            res.status(200).json({
                data: JSON.parse(cachDiscont),
                status: 200,
            });
        }
    }
    catch (error) {
        next(new erroHandler_1.ErrorHandler(error, 500));
    }
};
exports.getDiscontProducts = getDiscontProducts;
const getRateProducts = async (req, res, next) => {
    try {
        const client = await (0, redis_config_1.Client)();
        const cachRateProduct = (await client?.get("rateProducts"));
        if (!cachRateProduct) {
            const statistic = await ormconfig_1.default.getRepository(rating_entity_1.RatingEntity).find({
                relations: { product: true },
                order: {
                    avarage_stars: "DESC",
                },
                select: {
                    product: {
                        title: true,
                        price: true,
                        discont: true,
                        sold_count: true,
                        discont_price: true,
                        img: true,
                        made_in: true,
                    },
                },
            });
            await client?.setEx("rateProducts", 15, JSON.stringify(statistic));
            res.status(200).json({
                data: statistic,
                status: 200,
            });
        }
        if (cachRateProduct) {
            res.status(200).json({
                data: JSON.parse(cachRateProduct),
                status: 200,
            });
        }
    }
    catch (error) {
        next(new erroHandler_1.ErrorHandler(error, 500));
    }
};
exports.getRateProducts = getRateProducts;
const getNewProducts = async (req, res, next) => {
    try {
        const client = await (0, redis_config_1.Client)();
        const cachNewProduct = (await client?.get("newProducts"));
        if (!cachNewProduct) {
            const products = await ormconfig_1.default.getRepository(product_entity_1.ProductsEntity).find({
                relations: { rate: true },
                order: {
                    time: "DESC",
                },
                select: {
                    title: true,
                    price: true,
                    discont: true,
                    sold_count: true,
                    discont_price: true,
                    img: true,
                    made_in: true,
                    time: true,
                },
            });
            await client?.setEx("newProducts", 15, JSON.stringify(products));
            res.status(200).json({
                data: products,
                status: 200,
            });
        }
        if (cachNewProduct) {
            res.status(200).json({
                data: JSON.parse(cachNewProduct),
                status: 200,
            });
        }
    }
    catch (error) {
        next(new erroHandler_1.ErrorHandler(error, 500));
    }
};
exports.getNewProducts = getNewProducts;
const getOldProducts = async (req, res, next) => {
    try {
        const client = await (0, redis_config_1.Client)();
        const cachOldProduct = (await client?.get("newProducts"));
        if (!cachOldProduct) {
            const products = await ormconfig_1.default.getRepository(product_entity_1.ProductsEntity).find({
                relations: { rate: true },
                order: {
                    time: "ASC",
                },
                select: {
                    title: true,
                    price: true,
                    discont: true,
                    sold_count: true,
                    discont_price: true,
                    img: true,
                    made_in: true,
                    time: true,
                },
            });
            await client?.setEx("newProducts", 15, JSON.stringify(products));
            res.status(200).json({
                data: products,
                status: 200,
            });
        }
        if (cachOldProduct) {
            res.status(200).json({
                data: JSON.parse(cachOldProduct),
                status: 200,
            });
        }
    }
    catch (error) {
        next(new erroHandler_1.ErrorHandler(error, 500));
    }
};
exports.getOldProducts = getOldProducts;
