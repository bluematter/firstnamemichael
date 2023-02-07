/* eslint-disable @typescript-eslint/no-explicit-any */
import { ApolloServer } from 'apollo-server-micro';

import { createContext } from './context';
import { schema } from './schema';

const apolloServer = new ApolloServer({
  schema,
  context: createContext,
});

export const config = {
  api: {
    bodyParser: false,
  },
};

export default apolloServer.createHandler({
  path: '/api/graphql',
});
