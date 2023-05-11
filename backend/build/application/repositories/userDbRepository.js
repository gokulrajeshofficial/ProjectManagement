"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const userRepository = (repository) => {
    const findByEmail = (email) => { return repository.findByEmail(email); };
    const addUser = (userData) => { return repository.addUser(userData); };
    const findById = (id) => { return repository.findById(id); };
    const updateUserDetails = (userDetails) => { return repository.updateUserDetails(userDetails); };
    return { findByEmail, addUser, findById, updateUserDetails };
};
exports.default = userRepository;
