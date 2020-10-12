"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const getUserId = (req) => {
    const secretKey = process.env.SECRET;
    const header = req.req.headers.authorization;
    if (!header) {
        throw new Error('Authentification required');
    }
    const decoded = jsonwebtoken_1.default.verify(header, secretKey);
    return decoded;
};
exports.default = getUserId;
