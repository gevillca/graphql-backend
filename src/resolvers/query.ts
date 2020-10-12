import { IResolvers } from 'graphql-tools';
import { Context } from '../context';
import JWT from '../lib/jwt';
import bcrypt from 'bcryptjs';
import getUserId from '../lib/getUserId';

const query: IResolvers = {
  Query: {
    async users(parent: any, args: any, ctx: Context, info: any) {
      return await ctx.prisma.user.findMany({
        orderBy: {
          registerdate: 'desc',
        },
      });
    },
    async login(_: void, { email, password }, ctx: Context) {
      const userExist = await ctx.prisma.user.findOne({
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
      if (!bcrypt.compareSync(password, userExist.password)) {
        return {
          status: false,
          message: 'login correcto, contrasenia incorrecta',
          token: null,
        };
      }
      const user = await ctx.prisma.user.findOne({
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
        token: new JWT().sign({ user }),
      };
    },
    async me(parent: any, args: any, ctx, info: any) {
      const usuario: any = getUserId(ctx.request);
      return {
        status: true,
        message: 'Token Correcto',
        usersa: usuario.user,
      };
    },
  },
};

export default query;
