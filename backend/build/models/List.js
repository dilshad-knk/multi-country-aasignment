"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.List = void 0;
const mongoose_1 = require("mongoose");
const listSchema = new mongoose_1.Schema({
    title: { type: String, required: true },
    board: [{ type: mongoose_1.Schema.Types.ObjectId, ref: 'Board', required: true }],
    tasks: [{ type: mongoose_1.Schema.Types.ObjectId, ref: 'Task' }]
});
exports.List = (0, mongoose_1.model)('List', listSchema);
