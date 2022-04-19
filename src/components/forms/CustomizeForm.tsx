/* eslint-disable @typescript-eslint/no-unsafe-member-access */
import React, {
  ReactNode, FormEvent, useState,
} from 'react';
import html2pdf from 'html2pdf.js';
import {
  IconButton, Typography,
} from '@material-ui/core';
import HelpIcon from '@material-ui/icons/Help';
import { PaperOptions, usePaperOptions } from '../PaperOptionsProvider';
import { Orientation, PaperSize } from '../../lib/paperSizes';
import ModalDialog from '../ModalDialog';
import { useInstanceOptions } from '../InstanceSettingsProvider';
import SelectField from './SelectField';
import SubmitButton from './SubmitButton';
import SelectPaperSizeField from './SelectPaperSizeField';
import FormContainer from './FormContainer';
import SectionPageTitle from '../../elements/SectionPageTitle';

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

  const onChangePaperSize = (size: PaperSize) => {
    setOptions({
      ...options,
      paperSize: size,
    });
  };

  const onChangeOrientation = (orientation: string) => {
    if (orientation !== 'portrait' && orientation !== 'landscape') {
      throw Error(`Unknown orientation ${orientation}`);
    }
    setOptions({
      ...options,
      orientation: orientation as Orientation,
    });
  };

  return (
    <FormContainer
      onSubmit={onSubmit}
      error={error}
    >
      <section aria-label="Main Customization">
        {children}
      </section>
      <section aria-label="Printing Options">
        <SectionPageTitle>Print Options</SectionPageTitle>
        <SelectPaperSizeField
          name="paperSize"
          value={options.paperSize}
          onChange={onChangePaperSize}
        />

        <SelectField
          name="paperOrientation"
          value={options.orientation}
          onChange={onChangeOrientation}
        >
          <option value="portrait">Portrait</option>
          <option value="landscape">Landscape</option>
        </SelectField>
      </section>
      <SubmitButton
        disabled={error !== null}
        value="print"
        name="print"
        id="print-button"
      >
        {`Print ${name}`}
      </SubmitButton>
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

      <SubmitButton
        disabled={error !== null}
        value="pdf"
        name="pdf"
      >
        Generate PDF
      </SubmitButton>
      <p>Warning: Generate PDF is experimental.</p>
    </FormContainer>
  );
}

CustomizeForm.defaultProps = {
  error: null,
  onBeforePrint: () => true,
};

export default CustomizeForm;
