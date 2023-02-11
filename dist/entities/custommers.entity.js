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
exports.CustommersEntity = void 0;
const typeorm_1 = require("typeorm");
const comments_entity_1 = require("./comments.entity");
const orders_entity_1 = require("./orders.entity");
const product_entity_1 = require("./product.entity");
let CustommersEntity = class CustommersEntity {
    id;
    first_name;
    last_name;
    password;
    phone;
    email;
    gender;
    avatar;
    order;
    comments;
    product;
};
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)('uuid', {
        name: "custommer_id"
    }),
    __metadata("design:type", String)
], CustommersEntity.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], CustommersEntity.prototype, "first_name", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], CustommersEntity.prototype, "last_name", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], CustommersEntity.prototype, "password", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], CustommersEntity.prototype, "phone", void 0);
__decorate([
    (0, typeorm_1.Column)({
        unique: true
    }),
    __metadata("design:type", String)
], CustommersEntity.prototype, "email", void 0);
__decorate([
    (0, typeorm_1.Column)({
        nullable: true
    }),
    __metadata("design:type", String)
], CustommersEntity.prototype, "gender", void 0);
__decorate([
    (0, typeorm_1.Column)({
        nullable: true
    }),
    __metadata("design:type", String)
], CustommersEntity.prototype, "avatar", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => orders_entity_1.OrdersEntity, (order) => order.custommer),
    __metadata("design:type", Array)
], CustommersEntity.prototype, "order", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => comments_entity_1.CommentsEntity, comments => comments.custommer),
    __metadata("design:type", Array)
], CustommersEntity.prototype, "comments", void 0);
__decorate([
    (0, typeorm_1.ManyToMany)(() => product_entity_1.ProductsEntity, product => product.customer),
    __metadata("design:type", Array)
], CustommersEntity.prototype, "product", void 0);
CustommersEntity = __decorate([
    (0, typeorm_1.Entity)({
        name: "custommers"
    })
], CustommersEntity);
exports.CustommersEntity = CustommersEntity;
