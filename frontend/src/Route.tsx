import { useContext } from 'react';
import { Redirect, Route, RouteProps } from 'react-router-dom';

import { AuthenticationContext } from './context/AuthenticationContext';

export { Route } from 'react-router-dom';

interface PrivateRouteProps extends RouteProps {
  component: React.ComponentType<any>;
  roles?: string[];
}

export function PrivateRoute({
  component: Component,
  roles,
  ...rest
}: PrivateRouteProps) {
  const { authenticatedUser } = useContext(AuthenticationContext);

  return (
    <Route
      {...rest}
      render={(props) => {
        if (authenticatedUser) {
          if (roles) {
            if (roles.includes(authenticatedUser.role)) {
              return <Component {...props} />;
            } else {
              return <Redirect to="/" />;
            }
          } else {
            return <Component {...props} />;
          }
        }
        return <Redirect to="/login" />;
      }}
    />
  );
}

interface AuthRouteProps extends RouteProps {
  component: React.ComponentType<any>;
}

export function AuthRoute({ component: Component, ...rest }: AuthRouteProps) {
  const { authenticatedUser } = useContext(AuthenticationContext);

  return (
    <Route
      {...rest}
      render={(props) => {
        return authenticatedUser ? (
          <Redirect to="/" />
        ) : (
          <Component {...props} />
        );
      }}
    />
  );
}
