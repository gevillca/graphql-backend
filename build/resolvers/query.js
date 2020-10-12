"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const jwt_1 = __importDefault(require("../lib/jwt"));
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const getUserId_1 = __importDefault(require("../lib/getUserId"));
const query = {
    Query: {
        users(parent, args, ctx, info) {
            return __awaiter(this, void 0, void 0, function* () {
                return yield ctx.prisma.user.findMany({
                    orderBy: {
                        registerdate: 'desc',
                    },
                });
            });
        },
        login(_, { email, password }, ctx) {
            return __awaiter(this, void 0, void 0, function* () {
                const userExist = yield ctx.prisma.user.findOne({
                    where: {
                        email,
                    },
                });
                if (userExist === null) {
                    return {
                        status: false,
                        message: 'login incorrecto, Usuario no existe',
                        token: null,
                    };
                }
                if (!bcryptjs_1.default.compareSync(password, userExist.password)) {
                    return {
                        status: false,
                        message: 'login correcto, contrasenia incorrecta',
                        token: null,
                    };
                }
                const user = yield ctx.prisma.user.findOne({
                    where: {
                        email,
                    },
                    select: {
                        id: true,
                        email: true,
                        name: true,
                        lastName: true,
                        registerdate: true,
                    },
                });
                return {
                    status: true,
                    message: 'login correcto',
                    token: new jwt_1.default().sign({ user }),
                };
            });
        },
        me(parent, args, ctx, info) {
            return __awaiter(this, void 0, void 0, function* () {
                const usuario = getUserId_1.default(ctx.request);
                return {
                    status: true,
                    message: 'Token Correcto',
                    usersa: usuario.user,
                };
            });
        },
    },
};
exports.default = query;
