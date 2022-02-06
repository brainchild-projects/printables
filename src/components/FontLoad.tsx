import { useEffect } from 'react';

interface FontLoadProps {
  href: string;
}

function FontLoad({ href }: FontLoadProps): JSX.Element | null {
  useEffect(() => {
    const currentLink = document.querySelector(`head link[href="${href}"]`);
    if (!currentLink) {
      const head = document.querySelector('head');
      const link = document.createElement('link');
      link.href = href;
      link.rel = 'stylesheet';
      head?.appendChild(link);
    }

    return () => {
      const link = document.querySelector(`head link[href="${href}"]`);
      if (link !== null) {
        link.remove();
      }
    };
  }, [href]);

  return null;
}

export default FontLoad;
