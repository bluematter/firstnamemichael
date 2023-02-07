import { IBuilder } from '../schema';
import { PrismaClient } from '../../../../prisma/client';

const User = (db: PrismaClient, builder: IBuilder) => {
  // User
  builder.prismaObject('User', {
    fields: (t) => ({
      id: t.exposeID('id'),
      name: t.exposeString('name', { nullable: true }),
      email: t.exposeString('name', { nullable: true }),
      waitlist: t.exposeBoolean('waitlist', { nullable: true }),
    }),
  });
};

export default User;
