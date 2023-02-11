"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const sorting_1 = require("./sorting");
const sortingRouter = (0, express_1.Router)();
exports.default = sortingRouter
    .get('/sortBySold-product', sorting_1.SortingBySoldProduct)
    .get('/discont-products', sorting_1.getDiscontProducts)
    .get('/rate-products', sorting_1.getRateProducts)
    .get('/get-newProducts', sorting_1.getNewProducts)
    .get('/get-oldProducts', sorting_1.getOldProducts);
