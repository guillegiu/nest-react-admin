import React, { createContext, Dispatch, SetStateAction, useState } from 'react';

import User from '../models/user/User';

interface AuthContextValue {
  authenticatedUser: User | undefined;
  setAuthenticatedUser: Dispatch<SetStateAction<User | undefined>>;
}

export const AuthenticationContext = createContext<AuthContextValue | undefined>(
  undefined
);

export function AuthenticationProvider({ children }: { children: React.ReactNode }) {
  const [authenticatedUser, setAuthenticatedUser] = useState<User | undefined>();

  return (
    <AuthenticationContext.Provider value={{ authenticatedUser, setAuthenticatedUser }}>
      {children}
    </AuthenticationContext.Provider>
  );
}
