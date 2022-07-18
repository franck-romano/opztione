import t from 'tap';
import { Option } from '../src/Option';

t.mochaGlobals();

describe('Some', () => {
  describe('.get()', () => {
    it('returns the value', () => {
      const value = 'value';
      const some = Option.some(value);
      t.equal(some.get(), value);
    });
  });

  describe('.getOrElse()', () => {
    context('raw value supplier is provided', () => {
      it('returns the value', () => {
        const some = Option.some(undefined);
        const expected = 'fallback-value';
        const actual = some.getOrElse(expected);

        t.equal(actual, expected);
      });
    });

    context('function value supplier is provided', () => {
      it('returns the value', () => {
        const some = Option.some(null);
        const expected = 'fallback-value';
        const actual = some.getOrElse(() => expected);

        t.equal(actual, expected);
      });
    });
  });

  describe('.getOrElseThrow()', () => {
    it('throws the error', () => {
      const some = Option.some(null);
      const message = 'oops';
      const error = new Error(message);

      t.throws(() => some.getOrElseThrow(error), Error, message);
    });
  });

  describe('.flatMap()', () => {
    it('returns the newly mapped value', () => {
      const some = Option.some('value');
      const expected = true;
      const actual = some.flatMap(() => Option.of(expected));
      t.equal(actual.get(), expected);
      t.not(some, actual);
    });
  });

  describe('.map()', () => {
    it('returns the newly mapped value', () => {
      const some = Option.some('value');
      const expected = true;
      const actual = some.map(() => expected);
      t.equal(actual.get(), expected);
      t.not(some, actual);
    });

    it('wraps an Optional', () => {
      const some = Option.some('value');
      const expected = true;
      const actual = some.map(() => Option.of(expected));
      t.equal(actual.get().get(), expected);
      t.not(some, actual);
    });
  });

  describe('.isDefined()', () => {
    it('returns true', () => {
      t.equal(Option.some('value').isDefined(), true);
    });
  });

  describe('.isEmpty()', () => {
    it('returns false', () => {
      t.equal(Option.some('value').isEmpty(), false);
    });
  });

  describe('.peek()', () => {
    it('executes the provided function', () => {
      let called = false;
      const some = Option.some('value');
      const actual = some.peek(() => {
        called = true;
      });
      t.ok(called);
      t.equal(some, actual);
    });
  });
});
