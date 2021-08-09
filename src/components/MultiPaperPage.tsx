import React, {
  ReactNode, ElementType, createElement, useState, useEffect, useRef,
} from 'react';
import { usePaperOptions } from './PaperOptionsProvider';
import PaperPage from './PaperPage';

type PropsCallbackOptions = {
  instanceIndex: number,
  memberIndex: number,
};

type Props = Record<string, unknown>;
export type PropsCallback = (props: Props, options: PropsCallbackOptions) => Props;
interface WrapperBuilder<T> {
  wrapper?: ElementType | null;
  wrapperProps?: Record<string, unknown>;
  wrapperPropsInstanceCallback?: PropsCallback;
  data: T[];
  builder: (item: T, index: number, array: T[] | undefined) => JSX.Element;
}
interface WrapperBuilderArgs<T> extends WrapperBuilder<T> {
  wrapperPropsInstanceCallback: PropsCallback;
  instanceIndex: number;
  memberIndex: number;
}

const passThrough = (props: Props) => props;
interface MultiPaperPageProps<T> extends WrapperBuilder<T> {
  header?: ReactNode | null;
  footer?: ReactNode | null;
  itemSelector: string;
}

function wrappedContent<T>({
  wrapper, wrapperProps, wrapperPropsInstanceCallback, data, builder,
  instanceIndex, memberIndex,
}: WrapperBuilderArgs<T>): ReactNode {
  return wrapper === null
    ? data.map(builder)
    : createElement(
      // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
      wrapper!,
      {
        ...wrapperPropsInstanceCallback(
          wrapperProps || {},
          { instanceIndex, memberIndex },
        ),
        children: data.map(builder),

      },
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
  wrapper, wrapperProps = {}, data, builder,
  wrapperPropsInstanceCallback = passThrough,
  itemSelector,
}: MultiPaperPageProps<T>): JSX.Element {
  const wrapperRef = useRef<HTMLDivElement | null>(null);
  const { options } = usePaperOptions();
  const [isReady, setIsReady] = useState(false);
  const [dataPages, setDataPages] = useState([data]);
  const [attemptsToFix, setAttemptsTofix] = useState(0);

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
    const wrapperEl = wrapperRef.current!;
    const pages: NodeListOf<HTMLDivElement> = wrapperEl.querySelectorAll('.printable-paper-content');
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

  let count = 0;

  return (
    <div ref={wrapperRef}>
      {
        dataPages.map((dataPage, index) => {
          const rendered = (
            <PaperPage
              pageId={`${index + 1}`}
                // eslint-disable-next-line react/no-array-index-key
              key={`page-${index}`}
              ready={isReady}
            >
              { index === 0 ? header : null }
              {
                  wrappedContent({
                    wrapper,
                    wrapperProps,
                    wrapperPropsInstanceCallback: wrapperPropsInstanceCallback || passThrough,
                    data: dataPage,
                    builder,
                    instanceIndex: index,
                    memberIndex: count,
                  })
                }
              { index === dataPages.length - 1 ? footer : null }
            </PaperPage>
          );
          count += dataPage.length;
          return rendered;
        })
      }

    </div>
  );
}

MultiPaperPage.defaultProps = {
  header: null,
  footer: null,
  wrapper: null,
  wrapperProps: {},
  wrapperPropsInstanceCallback: passThrough,
};

export default MultiPaperPage;
