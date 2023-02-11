"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteOrder = exports.createOrder = exports.getOrders = void 0;
const ormconfig_1 = __importDefault(require("../../config/ormconfig"));
const redis_config_1 = require("../../config/redis.config");
const orders_entity_1 = require("../../entities/orders.entity");
const product_entity_1 = require("../../entities/product.entity");
const erroHandler_1 = require("../../exeptions/erroHandler");
// import { ORDER } from "../../types/interfaces"
const getOrders = async (req, res, next) => {
    try {
        const id = req.id;
        const client = await (0, redis_config_1.Client)();
        const cachOrders = (await client?.get("orderProducts"));
        if (!cachOrders) {
            const foundCustommer = await ormconfig_1.default
                .getRepository(orders_entity_1.OrdersEntity)
                .find({
                relations: {
                    custommer: true,
                    product: true,
                },
                select: {
                    custommer: {
                        last_name: true,
                        first_name: true,
                        avatar: true,
                    },
                    product: {
                        price: true,
                        title: true,
                        brand: true,
                        discont: true,
                        discont_price: true,
                        made_in: true,
                    },
                },
                where: { custommer: { id } },
            })
                .catch((err) => next(new erroHandler_1.ErrorHandler(err.message, 503)));
            res.status(200).json({
                data: foundCustommer,
                status: 200,
            });
            await client?.setEx("orderProducts", 15, JSON.stringify(foundCustommer));
        }
        if (cachOrders) {
            res.status(200).json({
                data: JSON.parse(cachOrders),
                status: 200,
            });
        }
    }
    catch (error) {
        console.log(error);
        next(new erroHandler_1.ErrorHandler(error, 500));
    }
};
exports.getOrders = getOrders;
const createOrder = async (req, res, next) => {
    try {
        const custommerId = req.id;
        const { productId, count } = req.filtered;
        const foundProduct = await ormconfig_1.default
            .getRepository(product_entity_1.ProductsEntity)
            .findOne({
            where: { id: productId },
        })
            .catch((err) => next(new erroHandler_1.ErrorHandler(err.message, 500)));
        const foundOrder = await ormconfig_1.default
            .getRepository(orders_entity_1.OrdersEntity)
            .findOne({
            where: { product: { id: productId }, custommer: { id: custommerId } },
        })
            .catch((err) => next(new erroHandler_1.ErrorHandler(err.message, 500)));
        if (!foundOrder) {
            const product = productId;
            const custommer = custommerId;
            const newCountProduct = foundProduct?.sold_count + count;
            const newOrder = await ormconfig_1.default
                .createQueryBuilder()
                .insert()
                .into(orders_entity_1.OrdersEntity)
                .values({ count, custommer, product })
                .returning(["*"])
                .execute()
                .catch((err) => next(new erroHandler_1.ErrorHandler(err.message, 500)));
            const updatedProduct = await ormconfig_1.default
                .getRepository(product_entity_1.ProductsEntity)
                .createQueryBuilder()
                .update(product_entity_1.ProductsEntity)
                .set({ sold_count: newCountProduct })
                .where({ id: product })
                .execute();
            return res.status(201).json({
                data: newOrder,
                status: 201,
            });
        }
        if (foundOrder) {
            const newCount = foundOrder.count + count;
            const allSoldProduct = foundProduct?.sold_count + count;
            const product = productId;
            const custommer = custommerId;
            const updatedProduct = await ormconfig_1.default
                .getRepository(product_entity_1.ProductsEntity)
                .createQueryBuilder()
                .update(product_entity_1.ProductsEntity)
                .set({ sold_count: allSoldProduct })
                .where({ id: product })
                .execute();
            const newOrder = await ormconfig_1.default
                .createQueryBuilder()
                .update(orders_entity_1.OrdersEntity)
                .set({ count: newCount })
                .returning(["*"])
                .execute()
                .catch((err) => next(new erroHandler_1.ErrorHandler(err.message, 500)));
            return res.status(201).json({
                data: newOrder,
                status: 201,
            });
        }
    }
    catch (error) {
        console.log(error);
        next(new erroHandler_1.ErrorHandler("Erorr In Server", 500));
    }
};
exports.createOrder = createOrder;
const deleteOrder = async (req, res, next) => {
    try {
        const { id } = req.params;
        const deletedOrder = await ormconfig_1.default
            .createQueryBuilder()
            .delete()
            .from("products_entity_customer_custommers_entity")
            .where({ productsEntityProductId: id })
            .execute()
            .catch((err) => next(new erroHandler_1.ErrorHandler(err.message, 500)));
        console.log(deletedOrder);
        res.status(200).json({
            message: "Deleted succesfuly",
            status: 200,
        });
    }
    catch (error) {
        next(new erroHandler_1.ErrorHandler(error, 500));
    }
};
exports.deleteOrder = deleteOrder;
