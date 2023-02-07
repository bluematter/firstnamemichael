import { ApolloServer } from '@apollo/server';
import { startStandaloneServer } from '@apollo/server/standalone';

import { createContext } from './context';
import { schema } from './schema';

const server = new ApolloServer({
  schema,
});

startStandaloneServer(server, {
  listen: {
    port: 3001,
  },
  context: createContext,
}).then(({ url }) => {
  // eslint-disable-next-line no-console
  console.log(`🚀 Server ready at ${url}`);
});
