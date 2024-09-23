import ColumnItemWithHeight from './ColumnItemWithHeight';
import ColumnSlot from './ColumnSlot';

describe('ColumnSlot', () => {
  let slot: ColumnSlot<string>;

  beforeEach(() => {
    slot = new ColumnSlot<string>(10);
  });

  it('has an available height', () => {
    expect(slot.availableHeight).toEqual(10);
  });

  describe('when an item with height is added', () => {
    let addResult: boolean;

    beforeEach(() => {
      addResult = slot.add({ item: 'a', height: 2 });
    });

    it('deducts available height', () => {
      expect(slot.availableHeight).toEqual(8);
    });

    it('adds item internally', () => {
      expect(slot.items).toEqual(['a']);
    });

    it('returns true', () => {
      expect(addResult).toBe(true);
    });
  });

  describe('when multiple items are added', () => {
    beforeEach(() => {
      slot.add({ item: 'a', height: 2 });
      slot.add({ item: 'b', height: 3 });
      slot.add({ item: 'c', height: 4 });
    });

    it('deducts available height', () => {
      expect(slot.availableHeight).toEqual(1);
    });

    it('adds items internally', () => {
      expect(slot.items).toEqual(['a', 'b', 'c']);
    });
  });

  describe('removing items', () => {
    beforeEach(() => {
      slot.add({ item: 'a', height: 2 });
      slot.add({ item: 'b', height: 3 });
      slot.add({ item: 'c', height: 4 });
    });


    describe('when a bottom item is removed', () => {
      let result: ColumnItemWithHeight<string> | null;

      beforeEach(() => {
        result = slot.removeBottom();
      });

      it('removes the item', () => {
        expect(slot.items).toEqual(['a', 'b']);
      });

      it('releases taken up space by item', () => {
        expect(slot.availableHeight).toEqual(5);
      });

      it('returns the item', () => {
        expect(result?.item).toEqual('c');
      });
    });

    describe('when the slot is cleared', () => {
      beforeEach(() => {
        slot.clear();
      });

      it('removes all items', () => {
        expect(slot.items).toEqual([]);
      });

      it('resets available height', () => {
        expect(slot.availableHeight).toEqual(10);
      });
    });
  });

  describe('when an item is added that is more than the available space', () => {
    let addResult: boolean;

    beforeEach(() => {
      slot.add({ item: 'a', height: 2 });
      slot.add({ item: 'b', height: 3 });
      addResult = slot.add({ item: 'c', height: 6 });
    });

    it('add() returns false when there is not enough space', () => {
      expect(addResult).toEqual(false);
    });

    it('does not add the item', () => {
      expect(slot.items).toEqual(['a', 'b']);
    });
  });
});
