/* eslint-disable import/no-extraneous-dependencies */

export default function stubPrint(): void {
  let windowSpy: jest.SpyInstance<void, []>;
  beforeEach(() => {
    windowSpy = jest.spyOn(window, 'print');
    windowSpy.mockImplementation(() => ({
      print: () => {},
    }));
  });

  afterEach(() => {
    windowSpy.mockRestore();
  });
}
