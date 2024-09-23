import ColumnGroup from './ColumnGroup';
import ColumnItemWithHeight from './ColumnItemWithHeight';

describe('ColumnGroup', () => {
  let group: ColumnGroup<string>;

  beforeEach(() => {
    group = new ColumnGroup(3, 3);
  });

  it('creates slots', () => {
    expect(group.columnCount).toEqual(3);
  });

  it('creates slots with height', () => {
    const firstColumn = group.columns[0];
    if (firstColumn) {
      expect(firstColumn.height).toEqual(3);
    } else {
      fail('Did not find first column');
    }
  });

  it('starts with empty items', () => {
    expect(group.items).toEqual([]);
  });

  describe('Adding items', () => {
    describe('One item', () => {
      let addResult: boolean;

      beforeEach(() => {
        addResult = group.add({ item: 'a', height: 1 });
      });

      it('adds item to list of items', () => {
        expect(group.items).toEqual(['a']);
      });

      it('returns true for successful add', () => {
        expect(addResult).toBe(true);
      });

      it('adds item to first column', () => {
        expect(group.columns[0]?.items).toEqual(['a']);
      });
    });

    describe('Multiple items', () => {
      beforeEach(() => {
        group.add({ item: 'a', height: 2 });
        group.add({ item: 'b', height: 2 });
        group.add({ item: 'c', height: 1 });
        group.add({ item: 'd', height: 1 });
      });

      it('adds items to list of items', () => {
        expect(group.items).toEqual(['a', 'b', 'c', 'd']);
      });

      it('adds items to columns', () => {
        expect(group.columns[0]?.items).toEqual(['a']);
        expect(group.columns[1]?.items).toEqual(['b', 'c']);
        expect(group.columns[2]?.items).toEqual(['d']);
      });
    });

    describe('Adjusting height after adding', () => {
      beforeEach(() => {
        ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i'].forEach((item) => {
          group.add({ item, height: 1 });
        });
      });

      it('adds items correctly', () => {
        expect(group.itemsByColumn()).toEqual([
          ['a', 'b', 'c'],
          ['d', 'e', 'f'],
          ['g', 'h', 'i'],
        ]);
      });

      describe('When the height is adjusted', () => {
        let removedItems: ColumnItemWithHeight<string>[];

        beforeEach(() => {
          removedItems = group.adjustHeight(2);
        });

        it('removes items in the end', () => {
          expect(group.itemsByColumn()).toEqual([
            ['a', 'b'],
            ['c', 'd'],
            ['e', 'f'],
          ]);
        });

        it('returns the removedItems', () => {
          expect(removedItems.map((cItem) => cItem.item)).toEqual([
            'g', 'h', 'i',
          ]);
        });
      });
    });
  });
});
