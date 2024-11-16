"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// src/models/Board.ts
const mongoose_1 = require("mongoose");
const boardSchema = new mongoose_1.Schema({
    title: { type: String, required: true },
    user: { type: mongoose_1.Schema.Types.ObjectId, ref: 'User', required: true },
    tasks: [{ type: mongoose_1.Schema.Types.ObjectId, ref: 'Task' }],
    isPersonal: { type: Boolean, default: false }
});
const Board = (0, mongoose_1.model)('Board', boardSchema);
exports.default = Board;
