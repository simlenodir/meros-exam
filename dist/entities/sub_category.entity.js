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
exports.SubCategoryEntity = void 0;
const typeorm_1 = require("typeorm");
const category_entity_1 = require("./category.entity");
const sub_sub_category_entity_1 = require("./sub_sub_category.entity");
let SubCategoryEntity = class SubCategoryEntity {
    id;
    title;
    category;
    sub_sub_category;
};
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)('uuid', {
        name: "sub_id"
    }),
    __metadata("design:type", String)
], SubCategoryEntity.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], SubCategoryEntity.prototype, "title", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => category_entity_1.CategoriesEntity, (category) => category.sub_category),
    __metadata("design:type", category_entity_1.CategoriesEntity)
], SubCategoryEntity.prototype, "category", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => sub_sub_category_entity_1.SubSubCategoryEntity, sub_sub_category => sub_sub_category.sub_category),
    __metadata("design:type", Array)
], SubCategoryEntity.prototype, "sub_sub_category", void 0);
SubCategoryEntity = __decorate([
    (0, typeorm_1.Entity)({
        name: "sub_categories"
    })
], SubCategoryEntity);
exports.SubCategoryEntity = SubCategoryEntity;
