"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const userAuthController_1 = __importDefault(require("../../../../adapters/controller/userAuthController"));
const userRepositoryMongoDb_1 = __importDefault(require("../../../database/mongoDb/repositories/userRepositoryMongoDb"));
const userDbRepository_1 = __importDefault(require("../../../../application/repositories/userDbRepository"));
const authServiceInterface_1 = require("../../../../application/services/authServiceInterface");
const authService_1 = require("../../../service/authService");
const workspaceRepository_1 = __importDefault(require("../../../../application/repositories/workspaceRepository"));
const workspaceDbRepository_1 = __importDefault(require("../../../database/mongoDb/repositories/workspaceDbRepository"));
const router = express_1.default.Router();
const controller = (0, userAuthController_1.default)(userRepositoryMongoDb_1.default, userDbRepository_1.default, authService_1.authService, authServiceInterface_1.authServiceInterface, workspaceRepository_1.default, workspaceDbRepository_1.default);
//-------------------------Verify User--------------------------//
router.post('/verifyEmailId', controller.emailVerification);
//-------------------------User Register--------------------------//
router.post('/register', controller.userRegister);
//------------------------User Signin ---------------------------//
router.post('/login', controller.userLogin);
//------------------------User Google Login ----------------------------//
router.post('/google/login', controller.googleLogin);
//------------------------User Login ----------------------------//
router.post('/accessToken', controller.acessToken);
exports.default = router;
