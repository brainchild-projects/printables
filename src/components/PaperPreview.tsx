import React, { ReactNode, useEffect, useRef } from 'react';
import { makeStyles } from '@material-ui/core';

const paperPreviewStyles = makeStyles(() => ({
  preview: {
    padding: 0,
    overflow: 'auto',
  },
}));
interface PaperPreviewProps {
  children: ReactNode;
}

function PaperPreview({ children }: PaperPreviewProps): JSX.Element {
  const classes = paperPreviewStyles();
  const wrapperRef = useRef<null | HTMLDivElement>(null);

  useEffect(() => {
    const wrapper = wrapperRef.current;
    let observer: MutationObserver;
    if (wrapper !== null) {
      const config = { subtree: true, childList: true };
      let timeoutId: NodeJS.Timeout;
      const labelPages = () => {
        clearTimeout(timeoutId);
        timeoutId = setTimeout(() => {
          const elements = wrapper.querySelectorAll('.printable-paper');
          elements.forEach((element, key) => {
            const oldLabel = element.getAttribute('aria-label') || '';
            const label = `Paper Page ${key + 1}`;
            if (oldLabel !== label) {
              element.setAttribute('aria-label', label);
            }
          });
        }, 100);
      };
      observer = new MutationObserver(labelPages);
      labelPages();
      observer.observe(wrapper, config);
    }

    return () => {
      if (observer !== undefined) {
        observer.disconnect();
      }
    };
  }, [wrapperRef]);

  return (
    <div
      ref={wrapperRef}
      id="paper-preview"
      className={`paper-preview ${classes.preview}`}
    >
      { children }
    </div>
  );
}

export default PaperPreview;
