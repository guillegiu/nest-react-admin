import React from 'react';
import { render, screen, act } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import App from './App';
import { AuthenticationProvider } from './context/AuthenticationContext';
import useAuth from './hooks/useAuth';
import authService from './services/AuthService';

jest.mock('./hooks/useAuth');
jest.mock('./services/AuthService');

const mockUseAuth = useAuth as jest.MockedFunction<typeof useAuth>;
const mockAuthService = authService as jest.Mocked<typeof authService>;

const TestWrapper = ({ children }: { children: React.ReactNode }) => (
  <AuthenticationProvider>
    {children}
  </AuthenticationProvider>
);

describe('App', () => {
  beforeEach(() => {
    mockUseAuth.mockReturnValue({
      authenticatedUser: null,
      setAuthenticatedUser: jest.fn(),
    });
    mockAuthService.refresh.mockResolvedValue({
      token: 'token',
      user: {
        id: '1',
        username: 'test',
        firstName: 'Test',
        lastName: 'User',
        role: 'USER' as any,
        isActive: true
      },
    });
  });

  it('renders without crashing', () => {
    render(<App />, { wrapper: TestWrapper });
    expect(screen).toBeDefined();
  });

  it('shows loading state initially', () => {
    render(<App />, { wrapper: TestWrapper });
    expect(screen.queryByText('Login')).not.toBeInTheDocument();
  });

  it('renders login when not authenticated', async () => {
    mockUseAuth.mockReturnValue({
      authenticatedUser: null,
      setAuthenticatedUser: jest.fn(),
    });

    await act(async () => {
      render(<App />, { wrapper: TestWrapper });
    });

    expect(screen.getByRole('heading', { name: 'Login' })).toBeInTheDocument();
  });
});
