type SetItem = (key: string, value: string) => void;
type GetItem = (key: string) => string | null;
type Builder<T> = (savedRaw: unknown) => T;

interface Storage {
  setItem: SetItem;
  getItem: GetItem;
}

const localStoreCache: Map<string, LocalStore<unknown>> = new Map<string, LocalStore<unknown>>([]);

class LocalStore<T> {
  store: Storage;

  key: string;

  build: Builder<T>;

  constructor(key: string, storage: Storage, build?: Builder<T>) {
    this.store = storage;
    this.key = key;
    this.build = build || ((savedRaw: unknown) => savedRaw as T);
  }

  static create<T>(key: string, build?: Builder<T>): LocalStore<T> {
    return new LocalStore<T>(key, global.localStorage, build);
  }

  static createCached<T>(key: string, build?: Builder<T>): LocalStore<T> {
    if (localStoreCache.has(key)) {
      return localStoreCache.get(key) as LocalStore<T>;
    }
    const localStore = LocalStore.create<T>(key, build);
    localStoreCache.set(key, localStore);
    return localStore;
  }

  set(value: T): void {
    this.store.setItem(this.key, JSON.stringify(value));
  }

  get(): T | null {
    const item = this.store.getItem(this.key);
    if (item === null) {
      return null;
    }
    try {
      return this.build(JSON.parse(item));
    } catch (error) {
      // eslint-disable-next-line no-console
      console.error(error);
      return null;
    }
  }
}

export default LocalStore;
