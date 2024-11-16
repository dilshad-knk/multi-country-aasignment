"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const taskSchema = new mongoose_1.Schema({
    user: { type: mongoose_1.Schema.Types.ObjectId, ref: 'User', required: true },
    title: { type: String },
    description: { type: String },
    priority: { type: String, enum: ['low', 'high', 'urgent'], default: 'low' },
    deadline: { type: String },
    status: { type: String, enum: ['todo', 'under_review', 'in_progress', 'finished'], default: 'todo' },
    createdAt: { type: Date, default: Date.now,
    },
});
const Task = (0, mongoose_1.model)('Task', taskSchema);
exports.default = Task;
