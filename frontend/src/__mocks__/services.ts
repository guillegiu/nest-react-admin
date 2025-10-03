
export const mockApiService = {
  get: jest.fn().mockResolvedValue({ data: [] }),
  post: jest.fn().mockResolvedValue({ data: {} }),
  put: jest.fn().mockResolvedValue({ data: {} }),
  delete: jest.fn().mockResolvedValue({ data: {} }),
};

export const mockCourseService = {
  findAll: jest.fn().mockResolvedValue({ data: [], total: 0 }),
  findOne: jest.fn().mockResolvedValue({}),
  findRecent: jest.fn().mockResolvedValue([]),
  save: jest.fn().mockResolvedValue({}),
  update: jest.fn().mockResolvedValue({}),
  delete: jest.fn().mockResolvedValue({}),
};

export const mockStatsService = {
  getStats: jest.fn().mockResolvedValue({
    numberOfUsers: 10,
    numberOfCourses: 5,
    numberOfContents: 20,
  }),
};

export const mockUserService = {
  findAll: jest.fn().mockResolvedValue({ data: [], total: 0 }),
  findOne: jest.fn().mockResolvedValue({}),
  save: jest.fn().mockResolvedValue({}),
  update: jest.fn().mockResolvedValue({}),
  delete: jest.fn().mockResolvedValue({}),
};

export const mockAuthService = {
  login: jest.fn().mockResolvedValue({
    token: 'mock-token',
    user: {
      id: '1',
      username: 'test',
      firstName: 'Test',
      lastName: 'User',
      role: 'USER',
      isActive: true,
    },
  }),
  refresh: jest.fn().mockResolvedValue({
    token: 'mock-token',
    user: {
      id: '1',
      username: 'test',
      firstName: 'Test',
      lastName: 'User',
      role: 'USER',
      isActive: true,
    },
  }),
  logout: jest.fn().mockResolvedValue({}),
};
