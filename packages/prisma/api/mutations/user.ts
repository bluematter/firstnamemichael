/* eslint-disable @typescript-eslint/no-explicit-any */
import { IBuilder } from "../schema";
import { PrismaClient } from "../../prisma/client";

const userMutation = (db: PrismaClient, builder: IBuilder) => {
  builder.mutationField("createUser", (t) =>
    t.prismaField({
      type: "User",
      args: {
        email: t.arg.string({ required: true }),
      },
      resolve: async (query, root, { email }) => {
        try {
          return db.user.create({
            data: {
              email,
            },
          });
        } catch (e: any) {
          throw new Error(e.message);
        }
      },
    })
  );
};

export default userMutation;
