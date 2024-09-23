import ColumnItemWithHeight from './ColumnItemWithHeight';

class ColumnSlot<T> {
  private internalHeight: number;

  private internalItems: ColumnItemWithHeight<T>[];

  constructor(height: number) {
    this.internalHeight = height;
    this.internalItems = [];
  }

  get height(): number {
    return this.internalHeight;
  }

  get items(): T[] {
    return this.internalItems.map((itemWithHeight) => itemWithHeight.item);
  }

  get contentHeight(): number {
    let total = 0;
    for (const item of this.internalItems) {
      total += item.height;
    }

    return total;
  }

  get availableHeight(): number {
    return this.height - this.contentHeight;
  }

  itemsWithHeight(): ColumnItemWithHeight<T>[] {
    return this.internalItems;
  }

  add({ item, height }: ColumnItemWithHeight<T>): boolean {
    if (height > this.availableHeight) {
      return false;
    }
    this.internalItems.push({ item, height });

    return true;
  }

  removeBottom(): ColumnItemWithHeight<T> | null {
    const item = this.internalItems.pop();

    if (item === undefined) {
      return null;
    }

    return item;
  }

  clear(): void {
    this.internalItems = [];
  }
}

export default ColumnSlot;
