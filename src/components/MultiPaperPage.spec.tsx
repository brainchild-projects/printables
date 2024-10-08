/* eslint-disable testing-library/no-node-access */
/* eslint-disable @typescript-eslint/no-non-null-assertion */
import React from 'react';
import { render, screen } from '@testing-library/react';
import { vi } from 'vitest';
import MultiPaperPage, { PropsCallback } from './MultiPaperPage';

describe('MultiPaperPage', () => {
  let propsCallback: PropsCallback;
  beforeEach(() => {
    propsCallback = vi.fn((props, { instanceIndex, memberIndex }) => (
      { ...props, 'data-info': `${instanceIndex} ${memberIndex}` }
    ));
    render(
      <MultiPaperPage<string>
        wrapper="div"
        wrapperProps={{ className: 'foo' }}
        wrapperPropsCallback={propsCallback}
        data={['a', 'b', 'c', 'd']}
        renderItems={
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

  it('calls wrapper props instance callback', () => {
    expect(propsCallback).toHaveBeenCalledWith({ className: 'foo' }, { instanceIndex: 0, memberIndex: 0 });
    const wrapper = screen.getByText('b 1').parentNode!;
    expect(wrapper).toHaveAttribute('data-info', '0 0');
  });
});
