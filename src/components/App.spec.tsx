import React from 'react';
import { render, screen, within } from '@testing-library/react';
import App from './App';

describe('App', () => {
  it('should show site name', () => {
    render(<App />);
    const header = within(screen.getByRole('banner'));
    expect(header.queryByRole('heading', { name: /printables/i })).toBeInTheDocument();
  });
});
