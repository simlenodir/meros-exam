"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateComment = exports.createComment = exports.getComments = void 0;
const ormconfig_1 = __importDefault(require("../../config/ormconfig"));
const comments_entity_1 = require("../../entities/comments.entity");
const erroHandler_1 = require("../../exeptions/erroHandler");
const getComments = async (req, res, next) => {
    try {
        const comments = await ormconfig_1.default.getRepository(comments_entity_1.CommentsEntity).find({
            relations: { custommer: true, product: true },
            select: {
                id: true,
                title: true,
                product: {
                    title: true,
                    price: true,
                },
                custommer: {
                    first_name: true,
                    last_name: true,
                    avatar: true,
                },
            },
        });
        res.status(200).json({
            data: comments,
            status: 200,
        });
    }
    catch (error) {
        next(new erroHandler_1.ErrorHandler(error, 500));
    }
};
exports.getComments = getComments;
const createComment = async (req, res, next) => {
    try {
        const custommerId = req.id;
        const { title, productId } = req.filtered;
        const product = productId;
        const custommer = custommerId;
        if (typeof title === "string") {
            const newComment = await ormconfig_1.default
                .getRepository(comments_entity_1.CommentsEntity)
                .createQueryBuilder()
                .insert()
                .into(comments_entity_1.CommentsEntity)
                .values({ title, product, custommer })
                .returning(["*"])
                .execute();
            res.status(201).json({
                data: newComment,
                status: 201,
            });
        }
    }
    catch (error) {
        next(new erroHandler_1.ErrorHandler(error, 500));
    }
};
exports.createComment = createComment;
const updateComment = async (req, res, next) => {
    try {
        const { title } = req.filtered;
        const { id } = req.params;
        console.log(title, id);
        const updateCategory = await ormconfig_1.default
            .createQueryBuilder()
            .update(comments_entity_1.CommentsEntity)
            .set({ title })
            .where({ id })
            .returning(["*"])
            .execute();
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
exports.updateComment = updateComment;
