/* eslint-disable react/destructuring-assignment */
import {
  Slider, Typography, Grid,
} from '@material-ui/core';
import classNames from 'classnames';
import React, { useEffect, useRef } from 'react';
import HtmlFieldChangeEvent from '../../lib/HtmlFieldChangeEvent';
import Range from '../../lib/Range';
import styleIt from '../styleIt';
import SmallNumberField from './SmallNumberField';

const { round } = Math;

const valueScale = (x: number): number => {
  if (x < 11) {
    return x;
  }
  if (x < 21) {
    return (x - 10) * 10;
  }
  return (x - 20) * 100;
};

const valueDescale = (x: number): number => {
  if (x > 100) {
    return round((x / 100) + 20);
  }
  if (x > 10) {
    return round((x / 10) + 10);
  }
  return x;
};

const useStyles = styleIt(() => ({
  root: {
    width: '100%',
  },
  label: {
    margin: '10px 0 16px',
  },
  inputGrid: {
    justifyContent: 'space-between',
  },
  slider: {
    marginTop: 0,
    width: 'calc(100% - 4px)',
    marginLeft: 2,
  },
}));

export type NumberRangeChangeCallback = (value: Range) => void;

const activeEvents = ['mouseover', 'focus'];
const inactiveEvents = ['mouseleave', 'blur'];

const setInputActive: EventListener = (event) => {
  const input = event.target as HTMLInputElement;
  input.classList.add('hidden-spinners-active');
};

const setInputInActive: EventListener = (event) => {
  const input = event.target as HTMLInputElement;
  if (input !== document.activeElement) {
    input.classList.remove('hidden-spinners-active');
  }
};

function addListeners(input: HTMLInputElement, events: string[], listener: EventListener) {
  events.forEach((event) => {
    input.addEventListener(event, listener);
  });
}

function removeListeners(input: HTMLInputElement, events: string[], listener: EventListener) {
  events.forEach((event) => {
    input.removeEventListener(event, listener);
  });
}

interface NumberRangeSliderProps extends Range {
  label: string;
  id: string;
  magnitude?: number;
  onChange: NumberRangeChangeCallback;
  'data-testid'?: string;
}

type ChangeHanlder = (value: number | number[], event: HtmlFieldChangeEvent) => void;
type InputChangeCallback = (value: number) => Range;
type InputChangeHandler = (value: number) => void;
type InputChangeHandlerBuilder = (callback: InputChangeCallback) => InputChangeHandler;

function getMarksAndMax(magnitude: number | undefined) {
  const marks = [
    { value: 0, label: '0' },
    { value: 10, label: '10' },
  ];
  let max = 10;
  if (magnitude === 2) {
    marks.push({ value: 20, label: '100' });
    max = 100;
  }
  if (magnitude === 3) {
    marks.push({ value: 30, label: '1000' });
    max = 1000;
  }
  return { marks, max };
}

function NumberRangeSlider(options: NumberRangeSliderProps): JSX.Element {
  const classes = useStyles();
  const {
    from, to, label, onChange, id, magnitude,
  } = options;
  const labelId = `${id}-label`;
  const changeHandler: ChangeHanlder = (value) => {
    const [rangeFrom, rangeTo] = value as number[];
    const calcFrom = valueScale(rangeFrom);
    const calcTo = valueScale(rangeTo);
    if ((calcFrom !== from || calcTo !== to) && (calcFrom <= calcTo)) {
      onChange({ from: calcFrom, to: calcTo });
    }
  };

  const handleInputChange: InputChangeHandlerBuilder = (callback) => (value) => {
    const updated = callback(value);
    if (updated.from <= updated.to) {
      onChange(updated);
    }
  };

  const handleInputFromChange = handleInputChange((value) => ({
    from: value, to,
  }));

  const handleInputToChange = handleInputChange((value) => ({
    from, to: value,
  }));

  const ref = useRef<HTMLDivElement | null>(null);
  useEffect(() => {
    const root = ref.current;
    if (root !== null) {
      const inputs = root.querySelectorAll('.hidden-spinners');
      inputs.forEach((element) => {
        const input = element as HTMLInputElement;
        addListeners(input, activeEvents, setInputActive);
        addListeners(input, inactiveEvents, setInputInActive);
      });
    }

    return () => {
      if (root !== null) {
        const inputs = root.querySelectorAll('.hidden-spinners');
        inputs.forEach((element) => {
          const input = element as HTMLInputElement;
          removeListeners(input, activeEvents, setInputActive);
          removeListeners(input, inactiveEvents, setInputInActive);
        });
      }
    };
  });

  const { marks, max } = getMarksAndMax(magnitude);
  const maxSlider = marks[marks.length - 1]?.value ?? 20;

  return (
    <div
      className={classNames(classes.root, 'numberRangeSlider')}
      ref={ref}
    >
      <Typography id={labelId} className={classes.label}>
        {label}
      </Typography>

      <Grid
        container
        spacing={2}
        alignItems="center"
        className={classes.inputGrid}
      >
        <Grid item xs={6}>
          <SmallNumberField
            id={`${id}-from`}
            value={from}
            name="rangeFrom"
            label="From:"
            onChange={handleInputFromChange}
            max={max}
          />
        </Grid>
        <Grid item xs={6}>
          <SmallNumberField
            id={`${id}-to`}
            value={to}
            name="rangeTo"
            label="To:"
            onChange={handleInputToChange}
            max={max}
          />
        </Grid>
      </Grid>
      <Slider
        value={[valueDescale(from), valueDescale(to)]}
        className={classes.slider}
        aria-labelledby={labelId}
        min={0}
        step={1}
        max={maxSlider}
        data-testid={options['data-testid']}
        marks={marks}
        scale={valueScale}
        onChange={(event, value) => changeHandler(value, event as HtmlFieldChangeEvent)}
        valueLabelDisplay="off"
      />
    </div>
  );
}

NumberRangeSlider.defaultProps = {
  magnitude: 2,
};

export default NumberRangeSlider;
