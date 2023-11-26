import 'dotenv/config';
require('dotenv').config()
import express from 'express';
import cors from 'cors';
import { ApolloServer } from 'apollo-server-express';
import schema from './schema';
import resolvers from './resolvers';
import models, { sequelize } from './models';

const app = express();
const eraseDatabaseOnSync = true;

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
  context: async () => ({
    models,
    me: await models.User.findByLogin('rwieruch'),
  }),
});

sequelize.sync({ force: eraseDatabaseOnSync }).then(async () => {
  if (eraseDatabaseOnSync) {
    createUsersWithMessages();
  }

  // More required logic for integrating with Express
  // See: https://stackoverflow.com/a/70165328
  server.start().then(res => {
    server.applyMiddleware({ app, path: '/graphql' });

    app.listen({ port: 8000 }, () => {
      console.log('Apollo Server on http://localhost:8000/graphql');
    });
  });
});


const createUsersWithMessages = async () => {
  await models.User.create(
    {
      username: 'rwieruch',
      messages: [
        {
          text: 'Published the Road to learn React',
        },
      ],
    },
    {
      include: [models.Message],
    },
  );
  await models.User.create(
    {
      username: 'ddavids',
      messages: [
        {
          text: 'Happy to release ...',
        },
        {
          text: 'Published a complete ...',
        },
      ],
    },
    {
      include: [models.Message],
    },
  );
};
