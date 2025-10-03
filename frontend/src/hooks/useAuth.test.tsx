import React from 'react';
import { render, screen } from '@testing-library/react';
import useAuth from './useAuth';
import { AuthenticationProvider } from '../context/AuthenticationContext';

// Test component that uses the hook
const TestComponent = () => {
  const { authenticatedUser, setAuthenticatedUser } = useAuth();
  return (
    <div>
      <div data-testid="authenticated-user">{authenticatedUser ? 'authenticated' : 'not authenticated'}</div>
      <div data-testid="set-function">{typeof setAuthenticatedUser}</div>
    </div>
  );
};

const wrapper = ({ children }: { children: React.ReactNode }) => (
  <AuthenticationProvider>
    {children}
  </AuthenticationProvider>
);

describe('useAuth', () => {
  it('returns authentication state', () => {
    render(<TestComponent />, { wrapper });

    expect(screen.getByTestId('authenticated-user')).toBeInTheDocument();
    expect(screen.getByTestId('set-function')).toBeInTheDocument();
  });

  it('provides setAuthenticatedUser function', () => {
    render(<TestComponent />, { wrapper });

    expect(screen.getByTestId('set-function')).toHaveTextContent('function');
  });
});
