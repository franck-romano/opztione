import { MapFn, Optional, OrElseFn, PeekFn } from './OptionTypes';

export class Some<TYPE> implements Optional<TYPE> {
  constructor(private value: TYPE) {}

  get(): TYPE {
    return this.value;
  }

  getOrElse<T>(fallbackValue: T | OrElseFn<T>): T | TYPE {
    const value = this.get();
    if (fallbackValue instanceof Function) {
      return value ?? fallbackValue();
    }
    return value ?? fallbackValue;
  }

  getOrElseThrow(throwable: Error): TYPE {
    const value = this.get();
    if (value) {
      return value;
    }
    throw throwable;
  }

  flatMap<NEW_TYPE>(mapFn: MapFn<TYPE, NEW_TYPE>): Optional<NEW_TYPE> {
    return new Some(mapFn.call(this, this.get()));
  }

  map<NEW_TYPE>(mapFn: MapFn<TYPE, NEW_TYPE>): Some<NEW_TYPE> {
    return new Some<NEW_TYPE>(mapFn.call(this, this.get()));
  }

  isDefined(): boolean {
    return !this.isEmpty();
  }

  isEmpty(): boolean {
    return false;
  }

  peek(peekFn: PeekFn): Optional<TYPE> {
    peekFn();
    return this;
  }
}