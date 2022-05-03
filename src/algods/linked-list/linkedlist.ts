interface ListNode {
  val: number;
  next: ListNode | null;
}

class MyLinkedList {
  private head: ListNode | null = null;
  constructor() {}

  get(index: number): number {
    if (!this.head) {
      return -1;
    }
    let node: ListNode | null = this.head;
    for (let i = 0; i < index + 1; ++i) {
      if (!node?.next) {
        return -1;
      }
      node = node.next;
    }
    return node.val;
  }

  addAtHead(val: number): void {
    const newNode = { val, next: this.head };
    this.head = newNode;
  }

  addAtTail(val: number): void {
    if (!this.head) {
      this.head = { val, next: null };
    }
    let current = this.head;
    while (current.next) {
      current = current.next;
    }
    current = { val, next: null };
  }

  addAtIndex(index: number, val: number): void {
    if (index === 0) {
      this.addAtHead(val);
    } else {
      if (!this.head) {
        this.head = { val, next: null };
        return;
      }
      let current: ListNode | null = this.head;
      for (let i = 0; i < index; ++i) {
        current = current?.next || null;
      }
      if (current && current.next?.next) {
        current.next = { val, next: current.next.next };
      }
    }
  }

  deleteAtIndex(index: number): void {
    if (index === 0) {
      this.head = this.head?.next || null;
    } else {
      let i = 0;
      let current = this.head;
      while (i < index && current?.next) {
        current = current.next;
        i = i + 1;
      }
      if (current?.next?.next) {
        current.next = current.next.next;
      } else {
        current!.next = null;
      }
    }
  }
}

/**
 * Your MyLinkedList object will be instantiated and called as such:
 * var obj = new MyLinkedList()
 * var param_1 = obj.get(index)
 * obj.addAtHead(val)
 * obj.addAtTail(val)
 * obj.addAtIndex(index,val)
 * obj.deleteAtIndex(index)
 */
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

function detectCycle(head: ListNode | null): ListNode | null {
  if (!head || !head.next) {
    return null;
  }
  let tartaruga: ListNode | null = head;
  let achille: ListNode | null = head.next;
  while (true) {
    if (achille === tartaruga) {
      return achille;
    } else if (achille === null || tartaruga === null) {
      return null;
    } else {
      tartaruga = tartaruga.next;
      achille = achille.next?.next || null;
    }
  }
}
