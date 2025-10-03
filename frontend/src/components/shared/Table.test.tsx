import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import Table from './Table';

const mockColumns = ['Name', 'Value'];

describe('Table', () => {
  it('renders table with columns', () => {
    render(
      <Table columns={mockColumns}>
        <tr>
          <td>Test 1</td>
          <td>Value 1</td>
        </tr>
        <tr>
          <td>Test 2</td>
          <td>Value 2</td>
        </tr>
      </Table>
    );

    expect(screen.getByText('Name')).toBeInTheDocument();
    expect(screen.getByText('Value')).toBeInTheDocument();
    expect(screen.getByText('Test 1')).toBeInTheDocument();
    expect(screen.getByText('Test 2')).toBeInTheDocument();
  });

  it('renders table with custom children', () => {
    render(
      <Table columns={['Title']}>
        <tr>
          <td>Custom Content</td>
        </tr>
      </Table>
    );

    expect(screen.getByText('Title')).toBeInTheDocument();
    expect(screen.getByText('Custom Content')).toBeInTheDocument();
  });

  it('renders edit column header', () => {
    render(
      <Table columns={['Name']}>
        <tr>
          <td>Test</td>
        </tr>
      </Table>
    );

    // Check that the edit column header is rendered
    expect(screen.getByText('Edit')).toBeInTheDocument();
  });
});
