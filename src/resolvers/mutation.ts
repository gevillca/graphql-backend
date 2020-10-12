import { IResolvers } from 'graphql-tools';
import { Context } from '../context';
import bcrypt from 'bcryptjs';

const mutation: IResolvers = {
  Mutation: {
    async register(_: void, { user }, ctx: Context) {
      const emailExist = await ctx.prisma.user.findOne({
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

      const userCreate = await ctx.prisma.user.create({
        data: {
          email: user.email,
          name: user.name,
          lastName: user.lastName,
          password: bcrypt.hashSync(user.password, 10),
        },
      });

      return {
        status: true,
        message: 'usuario creado',
        usersa: userCreate,
      };
    },
  },
};

export default mutation;
