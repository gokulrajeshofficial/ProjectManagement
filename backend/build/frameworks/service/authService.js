"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.authService = void 0;
const bcrypt_1 = __importDefault(require("bcrypt"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const dotenvConfig_1 = __importDefault(require("../../dotenvConfig"));
const authService = () => {
    const encryptPassword = (password) => __awaiter(void 0, void 0, void 0, function* () {
        const genSalt = yield bcrypt_1.default.genSalt(10);
        password = yield bcrypt_1.default.hash(password, genSalt);
        return password;
    });
    const comparePassword = (password, encryptPassword) => __awaiter(void 0, void 0, void 0, function* () {
        const status = yield bcrypt_1.default.compare(password, encryptPassword);
        return status;
    });
    const generateAccessToken = (payload) => __awaiter(void 0, void 0, void 0, function* () {
        const token = yield jsonwebtoken_1.default.sign({ payload }, dotenvConfig_1.default.access_token_key, { expiresIn: '30s' });
        return token;
    });
    const generateRefreshToken = (payload) => __awaiter(void 0, void 0, void 0, function* () {
        console.log("user", payload);
        const token = yield jsonwebtoken_1.default.sign({ payload }, dotenvConfig_1.default.refresh_token_key, { expiresIn: "12w" });
        return token;
    });
    const verifyRefreshToken = (token) => __awaiter(void 0, void 0, void 0, function* () {
        const response = yield jsonwebtoken_1.default.verify(token, dotenvConfig_1.default.refresh_token_key);
        return response;
    });
    const verifyAccessToken = (token) => __awaiter(void 0, void 0, void 0, function* () {
        return jsonwebtoken_1.default.verify(token, dotenvConfig_1.default.access_token_key);
    });
    return {
        encryptPassword,
        comparePassword,
        generateAccessToken,
        generateRefreshToken,
        verifyRefreshToken,
        verifyAccessToken
    };
};
exports.authService = authService;
