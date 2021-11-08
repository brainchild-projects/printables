import React from 'react';
import { render } from '@testing-library/react';
import FontLoad from './FontLoad';

describe('FontLoad', () => {
  let unmount: () => void;
  beforeEach(() => {
    unmount = render(
      <FontLoad href="https://somewhere.com/fontfamily" />,
    ).unmount;
  });

  it('adds link on head', () => {
    const link = document.querySelector('head link[href="https://somewhere.com/fontfamily"]');
    expect(link).toBeInTheDocument();
  });

  it('sets rel as stylesheet', () => {
    const link = document.querySelector('head link[href="https://somewhere.com/fontfamily"]');
    const rel = link?.getAttribute('rel');
    expect(rel).toBeTruthy();
    expect(rel).toEqual('stylesheet');
  });

  describe('if it is called again with the same href', () => {
    beforeEach(() => render(
      <FontLoad href="https://somewhere.com/fontfamily" />,
    ));

    it('does not add another link node', () => {
      const links = document.querySelectorAll('head link[href="https://somewhere.com/fontfamily"]');
      expect(links.length).toEqual(1);
    });
  });

  describe('when the element unmounts', () => {
    beforeEach(() => {
      unmount();
    });

    it('removes link element from dom', () => {
      const links = document.querySelectorAll('head link[href="https://somewhere.com/fontfamily"]');
      expect(links.length).toEqual(0);
    });
  });
});
