/* eslint-disable @typescript-eslint/no-explicit-any */
import postmark from "postmark";

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
          const client = new postmark.ServerClient(
            "3aa81f8d-6f8b-4279-aa9c-51bd473a1fee"
          );

          client.sendEmailWithTemplate({
            From: "michael@michaelaubry.com",
            To: email,
            TemplateAlias: "newsletter-confirmation",
            TemplateModel: {
              product_url: "michaelaubry.com",
              product_name: "Michael Aubry",
              action_url: "action_url_Value",
              company_name: "Michael Aubry",
              company_address: "company_address_Value",
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
