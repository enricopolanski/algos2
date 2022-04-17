/* 
  Note: TypeScript doesn't distinguish between doubles (64 bit floats) and integers (as the exercise requested).
  In order to specify an array of integers rather than numbers in TypeScript,
  I would've needed newtypes: https://github.com/gcanti/newtype-ts#refinements.
*/
import { strict as assert } from "assert";

// We need to define a custom type for an arbitrarly nested array
type ArrayOrValue<A> = A | ArrayOrValue<A>[];
type NestedArray<A> = Array<ArrayOrValue<A>>;

// const flatByOne = <A>(arr: NestedArray<A>): NestedArray<A> =>

const reduceNarr = <A>(narr: NestedArray<A>): NestedArray<A> =>
  narr.reduce(
    (acc, el) => (Array.isArray(el) ? [...acc, ...el] : [...acc, el]),
    [] as any
  ); //?

const isArray: <A>(narr: NestedArray<A>) => boolean = (narr) =>
  narr.every((el) => !Array.isArray(el));

/**
 * Flattens an arbitrarly nested array
 */
const flatten = <A>(narr: NestedArray<A>): Array<A> => {
  let current: any = narr;

  while (!isArray(current)) {
    current = reduceNarr(current);
  }

  return current;
};

const foo = [[1, 2, [3, [5, [2], 4]]], 4];
flatten(foo); //?

assert.deepEqual(flatten([[1, [], 2, 3], 4]), [1, 2, 3, 4]); // ok
assert.deepEqual(flatten([[1, 2, [3, [5, [2], 4]]], 4]), [1, 2, 3, 5, 2, 4, 4]); // ok
assert.deepEqual(flatten([[[]]]), []); // ok

// const foo = [[1, [], 2, 3], 4];
const bar = [1, [], 2, 3, 4];

// assert.deepEqual(reduceNarr([[1, [], 2, 3], 4]), [1, 2, 3, 4]); // ok
