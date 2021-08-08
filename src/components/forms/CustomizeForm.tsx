/* eslint-disable @typescript-eslint/no-unsafe-member-access */
import React, {
  ReactNode, FormEvent, ChangeEvent,
} from 'react';
import html2pdf from 'html2pdf.js';
import {
  Button, Collapse, makeStyles, Select, Typography,
} from '@material-ui/core';
import Alert from '@material-ui/lab/Alert';
import FieldSet from './FieldSet';
import { usePaperOptions } from '../PaperOptionsProvider';
import paperSizes, { getPaperSizeFromName, Orientation } from '../../lib/paperSizes';

const calendarFormStyles = makeStyles((theme) => ({
  wrapper: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  form: {
    width: '100%',
    marginTop: theme.spacing(1),

    '& > section': {
      marginBottom: theme.spacing(3),
    },
  },
  submit: {
    margin: theme.spacing(1, 0, 2),
  },
}));

interface CustomizeFormProps {
  onBeforePrint: () => boolean;
  name: string;
  children: ReactNode;
  error?: string | null,
}

interface EventWithSubmitter extends Event {
  submitter: HTMLButtonElement | undefined;
}

function zeroPad(n: number): string {
  return n > 9 ? n.toString() : `0${n}`;
}

function timeStamp(): string {
  const now = new Date();
  return `${now.getFullYear()}-${zeroPad(now.getMonth())}-${zeroPad(now.getDate())}`;
}

const CustomizeForm = ({
  onBeforePrint, name, children, error = null,
}: CustomizeFormProps): JSX.Element => {
  const classes = calendarFormStyles();
  const { options, setOptions } = usePaperOptions();

  const onSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (onBeforePrint()) {
      const nativeEvent = event.nativeEvent as EventWithSubmitter;
      const submitType: string = nativeEvent.submitter === undefined ? 'print' : nativeEvent.submitter.value;
      if (submitType === 'pdf') {
        const element = document.querySelector('#paper-preview');
        if (element !== null) {
          element.classList.add('print-ready');
          // eslint-disable-next-line @typescript-eslint/no-unsafe-call
          html2pdf(element, {
            filename: `${name} ${timeStamp()}`,
            pagebreak: { mode: 'css' },
            html2canvas: {
              scale: 3,
            },
            jsPDF: {
              format: options.paperSize.code,
              orientation: options.orientation,
            },
          }).then(() => element.classList.remove('print-ready'))
            .catch((e) => console.error(e));
        }
      } else {
        window.print();
      }
    }
  };

  const onChangePaperSize = (event: ChangeEvent<{ value: unknown }>) => {
    const sizeName = event.target.value as string;
    setOptions({
      ...options,
      paperSize: getPaperSizeFromName(sizeName),
    });
  };

  const onChangeOrientation = (event: ChangeEvent<{ value: unknown }>) => {
    const orientation = event.target.value as string;
    if (orientation !== 'portrait' && orientation !== 'landscape') {
      throw Error(`Unknown orientation ${orientation}`);
    }
    setOptions({
      ...options,
      orientation: event.target.value as Orientation,
    });
  };

  return (
    <div className={classes.wrapper}>
      <form className={classes.form} onSubmit={onSubmit}>
        <Collapse in={!!error}>
          <Alert severity="error">{ error }</Alert>
        </Collapse>

        <section aria-label="Main Customization">
          {children}
        </section>
        <section aria-label="Printing Options">
          <Typography
            variant="h6"
            component="h2"
          >
            Print Options
          </Typography>
          <FieldSet
            label="Paper Size"
            id="select-paper-size"
          >
            <Select
              native
              name="paperSize"
              id="select-paper-size"
              fullWidth
              value={options.paperSize.name}
              onChange={onChangePaperSize}
            >
              {
                Array.from(paperSizes.values()).map((size) => (
                  <option key={size.name} value={size.name}>{size.name}</option>
                ))
              }
            </Select>
          </FieldSet>
          <FieldSet
            label="Orientation"
            id="select-paper-orientation"
          >
            <Select
              native
              name="month"
              id="select-paper-orientation"
              value={options.orientation}
              fullWidth
              onChange={onChangeOrientation}
            >
              <option value="portrait">Portrait</option>
              <option value="landscape">Landscape</option>
            </Select>

          </FieldSet>
        </section>
        <Button
          type="submit"
          variant="contained"
          color="primary"
          size="large"
          className={classes.submit}
          disabled={error !== null}
          value="print"
          name="print"
        >
          Print
          {' '}
          { name }
        </Button>
        <p>
          Note: Make sure to match the paper size and orientation
          on the browser&rsquo;s printer settings.
        </p>

        <p> -- or --</p>

        <Button
          type="submit"
          variant="contained"
          color="primary"
          size="large"
          className={classes.submit}
          disabled={error !== null}
          value="pdf"
          name="pdf"
        >
          Generate PDF
        </Button>
        <p>Warning: Generate PDF is experimental.</p>
      </form>
    </div>
  );
};

CustomizeForm.defaultProps = {
  error: null,
};

export default CustomizeForm;
