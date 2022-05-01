import React from 'react';
import { usePaperOptions } from '../PaperOptionsProvider';
import FooterProps from './FooterProps';
import footers from './Footers';

function WorksheetFooter(props: FooterProps): JSX.Element {
  const { options } = usePaperOptions();
  const footerRenderer = footers.get(options.footer);
  return (
    <div
      style={{
        position: 'absolute',
        bottom: options.margin,
        right: options.margin,
        left: options.margin,
      }}
    >
      {footerRenderer ? footerRenderer(props) : null}
    </div>
  );
}

export default WorksheetFooter;
