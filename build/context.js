"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createContext = void 0;
const client_1 = require("@prisma/client");
const prisma = new client_1.PrismaClient();
function createContext(request) {
    return { request, prisma };
}
exports.createContext = createContext;
