/* eslint-disable testing-library/no-node-access */
import React from 'react';
import { render } from '@testing-library/react';
import styleIt, {
  generateStyleDeclaration,
  generateDeclarationBlocks,
  generateSelector,
  StyleDefinitionCallback,
  StyleRecords,
  BasicStyleProp,
} from './styleIt';

describe('styleIt', () => {
  let unmount: () => void;
  const styles = styleIt(() => ({
    title: {
      fontSize: 12,
      display: 'block',

      '&.red': {
        color: 'red',
      },

      '& > span': {
        color: 'blue',
      },
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

  it('sets h1.title style correctly', () => {
    const style = document.querySelector('head style');
    try {
      expect(style?.textContent).toMatch(
        /\.title-.+{font-size:12px;display:block;}\n\.title-.+\.red{color:red;}\n\.title-.+ > span{color:blue;}/,
      );
    } catch (e) {
      // eslint-disable-next-line no-console
      console.log(`Generated style:\n${style?.textContent || 'empty'}`);
      throw e;
    }
  });

  afterEach(() => unmount());
});

interface GenerateStyleDeclarationTestData {
  description: string;
  params: [string, BasicStyleProp];
  expected: string;
}

describe('generateStyleDeclaration', () => {
  const testData: GenerateStyleDeclarationTestData[] = [
    {
      description: 'generates style declaration with px',
      params: ['fontSize', 12],
      expected: 'font-size:12px;',
    },
    {
      description: 'generates style declaration with arrays',
      params: ['padding', [12, 0, 1]],
      expected: 'padding:12px 0 1px;',
    },
    {
      description: 'generates style declaration with string',
      params: ['display', 'block'],
      expected: 'display:block;',
    },
  ];

  testData.forEach(({ description, params, expected }) => {
    it(description, () => {
      const [left, right] = params;
      const styleDeclaration = generateStyleDeclaration(left, right);
      expect(styleDeclaration).toEqual(expected);
    });
  });
});

interface GenerateSelectorTestData {
  description: string;
  params: {
    value: string;
    classNames: Record<string, string>;
    parentSelector?: string;
  };
  expected: string;
}

describe('generateSelector', () => {
  const testData: GenerateSelectorTestData[] = [
    {
      description: 'pure class name with no parent',
      params: {
        value: 'title',
        classNames: { title: 'title-foo' },
      },
      expected: '.title-foo',
    },
    {
      description: 'simple selector with parent and ampersand',
      params: {
        value: '&.bar',
        classNames: { title: 'title-foo' },
        parentSelector: '.title-foo',
      },
      expected: '.title-foo.bar',
    },
    {
      description: 'simple selector with parent and no ampersand',
      params: {
        value: '.bar',
        classNames: { title: 'title-foo' },
        parentSelector: '.title-foo',
      },
      expected: '.title-foo .bar',
    },
    {
      description: 'simple selector with parent and ampersand as child',
      params: {
        value: '.bar &',
        classNames: { title: 'title-foo' },
        parentSelector: '.title-foo',
      },
      expected: '.bar .title-foo',
    },
    {
      description: 'simple selector with ampersand but no parent',
      params: {
        value: '&.bar',
        classNames: { title: 'title-foo' },
      },
      expected: '&.bar',
    },
    {
      description: 'pure class name with no parent and no matching class name',
      params: {
        value: 'title',
        classNames: { heading: 'title-foo' },
      },
      expected: 'title',
    },
    {
      description: 'comma-delimited class names with parent selector',
      params: {
        value: '.bar, .baz',
        classNames: { title: 'title-foo' },
        parentSelector: '.title-foo',
      },
      expected: '.title-foo .bar,.title-foo .baz',
    },
    {
      description: 'descendant selector',
      params: {
        value: '& > .bar',
        classNames: { title: 'title-foo' },
        parentSelector: '.title-foo',
      },
      expected: '.title-foo > .bar',
    },
  ];

  testData.forEach(({ description, params, expected }) => {
    it(`generates selector for ${description}`, () => {
      const { value, classNames, parentSelector } = params;
      const selector = generateSelector(value, classNames, parentSelector);
      expect(selector).toEqual(expected);
    });
  });
});

describe('generateDeclarationBlocks', () => {
  let result = '';
  let passed: [string, StyleRecords] | null = null;
  const callback: StyleDefinitionCallback = (key: string, declaration: StyleRecords) => {
    passed = [key, declaration];
    return 'foo';
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
    expect(result).toEqual('{font-size:12px;display:block;}foo');
  });

  it('passes key and declaration to callback', () => {
    expect(passed).toEqual(['&.foo', { color: 'red' }]);
  });
});
