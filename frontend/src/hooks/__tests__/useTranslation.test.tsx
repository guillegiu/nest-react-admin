import { render, screen } from '@testing-library/react';
import React from 'react';

import { LanguageProvider } from '../../context/LanguageContext';
import useTranslation from '../useTranslation';

const TestComponent = () => {
  const { t, language } = useTranslation();
  return (
    <div>
      <span data-testid="language">{language}</span>
      <span data-testid="dashboard-title">{t('dashboard.title')}</span>
      <span data-testid="navigation-dashboard">{t('navigation.dashboard')}</span>
      <span data-testid="nonexistent">{t('nonexistent.key')}</span>
    </div>
  );
};

const TestWrapper = ({ children }: { children: React.ReactNode }) => (
  <LanguageProvider>{children}</LanguageProvider>
);

describe('useTranslation', () => {
  beforeEach(() => {
    localStorage.clear();
  });

  it('should return English translations by default', () => {
    render(<TestComponent />, { wrapper: TestWrapper });

    expect(screen.getByTestId('language')).toHaveTextContent('en');
    expect(screen.getByTestId('dashboard-title')).toHaveTextContent('Dashboard');
    expect(screen.getByTestId('navigation-dashboard')).toHaveTextContent('Dashboard');
  });

  it('should return the key when translation is not found', () => {
    render(<TestComponent />, { wrapper: TestWrapper });

    expect(screen.getByTestId('nonexistent')).toHaveTextContent('nonexistent.key');
  });

  it('should load language from localStorage', () => {
    localStorage.setItem('language', 'es');

    render(<TestComponent />, { wrapper: TestWrapper });

    expect(screen.getByTestId('language')).toHaveTextContent('es');
    expect(screen.getByTestId('dashboard-title')).toHaveTextContent('Panel Principal');
  });
});
