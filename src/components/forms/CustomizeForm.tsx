import React, {
  ReactNode, FormEvent, useState,
} from 'react';
import html2pdf from 'html2pdf.js';
import { IconButton } from '@material-ui/core';
import HelpIcon from '@material-ui/icons/Help';
import { PaperOptions, usePaperOptions } from '../PaperOptionsProvider';
import { useInstanceOptions } from '../InstanceSettingsProvider';
import SelectField from './SelectField';
import SubmitButton from './SubmitButton';
import SelectPaperSizeField from './SelectPaperSizeField';
import FormContainer from './FormContainer';
import SectionPageTitle from '../../elements/SectionPageTitle';
import PaperSize, { Orientation } from '../../lib/PaperSize';
import PrintHelpDialog from './PrintHelpDialog';
import SelectFooterField from './SelectFooterField';

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
    html2pdf(element, {
      filename: `${name} ${timeStamp()}`,
      pagebreak: { mode: 'css' },
      html2canvas: {
        scale: 3,
      },
      jsPDF: {
        format: [options.paperSize.width, options.paperSize.height],
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
  const { hasAlreadyPrinted } = instanceSettings.options;
  const setInstanceOptions = instanceSettings.setOptions;

  const [showPrintingHelp, setShowPrintingHelp] = useState<boolean>(false);

  const onSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!onBeforePrint()) {
      return;
    }
    const nativeEvent = event.nativeEvent as EventWithSubmitter;
    const submitType: string = nativeEvent.submitter === undefined ? 'print' : nativeEvent.submitter.value;
    if (submitType === 'pdf') {
      generatePDF(name, options);
    } else if (!hasAlreadyPrinted) {
      setShowPrintingHelp(true);
    } else {
      window.print();
    }
  };

  const onPrintingHelpClose = () => {
    setShowPrintingHelp(false);
    if (!hasAlreadyPrinted) {
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
        <SelectFooterField
          value={options.footer}
          onChange={(footer) => setOptions({ ...options, footer })}
        />
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
      <PrintHelpDialog open={showPrintingHelp} onClose={onPrintingHelpClose} />

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
