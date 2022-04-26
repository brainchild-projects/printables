import React, {
  ReactNode, ElementType, createElement, useState, useEffect, useRef,
} from 'react';
import { usePaperOptions } from './PaperOptionsProvider';
import PaperPage from './PaperPage';

type PropsCallbackOptions = {
  instanceIndex: number,
  memberIndex: number,
};

export type Builder<T> = (item: T, index: number, array: T[] | undefined) => JSX.Element;

export type Props = Record<string, unknown>;
export type PropsCallback = (props: Props, options: PropsCallbackOptions) => Props;

type WrapperWithPropsCallback = ElementType & {
  propsCallback: PropsCallback;
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function isWrapperWithPropsCallback(obj: any): obj is WrapperWithPropsCallback {
  return typeof obj === 'function'
    // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
    && obj.propsCallback !== undefined
    // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
    && typeof obj.propsCallback === 'function';
}

interface WrapperBuilder<T> {
  wrapper?: WrapperWithPropsCallback | ElementType | null;
  wrapperProps?: Props;
  wrapperPropsCallback?: PropsCallback;
  data: T[];
  renderItems: Builder<T>;
}
interface WrapperBuilderArgs<T> extends WrapperBuilder<T> {
  wrapperPropsCallback: PropsCallback;
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
  wrapper, wrapperProps, wrapperPropsCallback, data, renderItems: builder,
  instanceIndex, memberIndex,
}: WrapperBuilderArgs<T>): ReactNode {
  if (wrapper !== null) {
    let propsCallback = wrapperPropsCallback;
    if (isWrapperWithPropsCallback(wrapper)) {
      propsCallback = (props, options) =>
        // eslint-disable-next-line implicit-arrow-linebreak
        wrapperPropsCallback(
          wrapper.propsCallback(props, options),
          options,
        );
    }
    return createElement(
      // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
      wrapper!,
      {
        ...propsCallback(
          wrapperProps ?? {},
          { instanceIndex, memberIndex },
        ),
      },
      data.map(builder),
    );
  }
  return data.map(builder);
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

interface LeaveUnobscuredElementsProps<T> {
  dataPage: T[];
  previousPagedItemsCount: number;
  page: HTMLDivElement;
  pageIndex: number;
}

function MultiPaperPage<T>({
  header = null, footer = null,
  wrapper, wrapperProps = {}, data, renderItems: builder,
  wrapperPropsCallback = passThrough,
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

  // This is just a stop gap so we don't attempt to fix like in
  // the event of an infinite loop. The limit is pretty arbitrary.
  const throwOnTooManyAttempts = () => {
    if (attemptsToFix > 100) {
      setIsReady(true);
      throw Error('Attempted to fix paging too many times');
    }
  };

  const leaveUnobscuredElements = ({
    dataPage,
    previousPagedItemsCount,
    page,
    pageIndex,
  }: LeaveUnobscuredElementsProps<T>) => {
    const itemCount = countUnobscuredElements(page, itemSelector);
    if (dataPage.length > itemCount) {
      const previousPages = dataPages.slice(0, pageIndex); // retain previous pages
      const startIndex = previousPagedItemsCount;
      const newDataPage = data.slice(startIndex, startIndex + itemCount);
      const newPages = previousPages.concat(
        [newDataPage, data.slice(startIndex + itemCount)],
      );
      setDataPages(newPages);
    }
  };

  useEffect(() => {
    throwOnTooManyAttempts();
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
        contentOverflowed = true;
        leaveUnobscuredElements({
          dataPage: dataPages[pageIndex],
          page,
          pageIndex,
          previousPagedItemsCount,
        });
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
              {index === 0 ? header : null}
              {
                wrappedContent<T>({
                  wrapper,
                  wrapperProps,
                  wrapperPropsCallback: wrapperPropsCallback || passThrough,
                  data: dataPage,
                  renderItems: builder,
                  instanceIndex: index,
                  memberIndex: count,
                })
              }
              {index === dataPages.length - 1 ? footer : null}
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
  wrapperPropsCallback: passThrough,
};

export default MultiPaperPage;
