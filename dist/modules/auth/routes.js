"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const validationMiddleware_1 = __importDefault(require("../../middleWares/validationMiddleware"));
const malter_1 = __importDefault(require("../../utils/malter"));
const validation_1 = require("../../validation/validation");
const auth_1 = require("./auth");
const authRouter = (0, express_1.Router)();
exports.default = authRouter
    .post('/auth', malter_1.default.single("avatar"), (0, validationMiddleware_1.default)(validation_1.UsersRegistration), auth_1.authRegistration)
    .post('/login', (0, validationMiddleware_1.default)(validation_1.UserLogin), auth_1.authLogin);
