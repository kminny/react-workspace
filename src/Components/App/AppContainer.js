import React from "react";
import { graphql, Query } from "react-apollo";

import AppPresenter from "./AppPresenter";
import { IS_LOGGED_IN } from "./AppQueries";
import { ME } from "../../sharedQueries";

const AppContainer = (props) => (
  <React.Fragment>
    <Query query={ME} skip={!props.data.auth.isLoggedIn}>
      {() => <AppPresenter isLoggedIn={props.data.auth.isLoggedIn} />}
    </Query>
  </React.Fragment>
);

export default graphql(IS_LOGGED_IN)(AppContainer);
