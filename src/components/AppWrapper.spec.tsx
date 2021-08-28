import React, { Suspense } from 'react';
import {
  render, screen, within, waitFor,
} from '@testing-library/react';
import AppWrapper from './AppWrapper';

describe('App', () => {
  it('should show site name', async () => {
    render(
      <Suspense fallback="loading app">
        <AppWrapper />
      </Suspense>,
    );
    await waitFor(
      () => {
        const header = within(screen.getByRole('banner'));
        expect(header.queryByRole('heading', { name: /printables/i })).toBeInTheDocument();
      },
    );
  });
});
