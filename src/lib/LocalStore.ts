type SetItem = (key: string, value: string) => void;
type GetItem = (key: string) => string | null;

export type ToJSON<T, K> = (obj: T) => K;
export type FromJSON<T, K> = (jsonObj: K) => T;

interface Storage {
  setItem: SetItem;
  getItem: GetItem;
}

const localStoreCache: Map<string, LocalStore<unknown>> = new Map<string, LocalStore<unknown>>([]);

interface CreateLocalStoreProps<T, K = T> {
  key: string,
  fromJSON?: FromJSON<T, K> | undefined;
  toJSON?: ToJSON<T, K> | undefined;
}

interface LocalStoreProps<T, K = T> extends CreateLocalStoreProps<T, K> {
  storage: Storage,
}

class LocalStore<T, K = T> {
  store: Storage;

  key: string;

  fromJSON: FromJSON<T, K>;

  toJSON: ToJSON<T, K>;

  constructor({
    key,
    storage,
    fromJSON = undefined,
    toJSON = undefined,
  }: LocalStoreProps<T, K>) {
    this.store = storage;
    this.key = key;
    this.fromJSON = fromJSON || ((jsonObj: K) => jsonObj as unknown as T);
    this.toJSON = toJSON || ((obj: T) => obj as unknown as K);
  }

  static create<T, K = T>({
    key, fromJSON = undefined, toJSON = undefined,
  }: CreateLocalStoreProps<T, K>): LocalStore<T, K> {
    return new LocalStore<T, K>({
      key,
      storage: window.localStorage,
      fromJSON,
      toJSON,
    });
  }

  static createCached<T, K = T>(props: CreateLocalStoreProps<T, K>): LocalStore<T, K> {
    const { key } = props;
    if (localStoreCache.has(key)) {
      return localStoreCache.get(key) as LocalStore<T, K>;
    }
    const localStore = LocalStore.create<T, K>(props);
    localStoreCache.set(key, localStore as LocalStore<unknown>);
    return localStore;
  }

  set(value: T): void {
    this.store.setItem(this.key, JSON.stringify(this.toJSON(value)));
  }

  get(): T | null {
    const item = this.store.getItem(this.key);
    if (item === null) {
      return null;
    }
    try {
      return this.fromJSON(JSON.parse(item) as unknown as K);
    } catch (error) {
      // eslint-disable-next-line no-console
      console.error(error);
      return null;
    }
  }
}

export default LocalStore;
