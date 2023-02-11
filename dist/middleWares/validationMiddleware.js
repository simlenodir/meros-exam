"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const erroHandler_1 = require("../exeptions/erroHandler");
exports.default = (schema) => {
    return (req, res, next) => {
        try {
            const { error, value } = schema.validate(req.body);
            if (error) {
                next(res.status(400).json({
                    message: error.message
                }));
            }
            req.filtered = value;
            next();
        }
        catch (error) {
            next(new erroHandler_1.ErrorHandler(error.message, 500));
        }
    };
};
