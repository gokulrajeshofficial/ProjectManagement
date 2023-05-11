"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const cors_1 = __importDefault(require("cors"));
const morgan_1 = __importDefault(require("morgan"));
const express_1 = __importDefault(require("express"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const corsOption = {
    origin: "http://localhost:5173",
    methods: ['GET', 'PUT', 'PATCH', 'POST', 'DELETE'],
    credentials: true
};
const expressConfig = (app) => {
    app.use((0, morgan_1.default)('dev'));
    app.use((0, cors_1.default)(corsOption));
    app.use(express_1.default.json());
    app.use(express_1.default.urlencoded({ extended: true }));
    app.use((0, cookie_parser_1.default)());
};
exports.default = expressConfig;
