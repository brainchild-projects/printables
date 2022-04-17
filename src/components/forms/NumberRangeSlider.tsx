/* eslint-disable react/destructuring-assignment */
import {
  Slider, Typography, makeStyles, Grid, FormControl, TextField,
} from '@material-ui/core';
import React, { ChangeEvent, useEffect, useRef } from 'react';
import HtmlFieldChangeEvent from '../../lib/HtmlFieldChangeEvent';
import './NumberRangeSlider.css';
import Range from '../../lib/Range';

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

const useStyles = makeStyles(() => ({
  root: {
    width: '100%',
  },
  label: {
    margin: '10px 0 16px',
  },
  inputGrid: {
    justifyContent: 'space-between',
  },
  input: {
    // width: 42,
  },
  slider: {
    marginTop: 0,
    width: 'calc(100% - 4px)',
    marginLeft: 2,
  },
}));

export type NumberRangeChangeCallback = (value: Range, event: HtmlFieldChangeEvent) => void;

interface NumberRangeSliderProps extends Range {
  label: string;
  id: string;
  magnitude?: number;
  onChange: NumberRangeChangeCallback;
  'data-test'?: string;
}

type ChangeHanlder = (value: number | number[], event: HtmlFieldChangeEvent) => void;
type InputChangeCallback = (value: number) => Range;
type InputChangeHandler = (event: ChangeEvent<HTMLInputElement>) => void;
type InputChangeHandlerBuilder = (callback: InputChangeCallback) => InputChangeHandler;

function NumberRangeSlider(options: NumberRangeSliderProps): JSX.Element {
  const classes = useStyles();
  const {
    from, to, label, onChange, id, magnitude,
  } = options;
  const labelId = `${id}-label`;
  const changeHandler: ChangeHanlder = (value, event) => {
    const [rangeFrom, rangeTo] = value as number[];
    const calcFrom = valueScale(rangeFrom);
    const calcTo = valueScale(rangeTo);
    if ((calcFrom !== from || calcTo !== to) && (calcFrom <= calcTo)) {
      onChange({ from: calcFrom, to: calcTo }, event);
    }
  };

  const handleInputChange: InputChangeHandlerBuilder = (callback) => (event) => {
    const { value } = event.target;
    if (value !== '') {
      const updated = callback(Number.parseInt(value, 10));
      if (updated.from <= updated.to) {
        onChange(updated, event);
      }
    }
  };

  const handleInputFromChange = handleInputChange((value) => ({
    from: value, to,
  }));

  const handleInputToChange = handleInputChange((value) => ({
    from, to: value,
  }));

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

  const ref = useRef<HTMLDivElement | null>(null);
  useEffect(() => {
    const root = ref.current;
    if (root !== null) {
      const inputs = root.querySelectorAll('.hidden-spinners');
      inputs.forEach((element) => {
        const input = element as HTMLInputElement;
        input.addEventListener('mouseover', setInputActive);
        input.addEventListener('focus', setInputActive);
        input.addEventListener('mouseleave', setInputInActive);
        input.addEventListener('blur', setInputInActive);
      });
    }

    return () => {
      if (root !== null) {
        const inputs = root.querySelectorAll('.hidden-spinners');
        inputs.forEach((element) => {
          const input = element as HTMLInputElement;
          input.removeEventListener('mouseover', setInputActive);
          input.removeEventListener('focus', setInputActive);
          input.removeEventListener('mouseleave', setInputInActive);
          input.removeEventListener('blur', setInputInActive);
        });
      }
    };
  });

  const marks = [
    {
      value: 0,
      label: '0',
    },
    {
      value: 10,
      label: '10',
    },
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
  const maxSlider = marks[marks.length - 1]?.value ?? 20;

  return (
    <div className={classes.root} ref={ref}>
      <Typography
        id={labelId}
        className={classes.label}
      >
        {label}
      </Typography>

      <Grid container spacing={2} alignItems="center" className={classes.inputGrid}>
        <Grid item xs={6}>
          <FormControl>
            <TextField
              id={`${id}-from`}
              value={from}
              name="rangeFrom"
              margin="dense"
              onChange={handleInputFromChange}
              type="number"
              label="From:"
              variant="outlined"
              size="small"
              inputProps={{
                step: 1,
                min: 0,
                max,
                type: 'number',
                className: `${classes.input} hidden-spinners`,
                'data-testid': `${id}-from`,
              }}
            />
          </FormControl>
        </Grid>
        <Grid item xs={6}>
          <FormControl>
            <TextField
              id={`${id}-to`}
              value={to}
              name="rangeTo"
              margin="dense"
              onChange={handleInputToChange}
              type="number"
              label="To:"
              variant="outlined"
              size="small"
              inputProps={{
                step: 1,
                min: 0,
                max,
                type: 'number',
                className: `${classes.input} hidden-spinners`,
                'data-testid': `${id}-to`,
              }}
            />
          </FormControl>
        </Grid>
      </Grid>
      <Slider
        value={[valueDescale(from), valueDescale(to)]}
        className={classes.slider}
        aria-labelledby={labelId}
        min={0}
        step={1}
        max={maxSlider}
        data-test={options['data-test']}
        marks={marks}
        scale={valueScale}
        onChange={(event, value) => {
          changeHandler(value, event as HtmlFieldChangeEvent);
        }}
        valueLabelDisplay="off"
      />
    </div>
  );
}

NumberRangeSlider.defaultProps = {
  magnitude: 2,
};

export default NumberRangeSlider;
