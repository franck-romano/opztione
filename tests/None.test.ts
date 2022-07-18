import t from 'tap';
import { Option } from '../src/Option';

t.mochaGlobals();

describe('None', () => {
  describe('.get()', () => {
    it('throws an error', () => {
      const none = Option.none();
      t.throws(() => none.get(), Error, 'No value present');
    });
  });

  describe('.getOrElse()', () => {
    context('raw value supplier is provided', () => {
      it('returns the value', () => {
        const none = Option.none();
        const expected = 'fallback-value';
        const actual = none.getOrElse(expected);

        t.equal(actual, expected);
      });
    });

    context('function value supplier is provided', () => {
      it('returns the value', () => {
        const none = Option.none();
        const expected = 'fallback-value';
        const actual = none.getOrElse(() => {
          return expected;
        });

        t.equal(actual, expected);
      });
    });
  });

  describe('.getOrElseThrow()', () => {
    it('throws the error', () => {
      const none = Option.none();
      const message = 'oops';
      const error = new Error(message);

      t.throws(() => none.getOrElseThrow(error), Error, message);
    });
  });

  describe('.flatMap()', () => {
    it('returns an Optional', () => {
      const none = Option.none().flatMap(() => Option.of(''));
      t.throws(() => none.get(), Error, 'No value present');
    });
  });

  describe('.map()', () => {
    it('returns None', () => {
      const none = Option.none().map(() => true);
      t.throws(() => none.get(), Error, 'No value present');
    });
  });

  describe('.isDefined()', () => {
    it('returns false', () => {
      t.equal(Option.none().isDefined(), false);
    });
  });

  describe('.isEmpty()', () => {
    it('returns true', () => {
      t.equal(Option.none().isEmpty(), true);
    });
  });

  describe('.peek()', () => {
    it('does not executes the provided function', () => {
      let called = false;
      const none = Option.none();
      const actual = none.peek(() => {
        called = true;
      });
      t.notOk(called);
      t.equal(none, actual);
    });
  });
});
