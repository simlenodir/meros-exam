"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.foundUser = exports.authLogin = exports.authRegistration = void 0;
const ormconfig_1 = __importDefault(require("../../config/ormconfig"));
const custommers_entity_1 = require("../../entities/custommers.entity");
const erroHandler_1 = require("../../exeptions/erroHandler");
const jwt_1 = __importDefault(require("../../utils/jwt"));
const authRegistration = async (req, res, next) => {
    try {
        const { first_name, last_name, email, phone, password } = req.filtered;
        const existingUser = await ormconfig_1.default.getRepository(custommers_entity_1.CustommersEntity)
            .findOne({
            where: {
                email,
                password
            }
        });
        if (existingUser) {
            res.status(401).json({
                message: 'Sorry Exists in database'
            });
            return;
        }
        const newCustommer = await ormconfig_1.default.getRepository(custommers_entity_1.CustommersEntity)
            .createQueryBuilder()
            .insert()
            .into(custommers_entity_1.CustommersEntity)
            .values({ first_name, last_name, email, phone, password })
            .returning("*")
            .execute();
        const id = newCustommer.raw[0].custommer_id;
        res.status(201).json({
            token: jwt_1.default.sign(id),
        });
    }
    catch (error) {
        next(new erroHandler_1.ErrorHandler(error, 503));
    }
};
exports.authRegistration = authRegistration;
const authLogin = async (req, res, next) => {
    try {
        const { email, password } = req.filtered;
        const foundUser = await ormconfig_1.default.getRepository(custommers_entity_1.CustommersEntity)
            .findOne({
            where: {
                email,
                password
            }
        });
        if (!foundUser) {
            res.status(401).json({
                message: 'Sorry password or email is error'
            });
            return;
        }
        const id = foundUser.id;
        res.status(201).json({
            token: jwt_1.default.sign(id)
        });
    }
    catch (error) {
        next(new erroHandler_1.ErrorHandler(error, 503));
    }
};
exports.authLogin = authLogin;
const foundUser = async (req, res, next) => {
    try {
        const { token } = req.headers;
        if (typeof token == 'string') {
            const id = jwt_1.default.verify(token);
            const foundUser = await ormconfig_1.default.getRepository(custommers_entity_1.CustommersEntity)
                .findOne({
                where: {
                    id
                }
            });
            if (!foundUser) {
                res.status(401).json({
                    message: 'Sorry Exists in database'
                });
                return;
            }
        }
    }
    catch (error) {
        next(new erroHandler_1.ErrorHandler(error, 503));
    }
};
exports.foundUser = foundUser;
