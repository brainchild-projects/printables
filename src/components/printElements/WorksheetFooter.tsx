import React from 'react';
import { usePaperOptions } from '../PaperOptionsProvider.js';
import FooterProps from './FooterProps.js';
import footers from './Footers.js';

function WorksheetFooter(props: FooterProps): JSX.Element {
  const { options } = usePaperOptions();
  const footerRenderer = footers.get(options.footer);
  return (
    <div
      className="worksheet-footer"
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
