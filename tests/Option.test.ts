import t from 'tap';
import { Option } from '../index';

t.mochaGlobals();

describe('Option', () => {
  describe('.of()', () => {
    context('provided value is null or undefined', () => {
      it('returns None()', () => {
        const none = Option.of(null);
        t.throws(() => none.get(), Error, 'No value present');
      });

      it('returns None()', () => {
        const none = Option.of(undefined);
        t.throws(() => none.get(), Error, 'No value present');
      });
    });

    context('provided value is defined', () => {
      context('empty string', () => {
        it('returns Some()', () => {
          const value = '';
          const stringOptional = Option.of(value);

          const actual = stringOptional.get();

          t.equal(actual, value);
        });
      });

      context('0', () => {
        it('returns Some(0)', () => {
          const value = 0;
          const stringOptional = Option.of(value);

          const actual = stringOptional.get();

          t.equal(actual, value);
        });
      });

      it('returns Some("string-value")', () => {
        const value = 'string-value';
        const stringOptional = Option.of(value);

        const actual = stringOptional.get();

        t.equal(actual, value);
      });
    });
  });

  describe('.none()', () => {
    it('returns None()', () => {
      const none = Option.none();
      t.throws(() => none.get(), Error, 'No value present');
    });
  });

  describe('.some()', () => {
    it('returns Some()', () => {
      const value = 1234;
      const none = Option.some(value);

      const actual = none.get();

      t.equal(actual, value);
    });
  });

  describe('fluent API', () => {
    it('returns the correct value', () => {
      const actual = Option.of('myString')
        .map((stringValue) => stringValue.length)
        .flatMap((stringLength) => Option.of(!!stringLength))
        .get();

      t.equal(actual, true);
    });
  });
});
