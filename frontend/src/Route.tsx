import { useContext } from 'react';
import { RouteComponentProps } from 'react-router';
import { Redirect, Route, RouteProps } from 'react-router-dom';

import { AuthenticationContext } from './context/AuthenticationContext';

export { Route } from 'react-router-dom';

interface PrivateRouteProps extends RouteProps {
  component:
    | React.ComponentType<RouteComponentProps<any>>
    | React.ComponentType<any>;
  roles?: string[];
}

export function PrivateRoute({
  component: Component,
  roles,
  ...rest
}: PrivateRouteProps) {
  const auth = useContext(AuthenticationContext);
  const authenticatedUser = auth?.authenticatedUser;

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
  component:
    | React.ComponentType<RouteComponentProps<any>>
    | React.ComponentType<any>;
}

export function AuthRoute({ component: Component, ...rest }: AuthRouteProps) {
  const auth = useContext(AuthenticationContext);
  const authenticatedUser = auth?.authenticatedUser;

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
