import { FlatMapFn, MapFn, Optional, OrElseFn, PeekFn } from './OptionTypes';

export class None<TYPE> implements Optional<TYPE> {
  private constructor() {}

  static instance<TYPE>() {
    return new None<TYPE>();
  }

  get(): TYPE {
    throw new Error('No value present');
  }

  getOrElse(fallbackValue: OrElseFn<TYPE> | TYPE): TYPE {
    return fallbackValue instanceof Function ? fallbackValue() : fallbackValue;
  }

  getOrElseThrow(throwable: Error): TYPE {
    throw throwable;
  }

  flatMap<NEW_TYPE>(mapFn: FlatMapFn<TYPE, NEW_TYPE>): Optional<NEW_TYPE> {
    return None.instance();
  }

  map<NEW_TYPE>(mapFn: MapFn<TYPE, NEW_TYPE>): Optional<NEW_TYPE> {
    return None.instance();
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
