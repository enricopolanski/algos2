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

export interface ListNode<A> {
  val: A;
  next: ListNode<A> | null;
}

export const of: <A>(a: A, next?: ListNode<A>) => ListNode<A> = (a, next) => ({
  val: a,
  next: next || null,
});

export const reducer: <A>(
  acc: ListNode<A> | undefined,
  val: A
) => ListNode<A> = (acc, val) => of(val, acc);

export const fromArray: <A>(as: Array<A>) => ListNode<A> = (as) =>
  as.reduceRight(reducer as any, undefined) as any;

export const toArray = <A>(ln: ListNode<A> | null): Array<A> => {
  let current: ListNode<A> | null = ln;
  let as = [];
  while (current) {
    as.push(current.val);
    current = current.next;
  }
  return as;
};

export const getNext = <A>(ln: ListNode<A>): ListNode<A> | null => ln.next;

export const getValue = <A>(ln: ListNode<A>): A => ln.val;

export const append = <A>(to: ListNode<A>, what: ListNode<A>): ListNode<A> => {
  to.next = what;
  return what;
};
