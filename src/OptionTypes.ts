export type OrElseFn<TYPE> = () => TYPE;
export type MapFn<TYPE, NEW_TYPE> = (value: TYPE) => NEW_TYPE;
export type FlatMapFn<TYPE, NEW_TYPE> = (value: TYPE) => Optional<NEW_TYPE>;
export type PeekFn<TYPE> = (value: TYPE) => void | Promise<unknown>;

export interface Optional<TYPE> {
  getOrElse(fallbackValue: TYPE | OrElseFn<TYPE>): TYPE;

  getOrElseThrow(throwable: Error): TYPE;

  get(): TYPE;

  isEmpty(): boolean;

  isDefined(): boolean;

  flatMap<NEW_TYPE>(flatMapFn: FlatMapFn<TYPE, NEW_TYPE>): Optional<NEW_TYPE>;

  map<NEW_TYPE>(mapFn: MapFn<TYPE, NEW_TYPE>): Optional<NEW_TYPE>;

  peek(peekFn: PeekFn<TYPE>): Optional<TYPE>;
}
