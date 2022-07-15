import { None } from './None';
import { Some } from './Some';

export type OrElseFn<TYPE> = () => TYPE;
export type MapFn<TYPE, NEW_TYPE> = (param: TYPE) => NEW_TYPE;
export type PeekFn = () => void | Promise<unknown>;
export type Nullable = undefined | null;

export interface Optional<TYPE> {
  getOrElse<T>(fallbackValue: T | OrElseFn<T>): T | TYPE;

  getOrElseThrow(throwable: Error): TYPE;

  get(): TYPE;

  isEmpty(): boolean;

  isDefined(): boolean;

  flatMap<NEW_TYPE>(mapFn: MapFn<TYPE, NEW_TYPE>): Optional<NEW_TYPE | Nullable>;

  map<NEW_TYPE>(mapFn: MapFn<TYPE, NEW_TYPE>): None<Nullable> | Some<NEW_TYPE>;

  peek(peekFn: PeekFn): Optional<TYPE>;
}
