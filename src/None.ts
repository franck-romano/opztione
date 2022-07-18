import { FlatMapFn, MapFn, Nullable, Optional, OrElseFn, PeekFn } from './OptionTypes';

export class None<TYPE> implements Optional<TYPE> {
  private constructor() {}

  static instance<TYPE>() {
    return new None<TYPE>();
  }

  get(): TYPE {
    throw new Error('No value present');
  }

  getOrElse<T>(fallbackValue: OrElseFn<T> | T): T | TYPE {
    return fallbackValue instanceof Function ? fallbackValue() : fallbackValue;
  }

  getOrElseThrow(throwable: Error): TYPE {
    throw throwable;
  }

  flatMap<NEW_TYPE>(mapFn: FlatMapFn<TYPE, NEW_TYPE>): Optional<NEW_TYPE> {
    return None<NEW_TYPE>.instance();
  }

  map<NEW_TYPE>(mapFn: MapFn<TYPE, NEW_TYPE>): Optional<NEW_TYPE> {
    return None<Nullable>.instance();
  }

  isDefined(): boolean {
    return false;
  }

  isEmpty(): boolean {
    return !this.isDefined();
  }

  peek(peekFn: PeekFn<TYPE>): None<TYPE> {
    return this;
  }
}
