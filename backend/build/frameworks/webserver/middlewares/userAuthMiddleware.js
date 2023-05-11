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
Object.defineProperty(exports, "__esModule", { value: true });
const httpStatus_1 = require("../../../types/httpStatus");
const authService_1 = require("../../service/authService");
const userAuthMiddleware = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const authHeader = req.headers['authorization'];
    let token = null;
    console.log("Reached the userAuth middleware");
    if (authHeader && authHeader.startsWith('Bearer')) {
        token = authHeader.split(" ")[1];
        console.log(token, "Token displayed");
        try {
            const response = yield (0, authService_1.authService)().verifyAccessToken(token);
            req.body.userId = response === null || response === void 0 ? void 0 : response.payload;
            next();
        }
        catch (err) {
            console.log(err);
            console.log("Reached error");
            res.status(httpStatus_1.HttpStatus.FORBIDDEN).json(err);
        }
    }
    if (!token) {
        console.log("No token recieved");
        res.status(httpStatus_1.HttpStatus.UNAUTHORIZED).json({ err: "User is Unauthorized , No token recieved" });
    }
});
exports.default = userAuthMiddleware;
