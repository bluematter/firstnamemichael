import { IBuilder } from "../schema";
import { PrismaClient } from "../../prisma/client";

const userQuery = (db: PrismaClient, builder: IBuilder) => {
  // User
  builder.queryField("user", (t) =>
    t.prismaField({
      type: "User",
      nullable: true,
      args: {
        email: t.arg.string({ required: true }),
      },
      resolve: async (query, root, { email }) => {
        return db.user.findUnique({
          where: {
            email,
          },
        });
      },
    })
  );
};

export default userQuery;
