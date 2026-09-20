import { vi, beforeEach, afterEach } from 'vitest';

export default function stubPrint(): void {
  beforeEach(() => {
    vi.stubGlobal('print', vi.fn());
  });

  afterEach(() => {
    vi.unstubAllGlobals();
  });
}
