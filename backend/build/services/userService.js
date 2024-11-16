"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.login = exports.createUserWithBoard = void 0;
const User_1 = __importDefault(require("../models/User"));
const bcrypt_1 = __importDefault(require("bcrypt"));
const createUserWithBoard = async (email, password) => {
    try {
    }
    catch (error) {
        console.log('failed to create user with board', `error: ${error}`);
        throw error;
    }
};
exports.createUserWithBoard = createUserWithBoard;
const login = async (email, password) => {
    try {
        const user = await User_1.default.findOne({ email });
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }
        const isValid = await bcrypt_1.default.compare(password, user.password);
    }
    catch (error) {
    }
};
exports.login = login;
