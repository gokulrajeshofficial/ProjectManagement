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
const workspaceRepository = (repository) => {
    const createWorkspace = (workspaceDetails) => __awaiter(void 0, void 0, void 0, function* () { return repository.createWorkspace(workspaceDetails); });
    const getUserWorkspaces = (userId) => __awaiter(void 0, void 0, void 0, function* () { return repository.getUserWorkspaces(userId); });
    const getSharedWorkspaces = (email) => __awaiter(void 0, void 0, void 0, function* () { return yield repository.getSharedWorkspaces(email); });
    const inviteUser = (workspaceId, email) => __awaiter(void 0, void 0, void 0, function* () { return yield repository.inviteUser(workspaceId, email); });
    const getWorkspaceById = (workspaceId) => __awaiter(void 0, void 0, void 0, function* () { return repository.getWorkspaceById(workspaceId); });
    const updateSharedUser = (decryptedEmail, workspaceId) => __awaiter(void 0, void 0, void 0, function* () { return repository.updateSharedUser(decryptedEmail, workspaceId); });
    const getworkspaceMembers = (workspaceId) => __awaiter(void 0, void 0, void 0, function* () { return repository.getworkspaceMembers(workspaceId); });
    const deleteWorkspace = (workspaceId) => __awaiter(void 0, void 0, void 0, function* () { return repository.deleteWorkspace(workspaceId); });
    return { createWorkspace, getUserWorkspaces, getSharedWorkspaces, inviteUser, getWorkspaceById, updateSharedUser, getworkspaceMembers, deleteWorkspace };
};
exports.default = workspaceRepository;
