/* eslint-disable import/no-extraneous-dependencies */
import { vi, SpyInstance } from 'vitest';

export default function stubPrint(): void {
  let windowSpy: SpyInstance<[], void>;
  beforeEach(() => {
    windowSpy = vi.spyOn(window, 'print');
    windowSpy.mockImplementation(() => ({
      print: () => { },
    }));
  });

  afterEach(() => {
    windowSpy.mockRestore();
  });
}
