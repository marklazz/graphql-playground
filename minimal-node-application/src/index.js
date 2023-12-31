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
  query($organization: String!) {
    organization(login: $organization) {
      name
      url
    }
  }
`;
const GET_REPOSITORIES_OF_ORGANIZATION = gql`
  query($organization: String!) {
    organization(login: $organization) {
      name
      url
      repositories(first: 5) {
        edges {
          node {
            name
            url
          }
        }
      }
    }
  }
`;
const ADD_STAR = gql`
mutation AddStar($repositoryId: ID!) {
  addStar(input: { starrableId: $repositoryId }) {
    starrable {
      id
      viewerHasStarred
    }
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
    variables: {
      organization: 'the-road-to-learn-react',
    },
  })
  .then(console.log);
// console.log(user);
// console.log(process.env.SOME_ENV_VARIABLE);
client
.query({
query: GET_REPOSITORIES_OF_ORGANIZATION,
variables: {
organization: 'the-road-to-learn-react',
},
})
.then(console.log);

client
.mutate({
mutation: ADD_STAR,
variables: {
repositoryId: 'MDEwOlJlcG9zaXRvcnk2MzM1MjkwNw==',
},
})
.then(console.log);
