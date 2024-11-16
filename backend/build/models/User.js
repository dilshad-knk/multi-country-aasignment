"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const userSchema = new mongoose_1.Schema({
    username: { type: String, required: true, unique: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    country: { type: String, required: true },
    role: { type: String, enum: ["admin", "viewer", "superadmin"], required: true },
});
const User = (0, mongoose_1.model)("User", userSchema);
exports.default = User;