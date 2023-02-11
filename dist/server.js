"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const erroHandler_1 = require("./exeptions/erroHandler");
const ErrorMiddleware_1 = __importDefault(require("./middleWares/ErrorMiddleware"));
const routes_1 = __importDefault(require("./modules/routes"));
const dotenv_1 = __importDefault(require("dotenv"));
const ormconfig_1 = __importDefault(require("./config/ormconfig"));
const swagger_ui_express_1 = __importDefault(require("swagger-ui-express"));
const docs_json_1 = __importDefault(require("./docs.json"));
dotenv_1.default.config();
const app = (0, express_1.default)();
const PORT = process.env.PORT || 9090;
const main = () => {
    try {
        app.use(express_1.default.json());
        ormconfig_1.default
            .initialize();
        app.use(routes_1.default);
        app.use(ErrorMiddleware_1.default);
        app.use('/swagger', swagger_ui_express_1.default.serve, swagger_ui_express_1.default.setup(docs_json_1.default));
    }
    catch (error) {
        throw new erroHandler_1.ErrorHandler('Interval server error', 500);
    }
    finally {
        app.listen(PORT, () => {
            console.log(`App started ${PORT}`);
        });
    }
};
main();
