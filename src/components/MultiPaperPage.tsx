import { makeStyles } from '@material-ui/core';
import React, {
  ReactNode, ElementType, createElement, useState, useEffect, useRef,
} from 'react';
import { usePaperOptions } from './PaperOptionsProvider';
import PaperPage from './PaperPage';

const styles = makeStyles(() => ({
  wrapper: {
  },
  curtain: {
    transition: '0.3s opacity',
  },
  curtainDown: {
    opacity: 0,
  },
  curtainUp: {
    opacity: 1,
  },
}));

interface WrapperBuilder<T> {
  contentWrapper?: ElementType | null;
  contentWrapperClassName?: string;
  data: T[];
  builder: (item: T, index: number, array: T[] | undefined) => JSX.Element;
}

interface MultiPaperPageProps<T> extends WrapperBuilder<T> {
  header?: ReactNode | null;
  footer?: ReactNode | null;
  itemSelector: string;
}

function wrappedContent<T>({
  contentWrapper, contentWrapperClassName, data, builder,
}: WrapperBuilder<T>): ReactNode {
  return contentWrapper === null
    ? data.map(builder)
    : createElement(
      // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
      contentWrapper!,
      { className: contentWrapperClassName, children: data.map(builder) },
    );
}

function clientRectangle(element: HTMLElement): DOMRect {
  return element.getClientRects()[0];
}

function countUnobscuredElements(pageContent: HTMLDivElement, itemSelector: string): number {
  const innerWrap = pageContent.querySelector('.printable-paper-inner-wrap') as HTMLElement;
  if (innerWrap === null) {
    throw Error('Page content inner wrap is missing');
  }
  const wrapperRect = clientRectangle(innerWrap);
  const wrapperBottom = wrapperRect.bottom;
  let visibilityCount = 0;
  const items: NodeListOf<HTMLElement> = innerWrap.querySelectorAll(itemSelector);
  items.forEach((item) => {
    const itemBottom = clientRectangle(item).bottom;
    if (itemBottom <= wrapperBottom) {
      visibilityCount += 1;
    }
  });
  return visibilityCount;
}

function isContentOverflowing(element: HTMLDivElement | null): boolean {
  if (element === null) {
    return false;
  }
  const content = element.querySelector('.printable-paper-inner-wrap');
  if (content === null) {
    return false;
  }

  return content.scrollHeight > content.clientHeight;
}

function MultiPaperPage<T>({
  header = null, footer = null,
  contentWrapper, contentWrapperClassName, data, builder,
  itemSelector,
}: MultiPaperPageProps<T>): JSX.Element {
  const { curtainUp, curtainDown, curtain } = styles();
  const wrapperRef = useRef<HTMLDivElement | null>(null);
  const { options } = usePaperOptions();
  const [isReady, setIsReady] = useState(false);
  const [dataPages, setDataPages] = useState([data]);
  const [attemptsToFix, setAttemptsTofix] = useState(0);
  const curtainClasses = `${curtain} ${isReady ? curtainUp : curtainDown}`;

  useEffect(() => {
    setDataPages([data]);
    setAttemptsTofix(0);
  }, [data, options]);

  useEffect(() => {
    if (attemptsToFix > 100) {
      setIsReady(true);
      throw Error('Attempted to fix paging too many times');
      return;
    }
    // Check if last page overflows
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    const wrapper = wrapperRef.current!;
    const pages: NodeListOf<HTMLDivElement> = wrapper.querySelectorAll('.printable-paper-content');
    let previousPagedItemsCount = 0;
    let contentOverflowed = false;
    for (let pageIndex = 0; pageIndex < pages.length; pageIndex++) {
      const page = pages[pageIndex];
      const itemCountOnPage = dataPages[pageIndex].length;

      if (isContentOverflowing(page)) {
        const itemCount = countUnobscuredElements(page, itemSelector);
        const theDataPage = dataPages[pageIndex];
        contentOverflowed = true;
        if (theDataPage.length > itemCount) {
          const previousPages = dataPages.slice(0, pageIndex); // retain previous pages
          const startIndex = previousPagedItemsCount;
          const newDataPage = data.slice(startIndex, startIndex + itemCount);
          const newPages = previousPages.concat(
            [newDataPage, data.slice(startIndex + itemCount)],
          );
          setDataPages(newPages);
        }
        break;
      }
      previousPagedItemsCount += itemCountOnPage;
      if (!contentOverflowed) {
        setIsReady(true);
      }
    }
    setAttemptsTofix(attemptsToFix + 1);

  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dataPages, options]);

  return (
    <div className={curtainClasses} ref={wrapperRef}>
      {
        dataPages.map((dataPage, index) => (
          <PaperPage
            pageId={`${index + 1}`}
            // eslint-disable-next-line react/no-array-index-key
            key={`page-${index}`}
          >
            { index === 0 ? header : null }
            {
              wrappedContent({
                contentWrapper,
                contentWrapperClassName,
                data: dataPage,
                builder,
              })
            }
            { index === dataPages.length - 1 ? footer : null }
          </PaperPage>
        ))
      }

    </div>
  );
}

MultiPaperPage.defaultProps = {
  header: null,
  footer: null,
  contentWrapper: null,
  contentWrapperClassName: null,
};

export default MultiPaperPage;
