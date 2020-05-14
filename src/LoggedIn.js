import React from "react";
import { graphql } from "react-apollo";
import { useQuery, useMutation } from "@apollo/react-hooks";

import logo from "./logo.svg";
import "./App.css";

import { ME, LOG_IN, LOG_OUT, IS_LOGGED_IN } from "./sharedQueries";

const LoggedIn = (props) => {
  const isLoggedIn = props.data.auth.isLoggedIn;
  const { loading: meLoading, data: meData, error: meError } = useQuery(ME);
  const [logUserIn, { data: logInData }] = useMutation(LOG_IN);
  const [logUserOut, { data: logOutData }] = useMutation(LOG_OUT);

  if (meError) {
    console.log(meError);
  }
  if (meLoading) {
    return <div>loading</div>;
  }

  const logUserInFunc = () => {
    logUserIn({
      variables: {
        token:
          "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiaWF0IjoxNTg5MjU4MTc2fQ.xzq0VQImtxoK-XTjAdWPHfK5OBGl0OQvHmMx8z8aEsU",
      },
    });
  };

  const logUserOutFunc = () => {
    logUserOut();
  };

  console.log(meData);
  console.log(`isLoggedIn value: ${isLoggedIn}`);

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
        <button onClick={logUserInFunc}>LogIn</button>
        {/* {isLoggedIn && <button onClick={logUserOutFunc}>LogOut</button>} */}
      </header>
    </div>
  );
};

export default graphql(IS_LOGGED_IN)(LoggedIn);
