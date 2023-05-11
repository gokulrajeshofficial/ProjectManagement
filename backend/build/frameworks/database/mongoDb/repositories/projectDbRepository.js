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
const projectModel_1 = __importDefault(require("../models/projectModel"));
function projectDbRepository() {
    const createProject = (projectDetails) => __awaiter(this, void 0, void 0, function* () {
        const response = yield projectModel_1.default.create(projectDetails);
        return response;
    });
    const getUserProjects = (email) => __awaiter(this, void 0, void 0, function* () {
        try {
            const projects = yield projectModel_1.default.find({ projectMembers: email }).populate('workspace').populate('createdBy').exec();
            return projects;
        }
        catch (error) {
            console.log(error);
        }
    });
    const workspaceProjects = (id) => __awaiter(this, void 0, void 0, function* () {
        const workspaceId = new mongoose_1.default.Types.ObjectId(id);
        try {
            const response = yield projectModel_1.default.find({ workspace: workspaceId }).populate('workspace').populate('createdBy').exec();
            return response;
        }
        catch (err) {
            console.log(err, "error inside project db");
        }
    });
    const deleteWorkspaceProject = (id) => __awaiter(this, void 0, void 0, function* () {
        const workspaceId = new mongoose_1.default.Types.ObjectId(id);
        try {
            const response = yield projectModel_1.default.deleteMany({ workspace: workspaceId });
            return response;
        }
        catch (err) {
            console.log(err, "error inside project db");
        }
    });
    const getProjectMembers = (id) => __awaiter(this, void 0, void 0, function* () {
        const projectId = new mongoose_1.default.Types.ObjectId(id);
        const response = yield projectModel_1.default.aggregate([
            {
                $match: {
                    _id: projectId
                }
            }, {
                $unwind: "$projectMembers"
            },
            {
                $lookup: {
                    from: "userdetails",
                    foreignField: "email",
                    localField: "projectMembers",
                    as: "projectMembers"
                }
            },
            {
                $project: {
                    projectMembers: { $arrayElemAt: ["$projectMembers", 0] }
                }
            }
        ]);
        console.log(response);
        return response;
    });
    return { createProject, getUserProjects, workspaceProjects, deleteWorkspaceProject, getProjectMembers };
}
exports.default = projectDbRepository;
