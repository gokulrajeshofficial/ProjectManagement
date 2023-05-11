"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.authServiceInterface = void 0;
const authServiceInterface = (service) => {
    const encryptPassword = (password) => {
        return service.encryptPassword(password);
    };
    const comparePassword = (password, encryptPassword) => {
        return service.comparePassword(password, encryptPassword);
    };
    const generateAccessToken = (payload) => {
        return service.generateAccessToken(payload);
    };
    const generateRefreshToken = (payload) => {
        return service.generateRefreshToken(payload);
    };
    const verifyAccessToken = (token) => {
        return service.verifyAccessToken(token);
    };
    const verifyRefreshToken = (token) => {
        return service.verifyRefreshToken(token);
    };
    return {
        encryptPassword,
        comparePassword,
        generateAccessToken,
        generateRefreshToken,
        verifyAccessToken,
        verifyRefreshToken
    };
};
exports.authServiceInterface = authServiceInterface;
