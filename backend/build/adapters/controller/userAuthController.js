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
const express_async_handler_1 = __importDefault(require("express-async-handler"));
//UseCases
const userAuth_1 = require("../../application/useCases/auth/userAuth");
const userAuthController = (userRepositoryMongoDb, userRepository, authService, authServiceInterface, workspaceRepository, workspaceDbRepository) => {
    const userDbRepository = userRepository(userRepositoryMongoDb());
    const workspaceRepo = workspaceRepository(workspaceDbRepository());
    const authServices = authServiceInterface(authService());
    const emailVerification = (0, express_async_handler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
        const { email } = req.body;
        console.log(email);
        const status = yield (0, userAuth_1.isEmailValid)(email, userDbRepository);
        console.log(status);
        res.json(status);
    }));
    const userRegister = (0, express_async_handler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
        let userData = req.body.userData;
        let workspaceDetails = req.body.workspaceCreation;
        let inviteList = req.body.inviteList;
        workspaceDetails.invitedUsers = inviteList;
        console.log(userData, workspaceDetails);
        const response = yield (0, userAuth_1.registerUser)(userData, workspaceDetails, userDbRepository, authServices, workspaceRepo);
        res.json(response);
    }));
    const userLogin = (0, express_async_handler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
        let { email, password } = req.body;
        const response = yield (0, userAuth_1.loginUser)(email, password, userDbRepository, authServices);
        res.cookie("refreshToken", response.refreshToken, { httpOnly: true });
        res.json(response);
    }));
    const googleLogin = (0, express_async_handler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
        const { email } = req.body;
        const response = yield (0, userAuth_1.googleLoginUser)(email, userDbRepository, authServices);
        res.cookie("refreshToken", response.refreshToken, { httpOnly: true });
        res.json(response);
    }));
    const acessToken = (0, express_async_handler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
        var _a;
        const refreshToken = (_a = req.cookies) === null || _a === void 0 ? void 0 : _a.refreshToken;
        const response = yield (0, userAuth_1.getAccessToken)(refreshToken, userDbRepository, authServices);
        res.json(response);
    }));
    return {
        emailVerification,
        userRegister,
        userLogin,
        googleLogin,
        acessToken
    };
};
exports.default = userAuthController;
