import { fromArray, ListNode, toArray, of } from "./listnode";

const l1 = fromArray([2, 4, 3]);

const l2 = fromArray([5, 6, 4]);

const add = (
  l1: ListNode<number>,
  l2: ListNode<number>,
  over?: number
): {
  sum: number;
  overflow: number;
  next1: ListNode<number>["next"];
  next2: ListNode<number>["next"];
} => ({
  sum: (l1.val + l2.val + (over ? over : 0)) % 10,
  overflow: l1.val + l2.val + (over ? over : 0) > 9 ? 1 : 0,
  next1: l1.next,
  next2: l2.next,
});

function addTwoNumber(
  l1: ListNode<number> | null,
  l2: ListNode<number> | null
): ListNode<number> | null {
  if (!l1) {
    return l2;
  }
  if (!l2) {
    return l1;
  }
  let current1: ListNode<number> | null = l1;
  let current2: ListNode<number> | null = l2;
  let head: ListNode<number> | null = null;
  let tail: ListNode<number> | null = null;

  let remainder = 0;
  const count = 0;

  while (current1) {
    if (current2) {
      const { sum, overflow, next1, next2 } = add(
        current1,
        current2,
        remainder
      );
      remainder = overflow;

      if (!tail) {
        if (!head) {
          head = of(sum);
        } else {
          tail = of(sum);
          head.next = tail;
        }
      } else {
        const newNode = of(sum);
        tail.next = newNode;
        tail = newNode;
      }
      current1 = next1;
      current2 = next2;
    } else {
      const { sum, overflow, next1, next2 } = add(current1, of(remainder));
      const newNode = of(sum);
      remainder = overflow;
      current1 = next1;
      if (tail) {
        tail.next = newNode;
        tail = newNode;
      } else {
        if (head) {
          head.next = newNode;
        } else {
          head = l1;
        }
      }
    }
  }
  if (current2) {
    const { sum, overflow, next1, next2 } = add(current2, of(remainder));
    current2 = next1;
    remainder = overflow;
    const newNode = of(sum);
    if (!tail) {
      tail = newNode;
    } else {
      tail.next = newNode;
      tail = newNode;
    }
  }
  if (remainder) {
    const newNode = of(remainder);
    if (!tail) {
      tail = newNode;
    } else {
      tail.next = newNode;
      tail = newNode;
    }
  }
  return head;
}

// addTwoNumber(l1, l2); //?

const l3 = fromArray([9, 9, 9, 9, 9, 9, 9]);
const l4 = fromArray([9, 9, 9, 9]);

toArray(addTwoNumber(l3, l4)); //?
