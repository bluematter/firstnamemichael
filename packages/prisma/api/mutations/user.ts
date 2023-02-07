/* eslint-disable @typescript-eslint/no-explicit-any */

import { IBuilder } from "../schema";
import { PrismaClient } from "../../prisma/client";

const postmark = require("postmark");
const client = new postmark.ServerClient(process.env.POSTMARK_TOKEN);

const userMutation = (db: PrismaClient, builder: IBuilder) => {
  builder.mutationField("createUser", (t) =>
    t.prismaField({
      type: "User",
      args: {
        email: t.arg.string({ required: true }),
      },
      resolve: async (query, root, { email }) => {
        try {
          client.sendEmailWithTemplate({
            From: "michael@michaelaubry.com",
            To: email,
            TemplateAlias: "newsletter-confirmation",
            TemplateModel: {
              product_url: "michaelaubry.com",
              product_name: "Michael Aubry",
              action_url: "some confirmation url",
              company_name: "Michael Aubry",
              company_address: "",
              name: "Michael Aubry",
              invite_sender_name: "Michael Aubry",
              invite_sender_organization_name: "Michael Aubry",
              support_email: "michael@michaelaubry.com",
              live_chat_url: "live_chat_url_Value",
              help_url: "help_url_Value",
            },
          });

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
