"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const connection_1 = __importDefault(require("./frameworks/database/mongoDb/connection"));
const expressConfig_1 = __importDefault(require("./frameworks/webserver/expressConfig"));
const errorHandlingMiddleware_1 = __importDefault(require("./frameworks/webserver/middlewares/errorHandlingMiddleware"));
const routes_1 = __importDefault(require("./frameworks/webserver/routes"));
const server_1 = __importDefault(require("./frameworks/webserver/server"));
const appError_1 = __importDefault(require("./utils/appError"));
const app = (0, express_1.default)();
//connectDB
(0, connection_1.default)();
//Config setting for exppress 
(0, expressConfig_1.default)(app);
//Routes for each end point
(0, routes_1.default)(app);
app.use(errorHandlingMiddleware_1.default);
// catch 404 and forward to error handler
app.all('*', (req, res, next) => {
    next(new appError_1.default('Not found', 404));
});
// Start the server 
(0, server_1.default)(app);
