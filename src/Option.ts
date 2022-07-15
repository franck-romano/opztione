import { Optional } from './OptionTypes';
import { None } from './None';
import { Some } from './Some';

export class Option<TYPE> {
  private constructor() {}

  static of<TYPE>(value: TYPE): Optional<TYPE> {
    return value === null || value === undefined ? this.none<TYPE>() : this.some<TYPE>(value);
  }

  static none<TYPE>(): Optional<TYPE> {
    return None.instance<TYPE>();
  }

  static some<TYPE>(value: TYPE): Optional<TYPE> {
    return new Some<TYPE>(value);
  }
}
