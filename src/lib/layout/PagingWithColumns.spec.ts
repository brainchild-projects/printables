import PagingWithColumns from './PagingWithColumns';

describe('PagingWithColumns', () => {
  let paging: PagingWithColumns<string>;
  const items = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l'].map(
    (item) => ({ item, height: 5 }),
  );

  describe('With just 1 column', () => {
    beforeEach(() => {
      paging = new PagingWithColumns(items, { columns: 1, height: 10 });
    });

    it('adds items to just one column', () => {
      expect(paging.itemsByColumnGroup()).toEqual([
        ['a', 'b'],
        ['c', 'd'],
        ['e', 'f'],
        ['g', 'h'],
        ['i', 'j'],
        ['k', 'l'],
      ]);
    });

  });

  describe('Perfect fit for 2-column pages', () => {
    beforeEach(() => {
      paging = new PagingWithColumns(items, { columns: 2, height: 10 });
    });

    describe('when items are added', () => {
      it('adds items to the column groups', () => {
        expect(paging.itemsByColumnGroup()).toEqual([
          ['a', 'b', 'c', 'd'],
          ['e', 'f', 'g', 'h'],
          ['i', 'j', 'k', 'l'],
        ]);
      });
    });
  });


  describe('With header', () => {
    beforeEach(() => {
      paging = new PagingWithColumns(items, { columns: 2, height: 10, header: 3 });
    });

    describe('when items are added', () => {
      it('header occupies first page', () => {
        expect(paging.itemsByColumnGroup()).toEqual([
          ['a', 'b'],
          ['c', 'd', 'e', 'f'],
          ['g', 'h', 'i', 'j'],
          ['k', 'l'],
        ]);
      });
    });
  });

  describe('With footer', () => {
    beforeEach(() => {
      paging = new PagingWithColumns(items, { columns: 2, height: 10, footer: 3 });
    });

    it('footer occupies last page', () => {
      expect(paging.itemsByColumnGroup()).toEqual([
        ['a', 'b', 'c', 'd'],
        ['e', 'f', 'g', 'h'],
        ['i', 'j'],
        ['k', 'l'],
      ]);
    });
  });

  describe('With header and footer', () => {
    beforeEach(() => {
      paging = new PagingWithColumns(items, { columns: 2, height: 10, header: 3, footer: 3 });
    });

    it('header and footer occupy first and last pages respectively', () => {
      expect(paging.itemsByColumnGroup()).toEqual([
        ['a', 'b'],
        ['c', 'd', 'e', 'f'],
        ['g', 'h', 'i', 'j'],
        ['k', 'l'],
      ]);
    });
  });

  describe('With header and footer and 2 pages only', () => {
    beforeEach(() => {
      const newItems = items.slice(0, 9).map((item) => ({ item: item.item, height: 2 }));
      paging = new PagingWithColumns(
        newItems,
        { columns: 2, height: 10, header: 2, footer: 2 },
      );
    });

    it('header and footer occupy first and last pages respectively', () => {
      expect(paging.itemsByColumnGroup()).toEqual([
        ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h'],
        ['i'],
      ]);
    });
  });
});
