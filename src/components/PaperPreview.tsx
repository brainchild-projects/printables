import React, { ReactNode, useEffect, useRef } from 'react';
import classNames from 'classnames';
import styleIt from './styleIt';

const paperPreviewStyles = styleIt(() => ({
  preview: {
    padding: 0,
    overflow: 'auto',
  },
}));
interface PaperPreviewProps {
  children: ReactNode;
}

function labeler(wrapper: HTMLDivElement) {
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
  const unload = () => {
    clearTimeout(timeoutId);
  };
  return [labelPages, unload];
}

function PaperPreview({ children }: PaperPreviewProps): JSX.Element {
  const classes = paperPreviewStyles();
  const wrapperRef = useRef<null | HTMLDivElement>(null);

  useEffect(() => {
    const wrapper = wrapperRef.current;
    let observer: MutationObserver;
    let unload = () => { };

    if (wrapper !== null) {
      const config = { subtree: true, childList: true };
      const [labelPages, unloader] = labeler(wrapper);
      unload = unloader;
      observer = new MutationObserver(labelPages);
      labelPages();
      observer.observe(wrapper, config);
    }

    return () => {
      observer?.disconnect();
      unload();
    };
  }, [wrapperRef]);

  return (
    <div
      ref={wrapperRef}
      id="paper-preview"
      className={classNames('paper-preview', classes.preview)}
    >
      {children}
    </div>
  );
}

export default PaperPreview;
