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
const user_1 = require("../../application/useCases/user/user");
const express_async_handler_1 = __importDefault(require("express-async-handler"));
const userDetailsController = (userRepositoryMongoDb, userRepository) => {
    const userRepo = userRepository(userRepositoryMongoDb());
    const verifyUserByMail = (req, res) => {
    };
    const editUserDetails = (0, express_async_handler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
        const userDetails = req.body.userProfile;
        const updateUserDetails = yield (0, user_1.userDetailsEdit)(userDetails, userRepo);
        res.status(200).json(updateUserDetails);
    }));
    return { verifyUserByMail, editUserDetails };
};
exports.default = userDetailsController;
