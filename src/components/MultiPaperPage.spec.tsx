/* eslint-disable @typescript-eslint/no-non-null-assertion */
import React from 'react';
import { render, screen } from '@testing-library/react';
import MultiPaperPage from './MultiPaperPage';

describe('MultiPaperPage', () => {
  beforeEach(() => {
    render(
      <MultiPaperPage<string>
        contentWrapper="div"
        contentWrapperClassName="foo"
        data={['a', 'b', 'c', 'd']}
        itemSelector="p"
        builder={
          (letter, index) => (
            <p key={letter}>
              {letter}
              {' '}
              {index}
            </p>
          )
        }
      />,
    );
  });

  it('renders elements', () => {
    const paragraph = screen.getByText('b 1');
    expect(paragraph).toBeInTheDocument();
  });

  it('adds class to wrapper element', () => {
    const wrapper = screen.getByText('b 1').parentNode!;
    expect(wrapper).toHaveClass('foo');
  });
});
