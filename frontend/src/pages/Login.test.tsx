import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import Login from './Login';
import useAuth from '../hooks/useAuth';
import authService from '../services/AuthService';

jest.mock('../hooks/useAuth');
jest.mock('../services/AuthService');
jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useHistory: () => ({
    push: jest.fn(),
  }),
}));

const mockUseAuth = useAuth as jest.MockedFunction<typeof useAuth>;
const mockAuthService = authService as jest.Mocked<typeof authService>;

describe('Login', () => {
  const mockSetAuthenticatedUser = jest.fn();

  beforeEach(() => {
    mockUseAuth.mockReturnValue({
      authenticatedUser: null,
      setAuthenticatedUser: mockSetAuthenticatedUser,
    });
  });

  it('renders login form', () => {
    render(
      <BrowserRouter>
        <Login />
      </BrowserRouter>
    );

    expect(screen.getByRole('heading', { name: 'Login' })).toBeInTheDocument();
    expect(screen.getByPlaceholderText('Username')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('Password')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Login' })).toBeInTheDocument();
  });

  it('shows loading state when submitting', async () => {
    mockAuthService.login.mockImplementation(() => new Promise(() => {}));

    render(
      <BrowserRouter>
        <Login />
      </BrowserRouter>
    );

    const usernameInput = screen.getByPlaceholderText('Username');
    const passwordInput = screen.getByPlaceholderText('Password');
    const submitButton = screen.getByRole('button', { name: 'Login' });

    fireEvent.change(usernameInput, { target: { value: 'test' } });
    fireEvent.change(passwordInput, { target: { value: 'test' } });
    fireEvent.click(submitButton);

    await waitFor(() => {
      expect(submitButton).toBeDisabled();
    });
  });

  it('handles successful login', async () => {
    const mockUser = { id: '1', username: 'test' };
    mockAuthService.login.mockResolvedValue({
      token: 'token',
      user: mockUser,
    });

    render(
      <BrowserRouter>
        <Login />
      </BrowserRouter>
    );

    const usernameInput = screen.getByPlaceholderText('Username');
    const passwordInput = screen.getByPlaceholderText('Password');
    const submitButton = screen.getByRole('button', { name: 'Login' });

    fireEvent.change(usernameInput, { target: { value: 'test' } });
    fireEvent.change(passwordInput, { target: { value: 'test' } });
    fireEvent.click(submitButton);

    await waitFor(() => {
      expect(mockSetAuthenticatedUser).toHaveBeenCalledWith(mockUser);
    });
  });

  it('displays error message on failure', async () => {
    const errorMessage = 'Invalid credentials';
    mockAuthService.login.mockRejectedValue({
      response: { data: { message: errorMessage } },
    });

    render(
      <BrowserRouter>
        <Login />
      </BrowserRouter>
    );

    const usernameInput = screen.getByPlaceholderText('Username');
    const passwordInput = screen.getByPlaceholderText('Password');
    const submitButton = screen.getByRole('button', { name: 'Login' });

    fireEvent.change(usernameInput, { target: { value: 'test' } });
    fireEvent.change(passwordInput, { target: { value: 'test' } });
    fireEvent.click(submitButton);

    await waitFor(() => {
      expect(screen.getByText(errorMessage)).toBeInTheDocument();
    });
  });
});
