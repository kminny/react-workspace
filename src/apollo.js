import { ApolloClient } from "apollo-client";
import { InMemoryCache } from "apollo-cache-inmemory";
import { ApolloLink, split, concat } from "apollo-link";
import { onError } from "apollo-link-error";
import { setContext } from "apollo-link-context";
import { HttpLink } from "apollo-link-http";
import { withClientState } from "apollo-link-state";
import { WebSocketLink } from "apollo-link-ws";
import { getMainDefinition } from "apollo-utilities";

/** checked */
const cache = new InMemoryCache();

/** checked */
const getToken = (tokenName) => {
  // const token =  localStorage.getItem(tokenName);
  const token =
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiaWF0IjoxNTg5MjU4MTc2fQ.xzq0VQImtxoK-XTjAdWPHfK5OBGl0OQvHmMx8z8aEsU";

  if (token) {
    return token;
  } else {
    return null;
  }
};

/** checked */
const httpLink = new HttpLink({
  uri: "http://localhost:4000/graphql",
});

/** checked */
const wsLink = new WebSocketLink({
  uri: "ws://localhost:4000/graphql",
  options: {
    reconnect: true,
    connectionParams: {
      "X-JWT": getToken("jwt"),
    },
  },
});

/** checked */
const authLink = setContext((_, { headers }) => {
  const token = getToken("jwt");

  return {
    headers: {
      ...headers,
      "X-JWT": token || null,
    },
  };
});

/** checked */
const combinedLinks = split(
  ({ query }) => {
    const { kind, operation } = getMainDefinition(query);
    return kind === "OperationDefinition" && operation === "subscription";
  },
  wsLink,
  httpLink
);

/** checked */
const errorLink = onError(({ graphQLErrors, networkError }) => {
  if (graphQLErrors) {
    graphQLErrors.map(({ message, location, path }) => {
      console.log(`GraphQL error: ${message}`);
      console.log(`GraphQL error on: ${path}`);
      return null;
    });
  }
  if (networkError) {
    console.log(`Network error: ${networkError}`);
  }
});

const localStateLink = withClientState({
  defaults: {
    auth: {
      __typename: "Auth",
      isLoggedIn: Boolean(localStorage.getItem("jwt")) || false,
    },
  },
  resolvers: {
    Mutation: {
      logUserOut: (_, __, { cache: localCache }) => {
        localStorage.removeItem("jwt");
        localCache.writeData({
          data: {
            auth: {
              __typename: "Auth",
              isLoggedIn: false,
            },
          },
        });
        // location.reload();
        return null;
      },
      logUserIn: (_, { token }, { cache: localCache }) => {
        localStorage.setItem("jwt", token);
        localCache.writeData({
          data: {
            auth: {
              __typename: "Auth",
              isLoggedIn: true,
            },
          },
        });
        return null;
      },
    },
  },
  cache,
});

const client = new ApolloClient({
  cache,
  link: ApolloLink.from([
    errorLink,
    localStateLink,
    concat(authLink, combinedLinks),
  ]),
});

export default client;
