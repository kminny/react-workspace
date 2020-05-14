import gql from "graphql-tag";

export const ME = gql`
  query me {
    me {
      ok
      user {
        id
        name
        isProfessor
      }
      error
    }
  }
`;

export const LOG_IN = gql`
  mutation logUserIn($token: String!) {
    logUserIn(token: $token) @client
  }
`;

export const LOG_OUT = gql`
  mutation logUserOut {
    logUserOut @client
  }
`;

export const IS_LOGGED_IN = gql`
  {
    auth {
      isLoggedIn @client
    }
  }
`;
