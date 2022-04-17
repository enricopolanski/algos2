import { fromArray, toArray, of } from "./listnode";

const l1 = fromArray([2, 4, 3]);

const l2 = fromArray([5, 6, 4]);

class ListNode {
  val: number;
  next: ListNode | null;
  constructor(val?: number, next?: ListNode | null) {
    this.val = val === undefined ? 0 : val;
    this.next = next === undefined ? null : next;
  }
}

function addTwoNumbers(
  l1: ListNode | null,
  l2: ListNode | null
): ListNode | null {
  if (!l1) {
    return l2;
  }
  if (!l2) {
    return l1;
  }
  let head: ListNode | null = null;
  let tail: ListNode | null = null;
  let overflow = 0;
  let x1: ListNode | null = l1;
  let x2: ListNode | null = l2;

  while (x1) {
    if (x2) {
      const newNode = { val: (x1.val + x2.val + overflow) % 10, next: null };
      overflow = x1.val + x2.val + overflow > 9 ? 1 : 0;
      x1 = x1.next;
      x2 = x2.next;
      if (head && tail) {
        tail.next = newNode;
        tail = newNode;
      } else {
        if (!head) {
          head = newNode;
        } else {
          head.next = newNode;
          tail = newNode;
        }
      }
    } else if (overflow) {
      const newNode = { val: (x1.val + overflow) % 10, next: null };
      overflow = x1.val + overflow > 9 ? 1 : 0;
      x1 = x1.next;
      if (head && tail) {
        tail.next = newNode;
        tail = newNode;
      } else {
        if (!head) {
          head = newNode;
        } else {
          head.next = newNode;
          tail = newNode;
        }
      }
    } else {
      if (head) {
        if (tail) {
          tail.next = x1;
          tail = x1;
        } else {
          head.next = x1;
          tail = x1;
        }
      } else {
        head = x1;
      }
      break;
    }
  }
  while (x2) {
    const newNode = { val: (x2.val + overflow) % 10, next: null };
    overflow = x2.val + overflow > 9 ? 1 : 0;
    x2 = x2.next;
    if (!tail) {
      if (!head) {
        head = newNode;
      } else {
        head.next = newNode;
        tail = newNode;
      }
    } else {
      tail.next = newNode;
      tail = newNode;
    }
  }
  if (overflow) {
    console.log("in overflow");

    overflow = 0;
    if (tail) {
      tail.next = { val: 1, next: null };
    } else {
      if (!head) {
        head = { val: 1, next: null };
      } else {
        head.next = { val: 1, next: null };
      }
    }
  }
  return head;
}

// addTwoNumber(l1, l2); //?

const l3 = fromArray([0]);
const l4 = fromArray([7, 3]);

toArray(addTwoNumbers(l3, l4)); //?
