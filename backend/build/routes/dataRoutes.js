"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const dataController_1 = require("../controllers/dataController");
const authMiddleware_1 = require("../middleware/authMiddleware");
const router = express_1.default.Router();
router.use(authMiddleware_1.verify);
router.post('/data/create', dataController_1.createData);
router.get('/data/getDataByCountry', dataController_1.fetchDataByCountry);
router.get('/data/fetch', dataController_1.fetchAll);
router.put('/data/edit/:id', dataController_1.editData);
router.delete('/data/delete/:id', dataController_1.deleteData);
router.put('/data/changeCountry/:country', dataController_1.changeCountry);
router.post('/logout', dataController_1.logout);
exports.default = router;
