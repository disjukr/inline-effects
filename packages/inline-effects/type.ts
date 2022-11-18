export interface Effect<T> {
  selector?: Selector<T>;
  transformer: Transformer<T>;
}

export type Selector<T> = (items: T[]) => SelectFn;

// returns factor. 0~1
export type SelectFn = (index: number) => number;

export type Transformer<T> = () => TransformFn<T>;

export type TransformFn<T> = (item: T, factor: number) => void;
