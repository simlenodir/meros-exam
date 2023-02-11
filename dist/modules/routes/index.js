"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const routes_1 = __importDefault(require("../categories/routes"));
const routes_2 = __importDefault(require("../products/routes"));
const routes_3 = __importDefault(require("../subCategories/routes"));
const routes_4 = __importDefault(require("../subSub/routes"));
const routes_5 = __importDefault(require("../auth/routes"));
const routes_6 = __importDefault(require("../custommer/routes"));
const routes_7 = __importDefault(require("../comments/routes"));
const routes_8 = __importDefault(require("../orders/routes"));
const routes_9 = __importDefault(require("../rate/routes"));
const routes_10 = __importDefault(require("../sorting/routes"));
const router = (0, express_1.Router)();
exports.default = router
    .use('/meros', routes_1.default)
    .use('/meros', routes_3.default)
    .use('/meros', routes_4.default)
    .use('/meros', routes_2.default)
    .use('/meros', routes_5.default)
    .use('/meros', routes_6.default)
    .use('/meros', routes_7.default)
    .use('/meros', routes_8.default)
    .use('/meros', routes_9.default)
    .use('/meros', routes_10.default);
