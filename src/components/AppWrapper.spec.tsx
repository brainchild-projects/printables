import React from 'react';
import { vi } from 'vitest';
import {
  render, screen, within, waitFor,
} from '@testing-library/react';
import AppWrapper from './AppWrapper';

describe('App', () => {
  const oldScrollTo = window.scrollTo;

  beforeEach(() => {
    window.scrollTo = vi.fn().mockImplementation(oldScrollTo);
  });

  afterEach(() => {
    window.scrollTo = oldScrollTo;
  });

  it('should show site name', async () => {
    render(
      <React.Suspense fallback="loading app">
        <AppWrapper />
      </React.Suspense>,
    );
    await waitFor(
      () => {
        const header = within(screen.getByRole('banner'));
        expect(header.getByRole('heading', { name: /printables/i })).toBeInTheDocument();
      },
      {
        timeout: 3000,
      },
    );
  });
});
