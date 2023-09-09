import React, { Component } from 'react';
import axios from 'axios';

const TITLE = 'React GraphQL GitHub Client';
const axiosGitHubGraphQL = axios.create({
  baseURL: 'https://api.github.com/graphql',
});

class App extends Component {
  render() {
    return (
      <div>
      <h1>{TITLE}</h1>
      </div>
    );
  }
}

export default App;
