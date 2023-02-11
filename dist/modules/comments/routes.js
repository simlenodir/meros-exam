"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const validationMiddleware_1 = __importDefault(require("../../middleWares/validationMiddleware"));
const verifyToken_1 = require("../../middleWares/verifyToken");
const validation_1 = require("../../validation/validation");
const comments_1 = require("./comments");
const commentsRouter = (0, express_1.Router)();
exports.default = commentsRouter
    .get('/comments', comments_1.getComments)
    .post('/create-comments', (0, validationMiddleware_1.default)(validation_1.CreateCommentsValidation), verifyToken_1.CheckToken, comments_1.createComment)
    .put('/update-comment/:id', (0, validationMiddleware_1.default)(validation_1.UpdateCommentsValidation), comments_1.updateComment);
