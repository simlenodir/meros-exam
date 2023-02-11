"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const validationMiddleware_1 = __importDefault(require("../../middleWares/validationMiddleware"));
const validation_1 = require("../../validation/validation");
const rate_1 = require("./rate");
const rateRouter = (0, express_1.Router)();
exports.default = rateRouter
    .get('/rate-get', rate_1.getRate)
    .post('/create-rate', (0, validationMiddleware_1.default)(validation_1.CreateRateValidation), rate_1.CreateRate);
