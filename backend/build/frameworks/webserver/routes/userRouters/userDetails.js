"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const userRepositoryMongoDb_1 = __importDefault(require("../../../database/mongoDb/repositories/userRepositoryMongoDb"));
const userDbRepository_1 = __importDefault(require("../../../../application/repositories/userDbRepository"));
const userDetailsController_1 = __importDefault(require("../../../../adapters/controller/userDetailsController"));
const router = express_1.default.Router();
const controller = (0, userDetailsController_1.default)(userRepositoryMongoDb_1.default, userDbRepository_1.default);
//-------------------------Verify User--------------------------//
router.post('/verifyEmailId', controller.verifyUserByMail);
//--------------------------Change User Details-----------------//
router.put('/editProfile', controller.editUserDetails);
exports.default = router;
