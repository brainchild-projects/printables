import React, { ReactNode, useEffect, useRef } from 'react';
import { makeStyles } from '@material-ui/core';
import { usePaperOptions } from './PaperOptionsProvider';

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

  const { options } = usePaperOptions();
  useEffect(() => {
    const wrapper = wrapperRef.current;
    let observer: MutationObserver;
    if (wrapper !== null) {
      const config = { subtree: true, childList: true };
      let timeoutId: NodeJS.Timeout;
      const callback = () => {
        clearTimeout(timeoutId);
        timeoutId = setTimeout(() => {
          const elements = wrapper.querySelectorAll('.printable-paper');
          elements.forEach((element, key) => {
            const oldLabel = element.getAttribute('aria-label') || '';
            const label = `Paper Page ${key + 1}`;
            if (oldLabel !== label) {
              console.log(`Labeling ${label}`, element);
              element.setAttribute('aria-label', label);
            }
          });
        }, 100);
      };
      observer = new MutationObserver(callback);
      observer.observe(wrapper, config);
      callback();
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
