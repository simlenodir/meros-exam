"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PostUserDetail = exports.getCustommerById = void 0;
const ormconfig_1 = __importDefault(require("../../config/ormconfig"));
const custommers_entity_1 = require("../../entities/custommers.entity");
const erroHandler_1 = require("../../exeptions/erroHandler");
const getCustommerById = async (req, res, next) => {
    try {
        const id = req.id;
        const foundCustommer = await ormconfig_1.default.getRepository(custommers_entity_1.CustommersEntity).find({
            relations: { comments: { product: true } },
            select: {
                comments: {
                    title: true,
                    product: {
                        title: true,
                        price: true,
                        discont: true,
                        discont_price: true,
                        brand: true
                    },
                },
            },
            where: { id: id },
        });
        res.status(200).json({
            data: foundCustommer,
            status: 200,
        });
    }
    catch (error) {
        next(new erroHandler_1.ErrorHandler(error, 500));
    }
};
exports.getCustommerById = getCustommerById;
const PostUserDetail = async (req, res, next) => {
    try {
        const { first_name, last_name, email, phone, password, gender } = req.filtered;
        const { filename } = req.file;
        const avatar = filename;
        const id = req.id;
        console.log(filename, id, gender);
        console.log(req.filtered);
        const updateCustommerDetail = await ormconfig_1.default
            .getRepository(custommers_entity_1.CustommersEntity)
            .createQueryBuilder()
            .update(custommers_entity_1.CustommersEntity)
            .set({ first_name, last_name, email, phone, password, gender, avatar })
            .where({ id })
            .returning(["*"])
            .execute();
        console.log(updateCustommerDetail);
        res.status(201).json({
            message: "Updated successfuly",
            status: 201,
        });
    }
    catch (error) {
        console.log(error);
        next(new erroHandler_1.ErrorHandler(error, 503));
    }
};
exports.PostUserDetail = PostUserDetail;
