import classNames from 'classnames';
import React, { ComponentPropsWithRef } from 'react';
import styleIt, { StyleRecords } from '../styleIt';
import AnyTag from './AnyTag';
import objectFromObject from '../../lib/objectFromObject';
import objectFromArray from '../../lib/objectFromArray';

export type Variant = 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6' | 'body1' | 'body2' | 'subtitle1' | 'subtitle2' | 'caption' | 'button' | 'overline' | 'srOnly' | 'inherit';
type Align = 'inherit' | 'left' | 'center' | 'right' | 'justify';
type Color = 'initial' | 'inherit' | 'primary' | 'secondary' | 'textPrimary' | 'textSecondary' | 'error';

const aligns: Align[] = ['inherit', 'left', 'center', 'right', 'justify'];
// const colors: Color[] = ['initial', 'inherit', 'primary', 'secondary', 'textPrimary', 'textSecondary', 'error'];
const variants: Record<Variant, StyleRecords> = {
  h1: {
    fontSize: '6rem',
    fontWeight: '300',
    lineHeight: '1.167',
    letterSpacing: '-0.01562em',
  },
  h2: {
    fontSize: '3.75rem',
    fontWeight: '300',
    lineHeight: '1.2',
    letterSpacing: '-0.00833em',
  },
  h3: {
    fontSize: '3rem',
    fontWeight: '400',
    lineHeight: '1.167',
    letterSpacing: '0em',
  },
  h4: {
    fontSize: '2.125rem',
    fontWeight: '400',
    lineHeight: '1.235',
    letterSpacing: '0.00735em',
  },
  h5: {
    fontSize: '1.5rem',
    fontWeight: '400',
    lineHeight: '1.334',
    letterSpacing: '0em',
  },
  h6: {
    fontSize: '1.25rem',
    fontWeight: '500',
    lineHeight: '1.75',
    letterSpacing: '0.0075em',
  },
  body1: {
    fontSize: '1rem',
    fontWeight: '400',
    lineHeight: '1.5',
    letterSpacing: '0.00938em',
  },
  body2: {
    fontSize: '0.875rem',
    fontWeight: '400',
    lineHeight: '1.43',
    letterSpacing: '0.01071em',
  },
  subtitle1: {
    fontSize: '1rem',
    fontWeight: '400',
    lineHeight: '1.75',
    letterSpacing: '0.00938em',
  },
  subtitle2: {
    fontSize: '0.875rem',
    fontWeight: '500',
    lineHeight: '1.57',
    letterSpacing: '0.00714em',
  },
  caption: {
    fontSize: '0.75rem',
    fontWeight: '400',
    lineHeight: '1.66',
    letterSpacing: '0.03333em',
  },
  button: {
    fontSize: '0.875rem',
    fontWeight: '500',
    lineHeight: '1.75',
    letterSpacing: '0.02857em',
    textTransform: 'uppercase',
  },
  overline: {
    fontSize: '0.75rem',
    fontWeight: '400',
    lineHeight: '2.66',
    letterSpacing: '0.08333em',
    textTransform: 'uppercase',
  },
  srOnly: {
    border: '0',
    clip: 'rect(0, 0, 0, 0)',
    height: '1px',
    margin: '-1px',
    overflow: 'hidden',
    padding: '0',
    position: 'absolute',
    width: '1px',
  },
  inherit: {
    fontSize: 'inherit',
    fontWeight: 'inherit',
    lineHeight: 'inherit',
    letterSpacing: 'inherit',
    textTransform: 'inherit',
  },
};

const colors: Record<Color, StyleRecords> = {
  inherit: { color: 'inherit' },
  initial: { color: 'initial' },
  primary: { color: '#3f51b5' },
  secondary: { color: '#f50057' },
  textPrimary: { color: '#000000' },
  textSecondary: { color: '#0000008a' },
  error: { color: '#f44336' },
};

const styles = styleIt(() => ({
  typography: {
    margin: 0,
  },
  '!.typography-gutter-bottom': {
    marginBottom: '0.35em',
  },
  '!.typography-paragraph': {
    marginBottom: 16,
  },
  ...objectFromArray(aligns, (align) => [`!.typography-align-${align}`, { textAlign: align }]),
  ...objectFromObject(variants, ([variant, style]) => [`!.typography-${variant}`, style]),
  ...objectFromObject(colors, ([color, style]) => [`!.typography-color-${color}`, style]),
}));

const variantsToTag: Record<Variant, AnyTag> = {
  h1: 'h1',
  h2: 'h2',
  h3: 'h3',
  h4: 'h4',
  h5: 'h5',
  h6: 'h6',
  body1: 'p',
  body2: 'p',
  subtitle1: 'p',
  subtitle2: 'p',
  caption: 'p',
  button: 'button',
  overline: 'span',
  srOnly: 'span',
  inherit: 'span',
};

const componentFromVariant = (variant: Variant | undefined): AnyTag | undefined => {
  if (variant === undefined) {
    return undefined;
  }
  return variantsToTag[variant];
};

type TypographyProps<Tag extends AnyTag> = {
  component?: Tag | undefined;
  className?: string | undefined;
  variant?: Variant | undefined;
  align?: Align | undefined;
  color?: Color | undefined;
  gutterBottom?: boolean | undefined;
  paragraph?: boolean | undefined;
} & ComponentPropsWithRef<Tag>;

function Typography<Tag extends AnyTag>({
  component,
  className,
  variant,
  align,
  color,
  gutterBottom,
  paragraph,
  ...other
}: TypographyProps<Tag>): JSX.Element {
  const classes = styles();
  const Component = (component as Tag | undefined) || componentFromVariant(variant as Variant) || 'span';
  return (
    <Component
      className={classNames(
        className as string,
        classes.typography,
        {
          'typography-gutter-bottom': gutterBottom as boolean,
          'typography-paragraph': paragraph as boolean,
          [`typography-${variant as Variant}`]: variant as Variant | undefined,
          [`typography-align-${align as Align}`]: align as Align | undefined,
          [`typography-color-${color as Color}`]: color as Color | undefined,
        },
      )}
      // eslint-disable-next-line react/jsx-props-no-spreading
      {...other}
    />
  );
}

Typography.defaultProps = {
  component: undefined,
  className: undefined,
  variant: 'body1',
  align: 'inherit',
  color: 'initial',
  gutterBottom: false,
  paragraph: false,
};

export default Typography;

