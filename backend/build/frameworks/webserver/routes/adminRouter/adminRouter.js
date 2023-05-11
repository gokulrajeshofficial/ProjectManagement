"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const router = express_1.default.Router();
router.route('/')
    .get((req, res) => {
    console.log("Admin router has been reached");
    res.send("Admin router has been reached");
});
exports.default = router;
