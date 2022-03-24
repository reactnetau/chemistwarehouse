import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  HttpLink,
} from '@apollo/client';

import Home from './pages/Home';
import Edit from './pages/Edit';
import Add from './pages/Add';
import Header from './components/Header';

const link = new HttpLink({
  uri: 'http://localhost:5000/graphql',
});

const client = new ApolloClient({
  cache: new InMemoryCache({
    typePolicies: {
      Query: {
        fields: {
          id: {
            // shorthand
            merge: true,
          },
          name: {
            // shorthand
            merge: true,
          },
          price: {
            // shorthand
            merge: true,
          },
          description: {
            // shorthand
            merge: true,
          },
        },
      },
    },
  }),
  link: link,
});

function App() {
  return (
    <ApolloProvider client={client}>
      <Header />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/add" element={<Add />} />
          <Route path="/edit" element={<Edit />} />
        </Routes>
      </BrowserRouter>
    </ApolloProvider>
  );
}

export default App;
