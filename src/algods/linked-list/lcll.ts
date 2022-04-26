import { strict as assert } from 'assert';
/*
 * This file provides generic tools for playing and testing leetcode-implementations of linked lists.
 */

/**
 * Represents a node in a linked list
 */
interface ListNode {
  val: number;
  next: ListNode | null;
}

/**
 * Creates a new ListNode
 */
const of: (n: number) => ListNode = (n) => ({
  val: n,
  next: null,
});

const hasNextNode = (ll: ListNode): ll is { val: number; next: ListNode } =>
  !!ll.next;

const getNextNode = (ll: ListNode) => ll.next;

const getValue = (ll: ListNode) => ll.val;

const getNthNode = (ll: ListNode, index: number) => {
  if (index === 0) return ll;
  let i = 0;
  let current: ListNode | null = ll;
  while (i < index) {
    i++;
    if (!current) {
      return null;
    }
    if (hasNextNode(current)) {
      current = getNextNode(current);
      if (i === index) {
        return current;
      }
    }
  }
  return null;
};

const get = (ll: ListNode, int: number): number => {
  const node = getNthNode(ll, int);
  return node ? getValue(node) : -1;
};

/**
 * Adds a new value as the new head of the list.
 */
const addAtHeadU = (ll: ListNode | null, n: number): ListNode => {
  const newHead = of(n);
  newHead.next = ll;
  return newHead;
};

/**
 * Get the last ListNode
 */
const getLastNode: (ll: ListNode) => ListNode = (ll) => {
  let current = ll;
  while (hasNextNode(current)) {
    current = current.next;
  }
  return current;
};

/**
 * Appends l2 to the tail of l1. Mutates `l1`. Returns the head of new list.
 */
const addNodeToTailU: (l1: ListNode | null, l2: ListNode) => ListNode = (
  l1,
  l2
) => {
  if (l1) {
    getLastNode(l1).next = l2;
    return l1;
  } else {
    return l2;
  }
};

const addToTailU = (l1: ListNode | null, n: number): ListNode =>
  addNodeToTailU(l1, of(n));

const addNodeAtIndexU = (
  l1: ListNode | null,
  l2: ListNode,
  index: number
): ListNode | null => {
  if (!l1) {
    return null;
  }
  const nodeBefore = getNthNode(l1, index - 1);
  if (!nodeBefore) {
    return l1;
  }
  const nodeAfter = nodeBefore?.next || null;

  nodeBefore.next = l2;
  l2.next = nodeAfter;

  return l1;
};

const addAtIndexU = (
  ll: ListNode | null,
  index: number,
  val: number
): ListNode | null => addNodeAtIndexU(ll, of(val), index);

const deleteAtIndex = (ll: ListNode, index: number): ListNode => {
  if (index === 0 && ll.next) {
    return ll.next;
  }
  const previous = getNthNode(ll, index - 1);
  if (!previous) {
    return ll;
  }
  const current = getNextNode(previous);
  if (current) {
    const next = getNextNode(current);
    if (next) {
      previous.next = next;
    } else {
      previous.next = null;
    }
    return ll;
  } else {
    return ll;
  }
};

/**
 * Appends l2 to l1. Mutates `l1` and returns `l2`.
 */
const appendU: (l1: ListNode, l2: ListNode) => ListNode = (l1, l2) => {
  l1.next = l2;
  return l2;
};

/**
 * Appends l2 to l1. Mutates `l1` and returns `l1`.
 */
const prependU: (l1: ListNode, l2: ListNode) => ListNode = (l1, l2) => {
  l1.next = l2;
  return l1;
};

/**
 * Returns a new cloned linked list.
 */
const clone: (ll: ListNode | null) => ListNode | null = (ll) => {
  if (!ll) {
    return ll;
  }
  let head: ListNode | null = null;
  let tail: ListNode | null = null;
  let current: ListNode | null = ll;
  while (current) {
    const newNode = of(current.val);
    if (!head || !tail) {
      head = newNode;
      tail = newNode;
    } else {
      appendU(tail, newNode);
      tail = newNode;
    }
    current = getNextNode(current);
  }

  return head;
};

assert.deepStrictEqual(clone(of(1)), of(1));

const fromArray: (ns: number[]) => ListNode | null = (ns) => {
  let head: ListNode | null = null;
  ns.reduce((acc: ListNode | null, val) => {
    const newNode = of(val);
    if (!acc) {
      head = newNode;
      return newNode;
    } else {
      acc.next = newNode;
      return newNode;
    }
  }, head);
  return head;
};

const toArray: (ll: ListNode | null) => number[] = (ll) => {
  if (!ll) return [];
  const values = [];
  let current: ListNode | null = ll;
  while (current) {
    values.push(current.val);
    current = getNextNode(current);
  }
  return values;
};

assert.deepStrictEqual(fromArray([1, 2, 3, 4]), {
  val: 1,
  next: { val: 2, next: { val: 3, next: { val: 4, next: null } } },
});
assert.deepStrictEqual(toArray(fromArray([1, 2, 3, 4])), [1, 2, 3, 4]);
assert.deepStrictEqual(fromArray([]), null);
assert.deepStrictEqual(toArray(fromArray([])), []);
assert.deepStrictEqual(clone(fromArray([1, 2, 3])), fromArray([1, 2, 3]));
getNthNode(fromArray([1, 2, 3, 4])!, 0); //?
assert.deepStrictEqual(
  getNthNode(fromArray([1, 2, 3, 4])!, 0),
  fromArray([1, 2, 3, 4])
);
assert.deepStrictEqual(
  getNthNode(fromArray([1, 2, 3, 4])!, 1),
  fromArray([2, 3, 4])
);
assert.deepStrictEqual(
  getNthNode(fromArray([1, 2, 3, 4])!, 2),
  fromArray([3, 4])
);
assert.deepStrictEqual(getNthNode(fromArray([1, 2, 3, 4])!, 3), fromArray([4]));
assert.deepStrictEqual(getNthNode(fromArray([1, 2, 3, 4])!, 4), null);

class MyLinkedList {
  head: ListNode | null;
  size: number;

  constructor() {
    this.head = null;
    this.size = 0;
  }

  getNode(index: number): ListNode | null {
    return this.head === null ? null : getNthNode(this.head, index);
  }

  get(index: number): number {
    return this.head === null ? -1 : get(this.head, index);
  }

  addAtHead(val: number): void {
    this.head = addAtHeadU(this.head, val);
    this.size++;
  }

  addAtTail(val: number): void {
    this.head = addToTailU(this.head, val);
    this.size++;
  }

  addAtIndex(index: number, val: number): void {
    if (index < 0 || index > this.size) return;
    if (index === this.size) {
      this.addAtTail(val);
    } else if (index === 0) {
      this.addAtHead(val);
    } else {
      addAtIndexU(this.head, index, val);
    }
    this.size++;
  }

  deleteAtIndex(index: number): void {
    if (index === 0) {
      this.head = this.head?.next || null;
      return;
    }
    if (index < 0 || index >= this.size) return;
    if (this.size === 0) return;
    if (!this.head) return;
    deleteAtIndex(this.head, index);
    this.size--;
  }
}

// is palindrome
const lln = fromArray([1, 2, 3, 4]);
const lly = fromArray([1, 2, 3, 2, 1]);
const lly2 = fromArray([1, 2, 3, 4, 3, 2, 1]);

// lly
function isPalindrome(head: ListNode | null): boolean {
  if (!head) {
    return false;
  }
  function sameValue(a: ListNode, b: ListNode) {
    return a.val === b.val;
  }
  let candidate = null;
  let current: ListNode | null = head;
  while (current) {
    if (!candidate) {
      candidate = of(current.val);
    } else {
      candidate = addAtHeadU(candidate, current.val);
    }
    current = current.next;
  }
  current = head;
  candidate = candidate;
  while (current && candidate) {
    if (!sameValue(current, candidate)) {
      return false;
    } else {
      current = current.next;
      candidate = candidate.next;
    }
  }
  return true;
}

isPalindrome(lly); //?
isPalindrome(lly2); //?
