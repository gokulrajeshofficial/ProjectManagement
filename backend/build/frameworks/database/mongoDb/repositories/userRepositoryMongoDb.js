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
const mongoose_1 = __importDefault(require("mongoose"));
const userModel_1 = __importDefault(require("../models/userModel"));
function userRepositoryMongoDb() {
    const findByEmail = (email) => __awaiter(this, void 0, void 0, function* () {
        const user = yield userModel_1.default.findOne({ 'email': email });
        return user;
    });
    const addUser = (userData) => __awaiter(this, void 0, void 0, function* () {
        const user = yield userModel_1.default.create(userData);
        return user;
    });
    const findById = (id) => __awaiter(this, void 0, void 0, function* () {
        const user = yield userModel_1.default.findById(id);
        return user;
    });
    const updateUserDetails = (userDetails) => __awaiter(this, void 0, void 0, function* () {
        try {
            console.log(userDetails);
            const id = new mongoose_1.default.Types.ObjectId(userDetails._id);
            const response = yield userModel_1.default.findByIdAndUpdate(id, { $set: Object.assign({}, userDetails) }, { new: true });
            console.log(response);
            return response;
        }
        catch (err) {
            console.log(err);
        }
    });
    return {
        findByEmail, addUser, findById, updateUserDetails
    };
}
exports.default = userRepositoryMongoDb;
