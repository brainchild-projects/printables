/* eslint-disable @typescript-eslint/no-unsafe-member-access */
import React, {
  ReactNode, FormEvent, ChangeEvent, useState,
} from 'react';
import html2pdf from 'html2pdf.js';
import {
  Button, Collapse, IconButton, makeStyles, Typography,
} from '@material-ui/core';
import HelpIcon from '@material-ui/icons/Help';
import Alert from '@material-ui/lab/Alert';
import { PaperOptions, usePaperOptions } from '../PaperOptionsProvider';
import paperSizes, { getPaperSizeFromName, Orientation } from '../../lib/paperSizes';
import ModalDialog from '../ModalDialog';
import { useInstanceOptions } from '../InstanceSettingsProvider';
import SelectField from './SelectField';
import arrayToOptions from './arrayToOptions';

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
  onBeforePrint?: () => boolean;
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

function generatePDF(name: string, options: PaperOptions): void {
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
      // eslint-disable-next-line no-console
      .catch((e) => console.error(e));
  }
}

function CustomizeForm({
  onBeforePrint = () => true, name, children, error = null,
}: CustomizeFormProps): JSX.Element {
  const classes = calendarFormStyles();
  const { options, setOptions } = usePaperOptions();
  const instanceSettings = useInstanceOptions();
  const instanceOptions = instanceSettings.options;
  const setInstanceOptions = instanceSettings.setOptions;

  const [showPrintingHelp, setShowPrintingHelp] = useState<boolean>(false);

  const onSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (onBeforePrint()) {
      const nativeEvent = event.nativeEvent as EventWithSubmitter;
      const submitType: string = nativeEvent.submitter === undefined ? 'print' : nativeEvent.submitter.value;
      if (submitType === 'pdf') {
        generatePDF(name, options);
      } else if (!instanceOptions.hasAlreadyPrinted) {
        setShowPrintingHelp(true);
      } else {
        window.print();
      }
    }
  };

  const onPrintingHelpClose = () => {
    setShowPrintingHelp(false);
    if (!instanceOptions.hasAlreadyPrinted) {
      setInstanceOptions({ hasAlreadyPrinted: true });
      window.print();
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
          <Alert severity="error">{error}</Alert>
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
          <SelectField
            label="Paper Size"
            id="select-paper-size"
            name="paperSize"
            value={options.paperSize.name}
            onChange={onChangePaperSize}
          >
            {
              arrayToOptions(
                Array.from(paperSizes.values()).map((size) => size.name),
              )
            }
          </SelectField>

          <SelectField
            label="Orientation"
            id="select-paper-orientation"
            name="paperOrientation"
            value={options.orientation}
            onChange={onChangeOrientation}
          >
            <option value="portrait">Portrait</option>
            <option value="landscape">Landscape</option>
          </SelectField>
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
          id="print-button"
        >
          Print
          {' '}
          {name}
        </Button>
        <IconButton
          aria-label="Printing Tips"
          onClick={() => setShowPrintingHelp(true)}
        >
          <HelpIcon />
        </IconButton>
        <ModalDialog
          title="Printing Tips"
          open={showPrintingHelp}
          onClose={onPrintingHelpClose}
          closeButtonText="Got it"
        >
          <Typography gutterBottom>
            Make sure to match the paper size and orientation
            on your browser&rsquo;s printer settings.
            <br />
          </Typography>
          <Typography gutterBottom variant="h6" component="h2">Firefox Users</Typography>
          <Typography gutterBottom>
            On the print dialog, please set
          </Typography>
          <Typography component="ul" gutterBottom>
            <li>
              <strong>Scale:</strong>
              {' '}
              “100” instead of &quot;Fit to page width&quot;
            </li>
            <li>
              <strong>Margins:</strong>
              {' '}
              &quot;Default&quot;
            </li>
          </Typography>
        </ModalDialog>

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
}

CustomizeForm.defaultProps = {
  error: null,
  onBeforePrint: () => true,
};

export default CustomizeForm;
