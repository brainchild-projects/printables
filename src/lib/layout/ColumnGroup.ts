import ColumnItemWithHeight from './ColumnItemWithHeight';
import ColumnSlot from './ColumnSlot';

class ColumnGroup<T> {
  private internalSlots: ColumnSlot<T>[];

  private lastEmptySlotIndex = 0;

  private slotHeight: number;

  get columnCount(): number {
    return this.internalSlots.length;
  }

  get columns(): ColumnSlot<T>[] {
    return this.internalSlots;
  }

  get items(): T[] {
    return this.internalSlots.flatMap((slot) => slot.items);
  }

  get height(): number {
    return this.slotHeight;
  }

  constructor(columnCount: number, slotHeight: number) {
    this.slotHeight = slotHeight;
    this.internalSlots = Array.from({ length: columnCount }, () => new ColumnSlot(slotHeight));
  }

  private reset(columnCount: number, slotHeight: number) {
    this.slotHeight = slotHeight;
    this.internalSlots = Array.from({ length: columnCount }, () => new ColumnSlot(slotHeight));
    this.lastEmptySlotIndex = 0;
  }

  add(cItem: ColumnItemWithHeight<T>): boolean {
    for (let i = this.lastEmptySlotIndex; i < this.columnCount; i += 1) {
      const slot = this.internalSlots[i];
      if (slot.add(cItem)) {
        return true;
      }
      this.lastEmptySlotIndex = i + 1;
    }

    return false;
  }

  itemsByColumn(): T[][] {
    return this.internalSlots.map((slot) => slot.items);
  }

  get availableRowHeight(): number {
    return Math.min(...this.internalSlots.map((slot) => slot.availableHeight));
  }

  adjustHeight(newHeight: number): ColumnItemWithHeight<T>[] {
    const currentItems = this.internalSlots.flatMap((slot) => slot.itemsWithHeight());
    const lastIndex = currentItems.length - 1;

    this.reset(this.columnCount, newHeight);

    if (lastIndex < 0) {
      return [];
    }

    let lastIndexAdded = 0;
    for (let i = 0; i < currentItems.length; i++) {
      if (!this.add(currentItems[i])) {
        break;
      }

      lastIndexAdded = i;
    }

    return currentItems.slice(lastIndexAdded + 1);
  }
}

export default ColumnGroup;
