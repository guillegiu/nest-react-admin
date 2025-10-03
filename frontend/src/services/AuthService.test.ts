import authService from './AuthService';

// Mock axios
jest.mock('axios');
const mockAxios = require('axios');

// Mock ApiService
jest.mock('./ApiService', () => ({
  __esModule: true,
  default: {
    post: jest.fn(),
    defaults: {
      headers: {
        Authorization: null,
      },
    },
    interceptors: {
      response: {
        use: jest.fn(),
      },
    },
  },
}));

// Import the mocked ApiService
import apiService from './ApiService';
const mockApiService = apiService as jest.Mocked<typeof apiService>;

describe('AuthService', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    mockAxios.create.mockReturnValue(mockApiService);
  });

  it('login makes POST request to correct endpoint', async () => {
    const mockResponse = {
      data: { token: 'token', user: { id: '1', username: 'test' } }
    };
    mockAxios.post.mockResolvedValue(mockResponse);

    const loginData = { username: 'test', password: 'test' };
    await authService.login(loginData);

    expect(mockAxios.post).toHaveBeenCalledWith('/api/auth/login', loginData, { withCredentials: true });
    expect(mockApiService.defaults.headers.Authorization).toBe('Bearer token');
  });

  it('refresh makes POST request to correct endpoint', async () => {
    const mockResponse = {
      data: { token: 'new-token', user: { id: '1', username: 'test' } }
    };
    mockAxios.post.mockResolvedValue(mockResponse);

    await authService.refresh();

    expect(mockAxios.post).toHaveBeenCalledWith('/api/auth/refresh', {}, { withCredentials: true });
    expect(mockApiService.defaults.headers.Authorization).toBe('Bearer new-token');
  });

  it('logout makes POST request to correct endpoint', async () => {
    mockApiService.post.mockResolvedValue({ data: {} });

    await authService.logout();

    expect(mockApiService.post).toHaveBeenCalledWith('/api/auth/logout', {}, { withCredentials: true });
    expect(mockApiService.defaults.headers.Authorization).toBeNull();
  });
});
