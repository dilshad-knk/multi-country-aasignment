"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
const cors_1 = __importDefault(require("cors"));
const userRoutes_1 = __importDefault(require("./routes/userRoutes"));
const dataRoutes_1 = __importDefault(require("./routes/dataRoutes"));
const db_1 = __importDefault(require("./config/db"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const app = (0, express_1.default)();
dotenv_1.default.config();
(0, db_1.default)();
app.use((0, cors_1.default)({
    credentials: true,
    origin: true
}));
app.use(express_1.default.json());
app.use((0, cookie_parser_1.default)());
app.use('/api/v1', userRoutes_1.default);
app.use('/api/v1', dataRoutes_1.default);
app.listen(process.env.PORT, () => {
    console.log(`server is running ${process.env.PORT || 4000}`);
});
