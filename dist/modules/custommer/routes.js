"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const validationMiddleware_1 = __importDefault(require("../../middleWares/validationMiddleware"));
const verifyToken_1 = require("../../middleWares/verifyToken");
const malter_1 = __importDefault(require("../../utils/malter"));
const validation_1 = require("../../validation/validation");
const custommer_1 = require("./custommer");
const custommerRouter = (0, express_1.Router)();
exports.default = custommerRouter
    .put('/custommer-update', verifyToken_1.CheckToken, malter_1.default.single('avatar'), (0, validationMiddleware_1.default)(validation_1.UpdateUsersInfo), custommer_1.PostUserDetail)
    .get('/custommer', verifyToken_1.CheckToken, custommer_1.getCustommerById);
