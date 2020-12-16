import React from "react";
import { Route, Redirect } from "react-router-dom";

export default function AuthenticatedRoute({
  component: C,
  appProps,
  ...rest
}) {
  return (
    <Route
      {...rest}
      render={props =>
        localStorage.getItem('user') !== null ? (
          <C {...props} {...appProps} />
        ) : (
          <Redirect to="/login" />
        )
      }
    />
  );
}
//Would change !== null to == null on line 13 for auth users to not see a page.  Change redirect on line 16 to be home page or something