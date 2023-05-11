"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function projectRepository(repository) {
    const createProject = (projectDetails) => { return repository.createProject(projectDetails); };
    const getUserProjects = (email) => { return repository.getUserProjects(email); };
    const workspaceProjects = (workspaceId) => { return repository.workspaceProjects(workspaceId); };
    const deleteWorkspaceProject = (workspaceId) => { return repository.deleteWorkspaceProject(workspaceId); };
    const getProjectMembers = (projectId) => { return repository.getProjectMembers(projectId); };
    return { createProject, getUserProjects, workspaceProjects, deleteWorkspaceProject, getProjectMembers };
}
exports.default = projectRepository;
