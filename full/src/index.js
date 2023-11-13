import express from 'express';
import { ApolloServer, gql } from 'apollo-server-express';
import cors from 'cors';

const app = express();
app.use(cors());

let users = {
  1: {
    id: '1',
    firstname: 'Robin',
    lastname: 'Wieruch'
  },
  2: {
    id: '2',
    firstname: 'Dave',
    lastname: 'Davids'
  },
};
let messages = {
  1: {
    id: '1',
    text: 'Hello World',
  },
  2: {
    id: '2',
    text: 'By World',
  },
};

const me = users[1];

const schema = gql`
  type Query {
    users: [User!]
    user(id: ID!): User
    me: User

    messages: [Message!]!
    message(id: ID!): Message!
  }

  type User {
    id: ID!
    username: String!
  }

  type Message {
  id: ID!
  text: String!
  user: User!
  }
`;

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
const resolvers = {
  Query: {
    user: (parent, { id }) => {
      return users[id];
    },
    me: (parent, args, { me }) => {
      return me;
    },
    users: () => {
      return Object.values(users);
    },
    messages: () => {
      return Object.values(messages);
    },
    message: (parent, { id }) => {
      return messages[id];
    },
  },

  User: {
    username: user => `${user.firstname} ${user.lastname}`,
  },

  Message: {
    user: (parent, args, { me }) => {
      return me;
    },
  },
};

const server = new ApolloServer({
  typeDefs: schema,
  resolvers,
  context: {
    me: users[1],
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
