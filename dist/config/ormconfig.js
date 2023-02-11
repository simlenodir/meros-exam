"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const path_1 = __importDefault(require("path"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const typeorm_1 = require("typeorm");
const dataSource = new typeorm_1.DataSource({
    type: "postgres",
    host: String(process.env.DB_HOST),
    port: 5432,
    database: String(process.env.DB_DATABASE),
    username: String(process.env.DB_DATABASE),
    password: String(process.env.DB_PASSWORD),
    entities: [path_1.default.resolve(__dirname, '..', "entities", "*.entity.{ts,js}")],
    migrations: [path_1.default.resolve(__dirname, '..', "migrations", "**/*.{ts,js}")],
    logging: true,
    synchronize: false
});
exports.default = dataSource;
