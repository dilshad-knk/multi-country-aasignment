"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.changeCountry = exports.logout = exports.fetchAll = exports.fetchDataByCountry = exports.deleteData = exports.editData = exports.createData = void 0;
const Data_1 = __importDefault(require("../models/Data"));
const User_1 = __importDefault(require("../models/User"));
const createData = async (req, res) => {
    try {
        const userId = req.userId;
        const { title, description, createdBy, country } = req.body;
        const user = await User_1.default.findById(userId);
        if (!user)
            return res.status(404).json({ error: "user not found" });
        if (user.role == "admin") {
            const data = new Data_1.default({
                title,
                description,
                createdBy: userId,
                country,
            });
            await data.save();
            res.status(201).json({
                success: true,
                message: 'Data created successfully',
                data
            });
        }
        else {
            res.status(401).json({ message: "Un authorized" });
        }
    }
    catch (error) {
        console.log(error);
        return res.status(500).json({ error: "error creatin Data" });
    }
};
exports.createData = createData;
const editData = async (req, res) => {
    try {
        const { id } = req.params;
        const { title, description, createdBy, country } = req.body;
        const userId = req.userId;
        const user = await User_1.default.findById(userId);
        if (!user)
            return res.status(404).json({ error: "user not found" });
        if (user.role == "admin") {
            const updatedData = await Data_1.default.findByIdAndUpdate(id, { title, description, createdBy: userId, country }, { new: true, runValidators: true });
            if (!updatedData) {
                return res.status(404).json({ error: "Data not found" });
            }
            res
                .status(200)
                .json({ message: "Data updated successfully", data: updatedData });
        }
        else {
            res.status(401).json({ message: "Un authorized" });
        }
    }
    catch (error) {
        res.status(500).json({ error: "Failed to update data", details: error });
    }
};
exports.editData = editData;
const deleteData = async (req, res) => {
    try {
        const { id } = req.params;
        const userId = req.userId;
        const user = await User_1.default.findById(userId);
        if (!user)
            return res.status(404).json({ error: "user not found" });
        if (user.role == "admin") {
            const deletedData = await Data_1.default.findByIdAndDelete(id);
            if (!deletedData) {
                return res.status(404).json({ error: "Data not found" });
            }
            res.status(200).json({ message: "Data deleted successfully" });
        }
        else {
            res.status(401).json({ message: "Un authorized" });
        }
    }
    catch (error) {
        res.status(500).json({ error: "Failed to delete data", details: error });
    }
};
exports.deleteData = deleteData;
const fetchDataByCountry = async (req, res) => {
    try {
        const { country } = req.query;
        const userId = req.userId;
        const user = await User_1.default.findById(userId);
        const data = await Data_1.default.find({ country })
            .populate("createdBy", "username email country role");
        res.status(200).json({ data });
    }
    catch (error) {
        res.status(500).json({ error: "Failed to fetch data", details: error });
    }
};
exports.fetchDataByCountry = fetchDataByCountry;
const fetchAll = async (req, res) => {
    try {
        const userId = req.userId;
        const user = await User_1.default.findById(userId);
        if (user?.role == "viewer") {
            return res
                .status(500)
                .json({ error: "Failed to fetch data", });
        }
        const data = await Data_1.default.find().populate("createdBy", "username");
        if (data.length === 0) {
            return res.status(404).json({ error: "No data found" });
        }
        res.status(200).json({ data });
    }
    catch (error) {
        res.status(500).json({ error: "Failed to fetch data", details: error });
    }
};
exports.fetchAll = fetchAll;
const logout = (req, res) => {
    try {
        res.cookie("token", "", {
            httpOnly: true,
            secure: true,
            sameSite: "strict",
            expires: new Date(0),
            path: "/",
        });
        res.status(200).json({ message: "Logout successful" });
    }
    catch (error) {
        console.error("Error during logout:", error);
        res.status(500).json({ error: "Internal server error" });
    }
};
exports.logout = logout;
const changeCountry = async (req, res) => {
    try {
        const { country } = req.params;
        const userId = req.userId;
        const user = await User_1.default.findById(userId);
        if (!user)
            return res.status(404).json({ error: "user not found" });
        if (user.role == "admin") {
            const updateUser = await User_1.default.findByIdAndUpdate(userId, { country }, { new: true, runValidators: true });
            if (!updateUser) {
                return res.status(404).json({ error: "Country not found" });
            }
            const userData = {
                username: updateUser.username,
                country: updateUser.country,
                role: updateUser.role
            };
            res
                .status(200)
                .json({ message: "User updated successfully", user: userData });
        }
        else {
            res.status(401).json({ message: "Un authorized" });
        }
    }
    catch (error) {
        console.log(error);
        res.status(500).json({ error: "Failed to update data" });
    }
};
exports.changeCountry = changeCountry;
