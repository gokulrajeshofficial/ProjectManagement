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
exports.getAccessToken = exports.googleLoginUser = exports.loginUser = exports.registerUser = exports.isEmailValid = void 0;
const httpStatus_1 = require("../../../types/httpStatus");
const appError_1 = __importDefault(require("../../../utils/appError"));
const worksSpace_1 = require("../workSpace/worksSpace");
const isEmailValid = (email, userDbRepository) => __awaiter(void 0, void 0, void 0, function* () {
    email = email.toLowerCase();
    const user = yield userDbRepository.findByEmail(email);
    if (user) {
        throw new appError_1.default("E-mail already exists", httpStatus_1.HttpStatus.UNAUTHORIZED);
    }
    return true;
});
exports.isEmailValid = isEmailValid;
const registerUser = (userData, workspaceDetails, userDbRepository, authServices, workspaceRepo) => __awaiter(void 0, void 0, void 0, function* () {
    userData.email = userData.email.toLowerCase();
    userData.password = yield authServices.encryptPassword(userData.password);
    const user = yield userDbRepository.addUser(userData);
    const workspace = yield (0, worksSpace_1.workspaceCreation)(workspaceDetails, user._id.toString(), workspaceRepo, userDbRepository);
    // const generatedLink = await generateLink(user._id.toString());
    // const mailResponse = await sendVerifyMail(user .email, generatedLink); 
    return { user, workspace };
});
exports.registerUser = registerUser;
const loginUser = (email, password, userDbRepository, authServices) => __awaiter(void 0, void 0, void 0, function* () {
    const user = yield userDbRepository.findByEmail(email);
    console.log(user);
    if (!user) {
        throw new appError_1.default("this user does't exist", httpStatus_1.HttpStatus.UNAUTHORIZED);
    }
    else {
        const authenticate = yield authServices.comparePassword(password, user.password);
        if (!authenticate) {
            throw new appError_1.default("Sorry , Password entered is incorrect", httpStatus_1.HttpStatus.UNAUTHORIZED);
        }
        const token = yield authServices.generateAccessToken(user._id);
        const refreshToken = yield authServices.generateRefreshToken(user._id);
        console.log(token, refreshToken);
        return { user, token, refreshToken };
    }
});
exports.loginUser = loginUser;
const googleLoginUser = (email, userDbRepository, authServices) => __awaiter(void 0, void 0, void 0, function* () {
    const user = yield userDbRepository.findByEmail(email);
    if (!user) {
        throw new appError_1.default("this user does't exist", httpStatus_1.HttpStatus.UNAUTHORIZED);
    }
    else {
        const token = yield authServices.generateAccessToken(user._id);
        const refreshToken = yield authServices.generateRefreshToken(user._id);
        console.log(refreshToken);
        return { user, token, refreshToken };
    }
});
exports.googleLoginUser = googleLoginUser;
const getAccessToken = (refreshToken, userDbRepository, authServices) => __awaiter(void 0, void 0, void 0, function* () {
    const response = yield authServices.verifyRefreshToken(refreshToken);
    if (typeof (response) != 'object') {
        throw new appError_1.default(response, httpStatus_1.HttpStatus.UNAUTHORIZED);
    }
    const accessToken = yield authServices.generateAccessToken(response.payload);
    console.log("New Access token", accessToken);
    return accessToken;
});
exports.getAccessToken = getAccessToken;
