import React, { Suspense, useState, useEffect } from 'react';
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect,
} from 'react-router-dom';
import {
  ApolloProvider,
  ApolloClient,
  InMemoryCache,
  createHttpLink,
} from '@apollo/client';
import { persistCache } from 'apollo-cache-persist-dev';
import { setContext } from '@apollo/client/link/context';
import { githubGraphQLEndpoint, token } from './utils/contants';

const httpLink = createHttpLink({
  uri: githubGraphQLEndpoint,
});

const authLink = setContext((_, { headers }) => {
  // get the authentication token from local storage if it exists
  //const token = JSON.parse(localStorage.getItem('access_token') ?? '');
  // return the headers to the context so httpLink can read them
  return {
    headers: {
      ...headers,
      Authorization: token ? `bearer ${token}` : '',
    },
  };
});

const ViewMain = React.lazy(
  () => import(/* webpackChunkName: "views" */ './views')
);
const ViewApp = React.lazy(
  () => import(/* webpackChunkName: "views-app" */ './views/app')
);
const ViewError = React.lazy(
  () => import(/* webpackChunkName: "views-error" */ './views/error')
);

function App() {
  const [client, setClient] = useState<any>(undefined);

  useEffect(() => {
    const cache = new InMemoryCache();

    const newClient = new ApolloClient({
      cache,
      link: authLink.concat(httpLink),
      connectToDevTools: true,
    });

    // See above for additional options, including other storage providers.
    persistCache({
      cache,
      storage: window.localStorage,
      debug: true,
      maxSize: false,
    }).then(() => {
      setClient(newClient);
    });
    return () => {};
  }, []);

  if (client === undefined) return <div className="loading" />;

  return (
    <ApolloProvider client={client}>
      <div className="h-100">
        <React.Fragment>
          <Suspense fallback={<div className="loading" />}>
            <Router>
              <Switch>
                <Route path="/app" render={props => <ViewApp {...props} />} />
                <Route
                  path="/error"
                  exact
                  render={props => <ViewError {...props} />}
                />
                <Route
                  path="/"
                  exact
                  render={props => <ViewMain {...props} />}
                />
                <Redirect to="/error" />
              </Switch>
            </Router>
          </Suspense>
        </React.Fragment>
      </div>
    </ApolloProvider>
  );
}

export default App;
