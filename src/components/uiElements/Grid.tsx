import classNames from 'classnames';
import React, { ComponentPropsWithRef } from 'react';
import styleIt from '../styleIt';
import AnyTag from './AnyTag';
import objectFromNumber from '../../lib/objectFromNumber';
import objectFromArray from '../../lib/objectFromArray';

type JustifyContent = 'flex-start' | 'center' | 'flex-end' | 'space-between' | 'space-around' | 'space-evenly';
type AlignContent = 'stretch' | 'center' | 'flex-start' | 'flex-end' | 'space-between' | 'space-around';
type AlignItems = 'flex-start' | 'center' | 'flex-end' | 'stretch' | 'baseline';

const justifyContentValues: JustifyContent[] = ['flex-start', 'center', 'flex-end', 'space-between', 'space-around', 'space-evenly'];
const alignContentValues: AlignContent[] = ['stretch', 'center', 'flex-start', 'flex-end', 'space-between', 'space-around'];
const alignItemsValues: AlignItems[] = ['flex-start', 'center', 'flex-end', 'stretch', 'baseline'];
const spacingIntervals = [0, 4, 8, 12, 16, 20, 24, 28, 32, 36, 40];

const styles = styleIt(() => ({
  '!.grid-container': {
    width: '100%',
    display: 'flex',
    flexWrap: 'wrap',
    boxSizing: 'border-box',
  },
  '!.grid-item': {
    boxSizing: 'border-box',
    margin: '0',
  },
  ...objectFromNumber(11, (i) => [
    `!.grid-spacing-${i}`,
    {
      width: `calc(100% + ${spacingIntervals[i] * 2}px)`,
      margin: `-${spacingIntervals[i]}px`,

      '& > .grid-item': {
        padding: `${spacingIntervals[i]}px`,
      },
    },
  ]),
  ...objectFromNumber(12, (i) => [
    `!.grid-xs-${i}`,
    {
      flexGrow: '0',
      flexBasis: `${100 * i / 12}%`,
      maxWidth: `${100 * i / 12}%`,
    },
  ]),
  ...objectFromNumber(12, (i) => [
    `!.grid-sm-${i}`,
    {
      '@media (min-width: 600px)': {
        flexGrow: '0',
        flexBasis: `${100 * i / 12}%`,
        maxWidth: `${100 * i / 12}%`,
      },
    },
  ]),
  ...objectFromNumber(12, (i) => [
    `!.grid-md-${i}`,
    {
      '@media (min-width: 960px)': {
        flexGrow: '0',
        flexBasis: `${100 * i / 12}%`,
        maxWidth: `${100 * i / 12}%`,
      },
    },
  ]),
  ...objectFromNumber(12, (i) => [
    `!.grid-lg-${i}`,
    {
      '@media (min-width: 1280px)': {
        flexGrow: '0',
        flexBasis: `${100 * i / 12}%`,
        maxWidth: `${100 * i / 12}%`,
      },
    },
  ]),
  ...objectFromNumber(12, (i) => [
    `!.grid-xl-${i}`,
    {
      '@media (min-width: 1920px)': {
        flexGrow: '0',
        flexBasis: `${100 * i / 12}%`,
        maxWidth: `${100 * i / 12}%`,
      },
    },
  ]),
  ...objectFromArray(justifyContentValues, (i) => [
    `!.grid-justify-${i}`,
    { justifyContent: i },
  ]),
  ...objectFromArray(alignContentValues, (i) => [
    `!.grid-align-content-${i}`,
    { alignContent: i },
  ]),
  ...objectFromArray(alignItemsValues, (i) => [
    `!.grid-align-items-${i}`,
    { alignItems: i },
  ]),
}));

const DEFAULT_TAG = 'div' as const;

type GridProps<Tag extends AnyTag> = {
  component?: Tag;
  className?: string | undefined;
  container?: boolean | undefined;
  item?: boolean | undefined;
  spacing?: number | undefined;
  xs?: boolean | number | undefined;
  sm?: boolean | number | undefined;
  md?: boolean | number | undefined;
  lg?: boolean | number | undefined;
  xl?: boolean | number | undefined;
  justifyContent?: JustifyContent | undefined;
  alignContent?: AlignContent | undefined;
  alignItems?: AlignItems | undefined;
} & ComponentPropsWithRef<Tag>;

function Grid<Tag extends AnyTag>({
  component: Component = DEFAULT_TAG,
  className,
  container,
  item,
  spacing,
  xs,
  sm,
  md,
  lg,
  xl,
  justifyContent,
  alignContent,
  alignItems,
  ...other
}: GridProps<Tag>): JSX.Element {
  styles();
  const tspacing = spacing as number | undefined;
  const txs = xs as boolean | number | undefined;
  const tsm = sm as boolean | number | undefined;
  const tmd = md as boolean | number | undefined;
  const tlg = lg as boolean | number | undefined;
  const txl = xl as boolean | number | undefined;
  const tjustifyContent = justifyContent as JustifyContent | undefined;
  const talignContent = alignContent as AlignContent | undefined;
  const talignItems = alignItems as AlignItems | undefined;

  return (
    <Component
      className={classNames(
        {
          'grid-container': !!container,
          'grid-item': !!item,
        },
        {
          [`grid-spacing-${tspacing as number}`]: tspacing,
        },
        {
          [`grid-xs-${txs as number}`]: txs,
          [`grid-sm-${tsm as number}`]: tsm,
          [`grid-md-${tmd as number}`]: tmd,
          [`grid-lg-${tlg as number}`]: tlg,
          [`grid-xl-${txl as number}`]: txl,
        },
        {
          [`grid-justify-${tjustifyContent as JustifyContent}`]: tjustifyContent,
          [`grid-align-content-${talignContent as AlignContent}`]: talignContent,
          [`grid-align-items-${talignItems as AlignItems}`]: talignItems,
        },
        className as string | undefined,
      )}
      // eslint-disable-next-line react/jsx-props-no-spreading
      {...other}
    />
  );
}

Grid.defaultProps = {
  className: undefined,
  component: 'div',
  container: false,
  item: false,
  spacing: 0,
  xs: false,
  sm: false,
  md: false,
  lg: false,
  xl: false,
  justifyContent: undefined,
  alignContent: undefined,
  alignItems: undefined,
};

export default Grid;

