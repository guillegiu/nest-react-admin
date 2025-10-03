import { render, screen, fireEvent } from '@testing-library/react';
import React from 'react';

import { LanguageProvider } from '../../context/LanguageContext';
import LanguageSelector from '../LanguageSelector';

const TestWrapper = ({ children }: { children: React.ReactNode }) => (
  <LanguageProvider>{children}</LanguageProvider>
);

describe('LanguageSelector', () => {
  beforeEach(() => {
    localStorage.clear();
  });

  it('should render language selector with English and Spanish options', () => {
    render(<LanguageSelector />, { wrapper: TestWrapper });

    expect(screen.getByText('🇺🇸 English')).toBeInTheDocument();
    expect(screen.getByText('🇪🇸 Español')).toBeInTheDocument();
  });

  it('should have English selected by default', () => {
    render(<LanguageSelector />, { wrapper: TestWrapper });

    const select = screen.getByRole('combobox');
    expect(select).toHaveValue('en');
  });

  it('should change language when option is selected', () => {
    render(<LanguageSelector />, { wrapper: TestWrapper });

    const select = screen.getByRole('combobox');
    fireEvent.change(select, { target: { value: 'es' } });

    expect(select).toHaveValue('es');
  });

  it('should persist language change in localStorage', () => {
    render(<LanguageSelector />, { wrapper: TestWrapper });

    const select = screen.getByRole('combobox');
    fireEvent.change(select, { target: { value: 'es' } });

    expect(localStorage.getItem('language')).toBe('es');
  });

  it('should show correct flag icons for each language', () => {
    render(<LanguageSelector />, { wrapper: TestWrapper });

    const englishOption = screen.getByText('🇺🇸 English');
    const spanishOption = screen.getByText('🇪🇸 Español');

    expect(englishOption).toBeInTheDocument();
    expect(spanishOption).toBeInTheDocument();
  });

  it('should have proper styling classes', () => {
    render(<LanguageSelector />, { wrapper: TestWrapper });

    const select = screen.getByRole('combobox');
    expect(select).toHaveClass('appearance-none', 'bg-white', 'border');
  });
});
