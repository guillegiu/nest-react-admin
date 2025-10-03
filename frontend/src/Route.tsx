import { useContext } from 'react';
import { Redirect, Route, RouteProps } from 'react-router-dom';

import { AuthenticationContext } from './context/AuthenticationContext';

export { Route } from 'react-router-dom';

interface PrivateRouteProps {
  component: any;
  roles?: string[];
  exact?: boolean;
  path?: string;
}

export function PrivateRoute({
  component: Component,
  roles,
  ...rest
}: PrivateRouteProps) {
  const { authenticatedUser } = useContext(AuthenticationContext);

  return (
    // @ts-ignore
    <Route
      {...rest}
      render={(props) => {
        if (authenticatedUser) {
          if (roles) {
            if (roles.includes(authenticatedUser.role)) {
              return <Component {...props} />;
            } else {
              // @ts-ignore
              return <Redirect to="/" />;
            }
          } else {
            return <Component {...props} />;
          }
        }
        // @ts-ignore
        return <Redirect to="/login" />;
      }}
    />
  );
}

interface AuthRouteProps {
  component: any;
  exact?: boolean;
  path?: string;
}

export function AuthRoute({ component: Component, ...rest }: AuthRouteProps) {
  const { authenticatedUser } = useContext(AuthenticationContext);

  return (
    // @ts-ignore
    <Route
      {...rest}
      render={(props) => {
        return authenticatedUser ? (
          // @ts-ignore
          <Redirect to="/" />
        ) : (
          <Component {...props} />
        );
      }}
    />
  );
}
