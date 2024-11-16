"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.verify = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const verify = (req, res, next) => {
    const token = req.cookies?.token;
    if (!token) {
        return res.status(403).json({
            success: false,
            message: "Access denied. No token provided.",
        });
    }
    jsonwebtoken_1.default.verify(token, process.env.JWT_SECRET, (err, decode) => {
        if (err) {
            return res.status(401).json({
                success: false,
                message: "Unauthorized!!",
                err
            });
        }
        const userId = decode.userId;
        req.userId = userId;
        next();
    });
};
exports.verify = verify;
