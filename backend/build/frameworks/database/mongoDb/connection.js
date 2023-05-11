"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const dotenvConfig_1 = __importDefault(require("../../../dotenvConfig"));
const dbOption = {
    useNewUrlParser: true,
    useFindAndModify: false,
    useUnifiedTopology: true
};
const dbConnection = () => {
    mongoose_1.default.connect(`mongodb+srv://pheonixtrek:${dotenvConfig_1.default.mongoDbUrlPass}@pheonixtrek.6gw6dfe.mongodb.net/`).then(() => {
        console.log("Connection has been established");
    }).catch((err) => {
        console.error(err);
    });
};
exports.default = dbConnection;
