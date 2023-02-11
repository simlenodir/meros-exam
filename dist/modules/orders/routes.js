"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const validationMiddleware_1 = __importDefault(require("../../middleWares/validationMiddleware"));
const verifyToken_1 = require("../../middleWares/verifyToken");
const validation_1 = require("../../validation/validation");
const order_1 = require("./order");
const ordersRouter = (0, express_1.Router)();
exports.default = ordersRouter
    .get('/orders-get', verifyToken_1.CheckToken, order_1.getOrders)
    .post('/create-order', verifyToken_1.CheckToken, (0, validationMiddleware_1.default)(validation_1.CreateOrderValidation), order_1.createOrder)
    .delete('/delete-order/:id', verifyToken_1.CheckToken, order_1.deleteOrder);
