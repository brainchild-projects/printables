import React, {
  ReactNode, ElementType, createElement, useState, useEffect, useRef,
} from 'react';
import { usePaperOptions } from './PaperOptionsProvider';
import PaperPage, { elementClasser, NodeWithClassName } from './PaperPage';
import WorksheetFooter from './printElements/WorksheetFooter';
import WorksheetHeader from './printElements/WorksheetHeader';
import PagingWithColumns from '../lib/layout/PagingWithColumns';

type PropsCallbackOptions = {
  instanceIndex: number,
  memberIndex: number,
};

// export type Builder<T> = (item: T, index: number, array: T[] | undefined) => JSX.Element;
export type Builder<T> = (item: T, index: number, array: T[] | undefined) => NodeWithClassName;

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
  header?: React.ReactElement<typeof WorksheetHeader> | null;
  footer?: React.ReactElement<typeof WorksheetFooter> | null;
}

function itemClasser<T>(builder: Builder<T>): Builder<T> {
  return (item, index, collection) => {
    const el = builder(item, index, collection);
    const itemn = 'mpp-item mpp-item-$index';
    return elementClasser(el, itemn) as JSX.Element;
  };
}

function wrappedContent<T>({
  wrapper, wrapperProps, wrapperPropsCallback, data, renderItems: builder,
  instanceIndex, memberIndex,
}: WrapperBuilderArgs<T>): ReactNode {
  const realBuilder: Builder<T> = itemClasser(builder);

  if (wrapper === null) {
    return data.map(realBuilder);
  }

  let propsCallback = wrapperPropsCallback;
  if (isWrapperWithPropsCallback(wrapper)) {
    propsCallback = (props, options) =>
      // eslint-disable-next-line implicit-arrow-linebreak
      wrapperPropsCallback(
        wrapper.propsCallback(props, options),
        options,
      );
  }

  return (
    <div className="mpp-wrapper">
      {
        createElement(
          // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
          wrapper!,
          {
            ...propsCallback(
              wrapperProps ?? {},
              { instanceIndex, memberIndex },
            ),
          },
          data.map(realBuilder),
        )
      }
    </div>
  );
}

type DataPage<T> = T[];
type DataPages<T> = DataPage<T>[];

function offsetHeight(element: HTMLElement | null): number {
  if (element === null) {
    return 0;
  }

  return element.offsetHeight;
}

type ColumnProps = {
  columnCount: number;
  gap: number;
};

function getColumnProps(wrapper: HTMLDivElement | null): ColumnProps {
  if (wrapper === null) {
    return { columnCount: 1, gap: 0 };
  }
  const computedStyle = getComputedStyle(wrapper);
  const { columnCount } = computedStyle;
  const columns = parseInt(columnCount, 10);
  const gapProp = parseInt(computedStyle.columnGap, 10);

  const count = Number.isNaN(columns) ? 1 : columns;
  const gap = Number.isNaN(gapProp) ? 1 : gapProp;

  return { columnCount: count, gap };
}

function numberOrDefault(value: unknown, defaultValue: number): number {
  return Number.isNaN(value) ? defaultValue : value as number;
}

type GatherPagesArgs<T> = {
  data: T[],
  itemHeights: number[],
  columnCount: number,
  contentHeight: number,
  headerHeight: number,
  footerHeight: number,
};

function gatherPages<T>({
  data,
  itemHeights,
  columnCount,
  contentHeight,
  headerHeight,
  footerHeight,
}: GatherPagesArgs<T>): DataPages<T> {
  const colItems = data.map((item, i) => ({ item, height: numberOrDefault(itemHeights[i], 0) }));
  const paginator = new PagingWithColumns(colItems, {
    columns: columnCount,
    height: contentHeight,
    header: headerHeight,
    footer: footerHeight,
  });

  return paginator.columnGroups.map((columnGroup) => columnGroup.items);
}

function MultiPaperPage<T>({
  header = null, footer = null,
  wrapper, wrapperProps = {}, data, renderItems: builder,
  wrapperPropsCallback = passThrough,
}: MultiPaperPageProps<T>): JSX.Element {
  const wrapperRef = useRef<HTMLDivElement | null>(null);
  const { options } = usePaperOptions();
  const [isReady, setIsReady] = useState(false);
  const [dataPages, setDataPages] = useState([data]);
  const [pagingArgs, setPagingArgs] = useState<GatherPagesArgs<T> | null>(null);

  useEffect(() => {
    setDataPages([data]);
    setIsReady(false);
    setPagingArgs(null);
  }, [data, options]);

  useEffect(() => {
    if (pagingArgs !== null) {
      return;
    }

    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    const wrapperEl = wrapperRef.current!;
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    const contentElement: HTMLDivElement = wrapperEl.querySelector('.printable-paper-content')!;
    const headerHeight = offsetHeight(wrapperEl.querySelector('.mpp-header'));
    const footerHeight = offsetHeight(wrapperEl.querySelector('.worksheet-footer'));
    const { columnCount } = getColumnProps(contentElement.querySelector('.mpp-wrapper > *'));
    const itemEls: NodeListOf<HTMLElement> = wrapperEl.querySelectorAll('.mpp-item');
    const itemHeights = Array.from(itemEls).map((el) => el.offsetHeight);
    setPagingArgs({
      data, itemHeights, columnCount, contentHeight: contentElement.clientHeight,
      headerHeight, footerHeight,
    });
  }, [options, data, pagingArgs]);

  useEffect(() => {
    if (isReady) {
      return;
    }

    if (pagingArgs === null) {
      return;
    }

    setDataPages(gatherPages(pagingArgs));
    setIsReady(true);
  }, [isReady, pagingArgs, data]);

  let count = 0;

  return (
    <div className="multipaperpage-wrapper" ref={wrapperRef}>
      {
        dataPages.map((dataPage, index) => {
          const rendered = (
            <PaperPage
              pageId={`${index + 1}`}
              // eslint-disable-next-line react/no-array-index-key
              key={`page-${index}`}
              ready={isReady}
              unlimitedHeight={!isReady}
            >
              {
                index === 0
                  ? (<div className="mpp-header">{header}</div>)
                  : null
              }
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
              {
                index === dataPages.length - 1
                  ? (<div className="mpp-footer">{footer}</div>)
                  : null
              }
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
