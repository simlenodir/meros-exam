"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreateRate = exports.getRate = void 0;
const ormconfig_1 = __importDefault(require("../../config/ormconfig"));
const rating_entity_1 = require("../../entities/rating.entity");
const erroHandler_1 = require("../../exeptions/erroHandler");
const getRate = async (req, res, next) => {
    try {
        const id = req.id;
        const statistic = await ormconfig_1.default.getRepository(rating_entity_1.RatingEntity)
            .find({
            relations: { product: true },
            order: {
                avarage_stars: "DESC"
            },
        });
        res.status(200).json({
            data: statistic,
            status: 200
        });
    }
    catch (error) {
        next(new erroHandler_1.ErrorHandler(error, 500));
    }
};
exports.getRate = getRate;
const CreateRate = async (req, res, next) => {
    try {
        const { stars, productId } = req.filtered;
        const foundRate = await ormconfig_1.default.getRepository(rating_entity_1.RatingEntity)
            .findOne({
            where: {
                product: { id: productId }
            }
        })
            .catch((err) => next(new erroHandler_1.ErrorHandler(err.message, 500)));
        if (!foundRate) {
            const updateCustommerDetail = await ormconfig_1.default.getRepository(rating_entity_1.RatingEntity)
                .createQueryBuilder()
                .insert()
                .into(rating_entity_1.RatingEntity)
                .values({ product: productId, stars, count_stars: 1, avarage_stars: stars })
                .returning(['*'])
                .execute();
            return res.status(201).json({
                message: 'Created successfuly',
                status: 201
            });
        }
        if (foundRate) {
            const newStars = foundRate?.stars + stars;
            const newCountStars = foundRate?.count_stars + 1;
            const avarage_stars = newStars / newCountStars;
            const updateCustommerDetail = await ormconfig_1.default.getRepository(rating_entity_1.RatingEntity)
                .createQueryBuilder()
                .update(rating_entity_1.RatingEntity)
                .set({ product: productId, stars: newStars, count_stars: newCountStars, avarage_stars })
                .where({ product: productId })
                .execute();
            return res.status(201).json({
                message: 'Updated successfuly',
                status: 201
            });
        }
    }
    catch (error) {
        console.log(error);
        next(new erroHandler_1.ErrorHandler(error, 503));
    }
};
exports.CreateRate = CreateRate;
