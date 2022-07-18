# opztione

Monadic Option implementation in TS

# Static methods

### Option.none()

Returns a `None` representing the absence of value (`undefined`, `null` etc.).

```js
const none = Option.none();
```

### Option.some()

Returns a `Some` wrapping the provided value.

```js
const stringOption = Option.some('hello');
```

### Option.of()

Returns a `Some` if the provided value is truthy, returns `None` otherwise.

```js
const stringOption = Option.of('hello');
const none = Option.of(null);
```

## Example

```js
const actual = Option.of('myString')
    .map((stringValue) => stringValue.length)
    .flatMap((stringLength) => Option.of(!!stringLength))
    .peek((value) => {
        console.log('hello world', value)
    })
    .get(); // will return true
```

# Optional API

### .get()

Returns the wrapped value if this is a `Some` instance, will throw if this is a `None`.

```js
const stringOption = Option.some('hello');
const stringValue = Option.get(); // will be 'hello'

const none = Option.none();
const value = Option.get() // will throw;
```

### .getOrElse()

Returns the wrapped value or use the provided fallback value

```js
const none = Option.none();
const value = Option.getOrElse("hello") // will be 'hello'
```

### .getOrElseThrow()

Returns the wrapped value or throws if this is a `None` or if the wrapped value is `undefined`, `null` etc.

```js
const stringOption = Option.some('hello');
const stringValue = Option.getOrElseThrow(new MyCustomError('oops')); // won't throw, will be 'hello'

const nullableOption = Option.some(null);
nullableOption.getOrElseThrow(new MyCustomError('oops')); // will throw

const none = Option.none();
none.getOrElseThrow(new MyCustomError('oops')); // will throw
```

### .isEmpty()

Returns `true` if this is a `None`, `false` if this is a `Some`.

````js
const stringOption = Option.some('hello');
const stringIsEmpty = stringOption.isEmpty() // will be false

const nullableOption = Option.none();
const isEmpty = nullableOption.isEmpty() // will be true
````

### .isDefined()

Returns `false` if this is a `None`, `true` if this is a `Some`.

````js
const stringOption = Option.some('hello');
const stringIsEmpty = stringOption.isEmpty() // will be false

const nullableOption = Option.none();
const isEmpty = nullableOption.isEmpty() // will be true
````

### .flatMap()

Maps the value to a new `Option` if this is a `Some`, otherwise returns `None`.

````js
const stringOption = Option.some('hello');
const newOption = stringOption.flatMap((param) => {
    return Option.of({
        some: 'value'
    });
});

newOption.get() // will return Optional<{some: string}>

const nullableOption = Option.none();
const newNoneOption = nullableOption.flatMap((param) => {
    return Option.of({
        some: 'value'
    });
});

newNoneOption.get() // will return None
````

### .map()

Maps the value and wraps it in a new Some if this is a Some, returns None.

````js
const stringOption = Option.some('hello');
const newOption = stringOption.map((param) => {
    return {
        some: 'value'
    };
});

newOption.get() // will return Optional<{some: string}>

const nullableOption = Option.none();
const newNoneOption = nullableOption.map((param) => {
    return {
        some: 'value'
    };
});

newNoneOption.get() // will return Optional<Nullable>
````

### .peek()

Applies an action to this value, if this option is a `Some`, otherwise does nothing.

````js
const stringOption = Option.some('hello');
const newOption = stringOption.peek((value) => {
    console.log('bye') // will be executed
});

const nullableOption = Option.none();
const newNoneOption = nullableOption.peek((value) => {
    console.log('oops') // won't be executed
});
````
