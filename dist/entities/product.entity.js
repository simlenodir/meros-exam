"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProductsEntity = void 0;
const typeorm_1 = require("typeorm");
const comments_entity_1 = require("./comments.entity");
const custommers_entity_1 = require("./custommers.entity");
const rating_entity_1 = require("./rating.entity");
const orders_entity_1 = require("./orders.entity");
const sub_sub_category_entity_1 = require("./sub_sub_category.entity");
let ProductsEntity = class ProductsEntity {
    id;
    title;
    price;
    discont_price;
    brand;
    size;
    netto;
    author;
    description;
    color;
    made_in;
    img;
    img1;
    img2;
    on_sale;
    discont;
    sold_count;
    time;
    subSubCategory;
    rate;
    order;
    comments;
    customer;
};
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)("uuid", {
        name: "product_id",
    }),
    __metadata("design:type", String)
], ProductsEntity.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], ProductsEntity.prototype, "title", void 0);
__decorate([
    (0, typeorm_1.Column)("decimal", {
        nullable: true,
    }),
    __metadata("design:type", Number)
], ProductsEntity.prototype, "price", void 0);
__decorate([
    (0, typeorm_1.Column)("decimal", { default: 0 }),
    __metadata("design:type", Number)
], ProductsEntity.prototype, "discont_price", void 0);
__decorate([
    (0, typeorm_1.Column)({
        nullable: true,
    }),
    __metadata("design:type", String)
], ProductsEntity.prototype, "brand", void 0);
__decorate([
    (0, typeorm_1.Column)({
        nullable: true,
    }),
    __metadata("design:type", String)
], ProductsEntity.prototype, "size", void 0);
__decorate([
    (0, typeorm_1.Column)({
        nullable: true,
    }),
    __metadata("design:type", String)
], ProductsEntity.prototype, "netto", void 0);
__decorate([
    (0, typeorm_1.Column)({
        nullable: true,
    }),
    __metadata("design:type", String)
], ProductsEntity.prototype, "author", void 0);
__decorate([
    (0, typeorm_1.Column)({
        nullable: true,
    }),
    __metadata("design:type", String)
], ProductsEntity.prototype, "description", void 0);
__decorate([
    (0, typeorm_1.Column)({
        nullable: true,
    }),
    __metadata("design:type", String)
], ProductsEntity.prototype, "color", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], ProductsEntity.prototype, "made_in", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], ProductsEntity.prototype, "img", void 0);
__decorate([
    (0, typeorm_1.Column)({
        nullable: true,
    }),
    __metadata("design:type", String)
], ProductsEntity.prototype, "img1", void 0);
__decorate([
    (0, typeorm_1.Column)({
        nullable: true,
    }),
    __metadata("design:type", String)
], ProductsEntity.prototype, "img2", void 0);
__decorate([
    (0, typeorm_1.Column)("boolean", { default: true }),
    __metadata("design:type", Boolean)
], ProductsEntity.prototype, "on_sale", void 0);
__decorate([
    (0, typeorm_1.Column)("int", { default: 0 }),
    __metadata("design:type", Number)
], ProductsEntity.prototype, "discont", void 0);
__decorate([
    (0, typeorm_1.Column)("int", { default: 0 }),
    __metadata("design:type", Number)
], ProductsEntity.prototype, "sold_count", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: "timestamp", default: () => "CURRENT_TIMESTAMP" }),
    __metadata("design:type", String)
], ProductsEntity.prototype, "time", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => sub_sub_category_entity_1.SubSubCategoryEntity, (subSubCategory) => subSubCategory.products),
    __metadata("design:type", sub_sub_category_entity_1.SubSubCategoryEntity)
], ProductsEntity.prototype, "subSubCategory", void 0);
__decorate([
    (0, typeorm_1.OneToOne)(() => rating_entity_1.RatingEntity, (rate) => rate.product),
    __metadata("design:type", Array)
], ProductsEntity.prototype, "rate", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => orders_entity_1.OrdersEntity, (order) => order.product),
    __metadata("design:type", Array)
], ProductsEntity.prototype, "order", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => comments_entity_1.CommentsEntity, (comments) => comments.product, {
        onDelete: "CASCADE",
        cascade: true
    }),
    __metadata("design:type", Array)
], ProductsEntity.prototype, "comments", void 0);
__decorate([
    (0, typeorm_1.ManyToMany)(() => custommers_entity_1.CustommersEntity, (customer) => customer.product),
    (0, typeorm_1.JoinTable)(),
    __metadata("design:type", custommers_entity_1.CustommersEntity)
], ProductsEntity.prototype, "customer", void 0);
ProductsEntity = __decorate([
    (0, typeorm_1.Entity)({
        name: "products"
    })
], ProductsEntity);
exports.ProductsEntity = ProductsEntity;
