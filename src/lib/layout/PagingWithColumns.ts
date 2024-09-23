import ColumnGroup from './ColumnGroup';
import ColumnItemWithHeight from './ColumnItemWithHeight';

type ConstructorProps = {
  columns: number;
  height: number;
  header?: number;
  footer?: number;
};

class PagingWithColumns<T> {
  private iColumnGroups: ColumnGroup<T>[];

  private iHeight: number;

  private iColumns: number;

  // header occuppies the first page
  private iHeader: number;

  // footer occuppies the last page
  private iFooter: number;

  private iItems: ColumnItemWithHeight<T>[];

  get columnGroups(): ColumnGroup<T>[] {
    return this.iColumnGroups;
  }

  get height(): number {
    return this.iHeight;
  }

  get items(): ColumnItemWithHeight<T>[] {
    return this.iItems;
  }

  constructor(items: ColumnItemWithHeight<T>[], { columns, height, header = 0, footer = 0 }: ConstructorProps) {
    this.iColumns = columns;
    this.iHeight = height;
    this.iHeader = header;
    this.iFooter = footer;
    this.iColumnGroups = [];
    this.iItems = items;
    this.paginate();
  }

  private getIndex(footerAdjustment = false): number {
    return footerAdjustment ? this.currentPageIndex() + 1 : this.currentPageIndex();
  }

  private currentColumnGroup(footerAdjustment = false): ColumnGroup<T> {
    const pageIndex = this.getIndex(footerAdjustment);
    let columnGroup = this.iColumnGroups[pageIndex];
    if (!columnGroup) {
      const availablePageHeight = (pageIndex === 0
        ? this.iHeight - this.iHeader
        : this.iHeight) + (footerAdjustment ? this.iFooter : 0);

      columnGroup = new ColumnGroup(this.iColumns, availablePageHeight);
      this.iColumnGroups.push(columnGroup);
    }

    return columnGroup;
  }

  private currentPageIndex(): number {
    const totalPages = this.iColumnGroups.length;
    return totalPages < 2 ? 0 : totalPages - 1;
  }

  private add(cItem: ColumnItemWithHeight<T>): void {
    if (!this.currentColumnGroup().add(cItem)) {
      const columnGroup = new ColumnGroup<T>(this.iColumns, this.iHeight);
      columnGroup.add(cItem);
      this.iColumnGroups.push(columnGroup);
    }
  }

  private paginate(): void {
    for (let i = 0; i < this.iItems.length; i += 1) {
      this.add(this.iItems[i]);
    }

    const last = this.currentColumnGroup();
    const removedItems = last.adjustHeight(last.height - this.iFooter);
    if (removedItems.length > 0) {
      this.currentColumnGroup(true);
      for (let i = 0; i < removedItems.length; i += 1) {
        this.add(removedItems[i]);
      }
    }
  }

  itemsByColumnGroup(): T[][] {
    return this.iColumnGroups.map((columnGroup) => columnGroup.items);
  }
}

export default PagingWithColumns;
