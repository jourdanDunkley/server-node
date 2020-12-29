import { buildSchema } from "type-graphql";
import { RecipeResolver } from "../../resolvers/";

export const createSchema = () =>
  buildSchema({
    resolvers: [
      RecipeResolver,
    ],
    authChecker: ({ context: { req } }) => {
      return !!req.session.userId;
    }
  });