"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenvConfig_1 = __importDefault(require("../../dotenvConfig"));
const serverConfig = (app) => {
    const port = dotenvConfig_1.default.port;
    app.listen(port, () => {
        console.log(`Server listening on Port ${port}`);
    });
};
exports.default = serverConfig;
