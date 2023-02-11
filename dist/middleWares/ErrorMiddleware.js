"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const erroHandler_1 = require("../exeptions/erroHandler");
exports.default = (err, req, res, next) => {
    if (err instanceof erroHandler_1.ErrorHandler) {
        res.json({
            message: err.message,
            status: err.status
        });
    }
    res.json({
        message: 'Internal server error',
        status: 500
    });
};
