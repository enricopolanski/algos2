// implement linked list in TypeScript
/**
 * Definition for singly-linked list.
 * class ListNode {
 *     val: number
 *     next: ListNode | null
 *     constructor(val?: number, next?: ListNode | null) {
 *         this.val = (val===undefined ? 0 : val)
 *         this.next = (next===undefined ? null : next)
 *     }
 * }
 */

class ListNode<A> {
  val: A;
  next: ListNode<A> | null;
  constructor(val: A, next?: ListNode<A> | null) {
    this.val = val;
    this.next = next || null;
  }
}

export interface LNode<A> {
  value: A;
  next: LNode<A> | null;
}

export const of: <A>(a: A, next?: LNode<A>) => LNode<A> = (a, next) => ({
  value: a,
  next: next || null,
});

export const reducer: <A>(acc: LNode<A> | undefined, val: A) => LNode<A> = (
  acc,
  val
) => of(val, acc);

export const fromArray: <A>(as: Array<A>) => LNode<A> = (as) =>
  as.reduceRight(reducer as any, undefined) as any;

export const toArray = <A>(ln: LNode<A> | null): Array<A> => {
  let current: LNode<A> | null = ln;
  let as = [];
  while (current) {
    as.push(current.value);
    current = current.next;
  }
  return as;
};

export const getNext = <A>(ln: LNode<A>): LNode<A> | null => ln.next;

export const getValue = <A>(ln: LNode<A>): A => ln.value;

export const append = <A>(to: LNode<A>, what: LNode<A>): LNode<A> => {
  to.next = what;
  return what;
};

// const foo = fromArray([1, 2, 3, 4]);
// foo; //?

// toArray(foo) //?
