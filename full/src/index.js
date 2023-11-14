import express from 'express';
import cors from 'cors';
import { ApolloServer } from 'apollo-server-express';

import schema from './schema';
import resolvers from './resolvers';
import models from './models';

const app = express();
app.use(cors());

// Sample query
// {
//  user(id: "2") {
    // username
  // }
  // me {
    // id
    // username
  // }
  // users {
    // username
  // }
// }
const server = new ApolloServer({
  typeDefs: schema,
  resolvers,
  context: {
    models,
    me: models.users[1],
  },
});

// More required logic for integrating with Express
// See: https://stackoverflow.com/a/70165328
server.start().then(res => {
  server.applyMiddleware({ app, path: '/graphql' });

  app.listen({ port: 8000 }, () => {
    console.log('Apollo Server on http://localhost:8000/graphql');
  });
});
