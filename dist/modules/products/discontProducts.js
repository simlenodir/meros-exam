"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.updatedDiscontProduct = void 0;
const ormconfig_1 = __importDefault(require("../../config/ormconfig"));
const product_entity_1 = require("../../entities/product.entity");
const erroHandler_1 = require("../../exeptions/erroHandler");
const updatedDiscontProduct = async (req, res, next) => {
    try {
        const { id } = req.params;
        const { discont } = req.filtered;
        const foundProduct = await ormconfig_1.default.getRepository(product_entity_1.ProductsEntity).findOne({
            where: { id }
        });
        const newPrice = (foundProduct?.price - (foundProduct?.price * discont / 100));
        const updatedProduct = await ormconfig_1.default
            .getRepository(product_entity_1.ProductsEntity)
            .createQueryBuilder()
            .update(product_entity_1.ProductsEntity)
            .set({
            discont, discont_price: newPrice
        })
            .where({ id })
            .execute().catch((err) => next(new erroHandler_1.ErrorHandler(err.message, 503)));
        if (updatedProduct) {
            res.status(200).json({
                message: 'Updated succesfully',
                status: 200,
            });
        }
    }
    catch (error) {
        next(new erroHandler_1.ErrorHandler(error, 500));
    }
};
exports.updatedDiscontProduct = updatedDiscontProduct;
