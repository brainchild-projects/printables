/* eslint-disable testing-library/no-node-access */
import React from 'react';
import { render } from '@testing-library/react';
import styleIt, { generateStyleDeclaration, generateDeclarationBlocks, StyleDefinitionCallback, StyleRecords } from './styleIt';

describe('styleIt', () => {
  let unmount: () => void;
  const styles = styleIt(() => ({
    title: {
      fontSize: 12,
      display: 'block',
    },
  }));

  function MyComponents(): JSX.Element {
    const classes = styles();
    return <h1 className={classes.title}>Hello</h1>;
  }

  beforeEach(() => {
    unmount = render(<MyComponents />).unmount;
  });

  it('adds style on head', () => {
    const style = document.querySelector('head style');
    expect(style).toBeInTheDocument();
  });

  it.skip('sets h1.title style correctly', () => {
    const style = document.querySelector('head style');
    expect(style?.textContent).toMatch(/h1.title-.+{font-size:12px;display:block;}/);
  });

  afterEach(() => unmount());
});

interface GenerateStyleDeclarationTestParam {
  description: string;
  params: [string, string | number];
  expected: string;
}

describe('generateStyleDeclaration', () => {
  const testData: GenerateStyleDeclarationTestParam[] = [
    {
      description: 'generates style declaration with px',
      params: ['fontSize', 12],
      expected: 'font-size:12px;',
    },
    {
      description: 'generates style declaration with string',
      params: ['display', 'block'],
      expected: 'display:block;',
    },
  ];

  testData.forEach(({ description, params, expected }) => {
    it(description, () => {
      const styleDeclaration = generateStyleDeclaration(...params);
      expect(styleDeclaration).toEqual(expected);
    });
  });
});

describe('generateDeclarationBlocks', () => {
  let result = '';
  let passed: [string, StyleRecords] | null = null;
  const callback: StyleDefinitionCallback = (key: string, declaration: StyleRecords) => {
    passed = [key, declaration];
  };

  beforeEach(() => {
    result = generateDeclarationBlocks({
      fontSize: 12,
      display: 'block',
      '&.foo': {
        color: 'red',
      },
    }, callback);
  });

  it('generates declaration block', () => {
    expect(result).toEqual('{font-size:12px;display:block;}');
  });

  it('passes key and declaration to callback', () => {
    expect(passed).toEqual(['&.foo', { color: 'red' }]);
  });
});
