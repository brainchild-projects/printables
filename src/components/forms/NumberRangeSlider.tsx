/* eslint-disable react/destructuring-assignment */
import { Slider } from '@material-ui/core';
import React from 'react';

const valueScale = (x: number): number => {
  if (x < 11) {
    return x;
  }
  return (x - 10) * 10;
};

const valueDescale = (x: number): number => {
  if (x > 10) {
    return Math.round((x / 10) + 10);
  }
  return x;
};

interface Range {
  from: number;
  to: number;
}

export type NumberRangeChangeCallback = (event: React.ChangeEvent<unknown>, value: Range) => void;

interface NumberRangeSliderProps extends Range {
  onChange: NumberRangeChangeCallback;
  'aria-labelledby': string;
  'data-cy'?: string;
}

function NumberRangeSlider(options: NumberRangeSliderProps): JSX.Element {
  const { from, to, onChange } = options;
  return (
    <Slider
      value={[valueDescale(from), valueDescale(to)]}
      min={0}
      step={1}
      max={20}
      data-cy={options['data-cy']}
      marks={[
        {
          value: 0,
          label: '0',
        },
        {
          value: 10,
          label: '10',
        },
        {
          value: 20,
          label: '100',
        },
      ]}
      scale={valueScale}
      onChange={(event, value) => {
        const [rangeFrom, rangeTo] = value as number[];
        const calcFrom = valueScale(rangeFrom);
        const calcTo = valueScale(rangeTo);
        if (calcFrom !== from || calcTo !== to) {
          onChange(event, { from: calcFrom, to: calcTo });
        }
      }}
      valueLabelDisplay="on"
      aria-labelledby={options['aria-labelledby']}
    />
  );
}

export default NumberRangeSlider;
