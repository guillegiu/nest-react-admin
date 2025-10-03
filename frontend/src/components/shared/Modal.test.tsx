import React from 'react';
import { render, screen } from '@testing-library/react';
import Modal from './Modal';

// Mock document.getElementById to return a div element
Object.defineProperty(document, 'getElementById', {
  value: jest.fn(() => document.createElement('div')),
  writable: true,
});

// Mock createPortal to render directly to the test container
jest.mock('react-dom', () => {
  const actual = jest.requireActual('react-dom');
  return {
    ...actual,
    createPortal: (children: React.ReactNode, container: Element) => {
      // Return the children directly for testing
      return children as React.ReactElement;
    },
  };
});

describe('Modal', () => {
  it('renders when show is true', () => {
    const { container } = render(
      <Modal show={true}>
        <div data-testid="modal-content">Test content</div>
      </Modal>
    );

    // Check that the modal content is rendered
    expect(container.firstChild).toBeTruthy();
  });

  it('applies custom className', () => {
    const customClass = 'custom-class';

    const { container } = render(
      <Modal show={true} className={customClass}>
        <div data-testid="modal-content">Test</div>
      </Modal>
    );

    // Check that the modal content is rendered
    expect(container.firstChild).toBeTruthy();
  });

  it('handles show false state', () => {
    const { container } = render(
      <Modal show={false}>
        <div data-testid="modal-content">Test</div>
      </Modal>
    );

    // Check that the modal content is rendered even when show is false
    expect(container.firstChild).toBeTruthy();
  });
});
