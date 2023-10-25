import React from 'react';
import ReactDOM from 'react-dom';
import { ApolloClient } from 'apollo-client';
import { HttpLink } from 'apollo-link-http';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { ApolloProvider } from 'react-apollo';
import 'dotenv/config';
import App from './App';
import './style.css';
import { onError } from 'apollo-link-error';
import { ApolloLink } from 'apollo-link';
// import registerServiceWorker from './registerServiceWorker';

const TOKEN = process.env.REACT_APP_GITHUB_PERSONAL_ACCESS_TOKEN;
const GITHUB_BASE_URL = 'https://api.github.com/graphql';
const httpLink = new HttpLink({
  uri: GITHUB_BASE_URL,
  headers: {
    authorization: `Bearer ${TOKEN}`,
  },
});
const cache = new InMemoryCache();
const errorLink = onError(({ graphQLErrors, networkError }) => {
  if (graphQLErrors) {
    console.log('sos bien trolo');
    // do something with graphql error
  }
  if (networkError) {
    console.log('network trolaza bien trolo');
    // do something with network error
  }
});
const link = ApolloLink.from([errorLink, httpLink]);
  // link: httpLink,
const client = new ApolloClient({
  link: link,
  cache,
});


ReactDOM.render(
  <ApolloProvider client={client}>
    <App />
  </ApolloProvider>,
  document.getElementById('root')
);

// registerServiceWorker();
