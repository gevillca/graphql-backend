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
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const mutation = {
    Mutation: {
        register(_, { user }, ctx) {
            return __awaiter(this, void 0, void 0, function* () {
                const emailExist = yield ctx.prisma.user.findOne({
                    where: {
                        email: user.email,
                    },
                });
                if (emailExist !== null) {
                    return {
                        status: false,
                        message: 'Usuario ya existe',
                        usersa: null,
                    };
                }
                const userCreate = yield ctx.prisma.user.create({
                    data: {
                        email: user.email,
                        name: user.name,
                        lastName: user.lastName,
                        password: bcryptjs_1.default.hashSync(user.password, 10),
                    },
                });
                return {
                    status: true,
                    message: 'usuario creado',
                    usersa: userCreate,
                };
            });
        },
    },
};
exports.default = mutation;
