import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export interface Context {
  request: Request & any;
  prisma: PrismaClient;
}

export function createContext(request: Request): Context {
  return { request, prisma };
}
