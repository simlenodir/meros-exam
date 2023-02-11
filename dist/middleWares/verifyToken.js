"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CheckToken = void 0;
const erroHandler_1 = require("../exeptions/erroHandler");
const jsonwebtoken_1 = __importStar(require("jsonwebtoken"));
const ormconfig_1 = __importDefault(require("../config/ormconfig"));
const custommers_entity_1 = require("../entities/custommers.entity");
const jwt_1 = __importDefault(require("../utils/jwt"));
const CheckToken = async (req, res, next) => {
    try {
        const { token } = req.headers;
        if (!token) {
            res.json({
                message: 'You have not access token'
            });
        }
        const tokenId = jwt_1.default.verify(token);
        const foundUser = await ormconfig_1.default.getRepository(custommers_entity_1.CustommersEntity).find({
            where: {
                id: tokenId
            }
        }).catch((error) => next(new erroHandler_1.ErrorHandler('Invalid token', 500)));
        jsonwebtoken_1.default.verify(token, String(process.env.SECRET_KEY), (err, decode) => {
            if (err instanceof jsonwebtoken_1.JsonWebTokenError) {
                return next(new erroHandler_1.ErrorHandler('Invalid token', 401));
            }
        });
        req.id = foundUser[0]?.id;
        next();
    }
    catch (error) {
        next(new erroHandler_1.ErrorHandler('Provide access token', 401));
    }
};
exports.CheckToken = CheckToken;
