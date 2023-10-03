import 'dotenv/config';
// import ApolloClient from 'apollo-boost';
import 'cross-fetch/polyfill';
// See: https://stackoverflow.com/questions/50688998/using-apolloclient-with-node-js-fetch-is-not-found-globally-and-no-fetcher-pas
// import { default as ApolloClient } from 'apollo-boost';
import ApolloClient, { gql } from 'apollo-boost';
// import ApolloClient, { gql } from 'apollo-boost';
// const Boost = require('apollo-boost');
// const ApolloClient = Boost.DefaultClient;

const GET_ORGANIZATION = gql`
  {
    organization(login: "the-road-to-learn-react") {
      name
      url
    }
  }
`;
const TOKEN = process.env.REACT_APP_GITHUB_PERSONAL_ACCESS_TOKEN;
console.log("TOKEN:");
console.log(TOKEN);
const client = new ApolloClient({
  uri: 'https://api.github.com/graphql',
  request: operation => {
    operation.setContext({
      headers: {
        authorization: `Bearer ${TOKEN}`,
      },
    });
  },
});

client
  .query({
    query: GET_ORGANIZATION,
  })
  .then(console.log);
// console.log(user);
// console.log(process.env.SOME_ENV_VARIABLE);
