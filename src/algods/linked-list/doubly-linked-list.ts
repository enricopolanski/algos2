/*
  The doubly linked list works in a similar way to the linked list with one difference it has one additional reference field, known as the "prev" field.
  With this extra step you're able to know the previous node of the current node.

  # Operations
  Most operations work in the same exact way as in a singly linked list:
  - we can't access a random position in constant time
  - we have to traverse from the head to get the i-th node we want
  - the time complexity in the worse case will be O(N), where N is the length of the linked list

  For addition and deletion it will be a little more complicated since we need to take care of the "prev" field as well.
 */

/*
 Add Operation.

 If we want to insert a new node `cur` after an existing node `prev`, we can divide this process into two steps:

 - link `cur` with `prev` and `next`, where `next` is the original next node of `prev`

 - re-link `prev` and `next` with `cur`

 Similar to the singly linked list, both the time and the space complexity of the add operation are O(1).
 */

/*
 Delete Operation - Doubly Linked List
 If we want to tdelete an existing node `cur` from the doubly linked list, we can simply link its previous node `prev` with its next node `next`.

 Since we no longer need to traverse the linked list to get the previous node, both the time and space complexity are O(1).

 */

// Design Linked List 2

interface DNode {
  val: number;
  next: DNode | null;
  prev: DNode | null;
}

const of: (n: number) => DNode = (n) => ({
  val: n,
  prev: null,
  next: null,
});

const getValue = (dll: DNode) => dll.val;

const hasNextNode = (
  dll: DNode
): dll is { val: number; next: DNode; prev: DNode | null } => !!dll.next;

const getNextNode = (dll: DNode) => dll.next;

const getNthNode = (dll: DNode, index: number) => {
  if (index === 0) return dll;
  let i = 0;
  let current: DNode | null = dll;
  while (i < index) {
    i++;
    if (!current) {
      return null;
    }
    current = getNextNode(current);
  }
  return current;
};

const get = (dll: DNode, index: number): number => {
  const node = getNthNode(dll, index);
  return node ? getValue(node) : -1;
};

const addAtHeadU = (dll: DNode | null, n: number): DNode => {
  const newHead = of(n);
  newHead.next = dll;
  if (dll) {
    dll.prev = newHead;
  }
  return newHead;
};

const getLastNode: (dll: DNode) => DNode = (dll) => {
  let current = dll;
  while (hasNextNode(current)) {
    current = getNextNode(current)!;
  }
  return current;
};

const addNodeToTailU: (dll1: DNode, dll2: DNode) => DNode = (dll1, dll2) => {
  if (dll1) {
    const lastNode = getLastNode(dll1);
    lastNode.next = dll2;
    dll2.prev = lastNode;
    return dll1;
  } else {
    return dll2;
  }
};

const addToTailU: (dll: DNode | null, n: number) => DNode = (dll, n) =>
  dll ? addNodeToTailU(dll, of(n)) : of(n);

const addNodeAtIndexU = (
  dll1: DNode | null,
  dll2: DNode,
  index: number
): DNode | null => {
  if (!dll1) {
    return dll1;
  }
  const node = getNthNode(dll1, index);
  if (!node) {
    return dll1;
  }
  const nodeBefore = node.prev!;
  nodeBefore.next = dll2;
  dll2.prev = nodeBefore;
  dll2.next = node;
  node.prev = dll2;

  return dll1;
};

const addAtIndexU = (
  dll: DNode | null,
  index: number,
  val: number
): DNode | null => addNodeAtIndexU(dll, of(val), index);

const deleteAtIndex = (dll: DNode, index: number): DNode => {
  if (index === 0 && dll.next) {
    return dll.next;
  }
  const previous = getNthNode(dll, index - 1);
  if (!previous) {
    return dll;
  }
  const current = getNextNode(previous);
  if (current) {
    const next = getNextNode(current);
    if (next) {
      previous.next = next;
      previous.next.prev = previous;
    } else {
      previous.next = null;
    }
  }
  return dll;
};

class MyLinkedList {
  head: DNode | null;
  size: number;

  constructor() {
    this.head = null;
    this.size = 0;
  }

  getNode(index: number): DNode | null {
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
      this.size++;
    }
  }

  deleteAtIndex(index: number): void {
    if (index === 0) {
      this.head = this.head?.next || null;
      if (this.head) {
        this.head.prev = null;
      }
      this.size--;
      return;
    }
    if (index < 0 || index >= this.size) return;
    if (this.size === 0) return;
    if (!this.head) return;
    deleteAtIndex(this.head, index);
    this.size--;
  }
}

const commands = [
  'MyLinkedList',
  'addAtHead',
  'addAtHead',
  'addAtIndex',
  'addAtTail',
  'addAtTail',
  'addAtIndex',
  'addAtHead',
  'addAtIndex',
  'addAtTail',
  'addAtTail',
  'addAtTail',
  'addAtHead',
  'addAtTail',
  'addAtHead',
  'addAtTail',
  'addAtIndex',
  'get',
  'addAtTail',
  'addAtIndex',
  'addAtTail',
  'addAtIndex',
  'addAtHead',
  'addAtTail',
  'get',
  'addAtTail',
  'addAtTail',
  'addAtTail',
  'addAtIndex',
  'addAtHead',
  'get',
  'addAtIndex',
  'addAtHead',
  'addAtHead',
  'addAtHead',
  'addAtHead',
  'addAtIndex',
  'deleteAtIndex',
  'addAtHead',
  'addAtHead',
  'addAtTail',
  'addAtHead',
  'addAtIndex',
  'get',
  'addAtHead',
  'addAtTail',
  'addAtIndex',
  'addAtTail',
  'addAtHead',
  'addAtTail',
  'deleteAtIndex',
  'addAtIndex',
  'addAtHead',
  'deleteAtIndex',
  'addAtHead',
  'addAtHead',
  'addAtHead',
  'addAtTail',
  'addAtTail',
  'addAtHead',
  'get',
  'get',
  'addAtHead',
  'addAtHead',
  'addAtTail',
  'addAtTail',
  'addAtHead',
  'addAtHead',
  'addAtTail',
  'addAtTail',
  'get',
  'addAtHead',
  'addAtHead',
  'get',
  'deleteAtIndex',
  'addAtHead',
  'deleteAtIndex',
  'deleteAtIndex',
  'addAtTail',
  'get',
  'addAtTail',
  'deleteAtIndex',
  'addAtHead',
  'deleteAtIndex',
  'addAtHead',
  'addAtIndex',
  'get',
  'deleteAtIndex',
  'deleteAtIndex',
  'addAtIndex',
  'deleteAtIndex',
  'addAtIndex',
  'addAtHead',
  'addAtTail',
  'addAtIndex',
  'addAtIndex',
  'addAtTail',
  'deleteAtIndex',
  'deleteAtIndex',
  'addAtHead',
  'addAtIndex',
  'deleteAtIndex',
];

const values = [
  [],
  [73],
  [48],
  [2, 90],
  [96],
  [34],
  [3, 59],
  [11],
  [4, 75],
  [70],
  [13],
  [49],
  [77],
  [4],
  [14],
  [95],
  [3, 6],
  [13],
  [0],
  [3, 39],
  [65],
  [19, 15],
  [1],
  [58],
  [7],
  [2],
  [39],
  [36],
  [15, 18],
  [53],
  [3],
  [15, 2],
  [20],
  [95],
  [73],
  [63],
  [31, 33],
  [25],
  [96],
  [14],
  [77],
  [19],
  [28, 27],
  [11],
  [21],
  [63],
  [7, 55],
  [47],
  [20],
  [86],
  [6],
  [32, 3],
  [13],
  [11],
  [30],
  [1],
  [2],
  [57],
  [66],
  [54],
  [37],
  [35],
  [39],
  [61],
  [95],
  [12],
  [0],
  [43],
  [73],
  [40],
  [14],
  [58],
  [70],
  [7],
  [47],
  [58],
  [36],
  [19],
  [26],
  [1],
  [61],
  [27],
  [12],
  [42],
  [1],
  [33, 35],
  [54],
  [17],
  [38],
  [11, 83],
  [33],
  [48, 87],
  [48],
  [11],
  [54, 68],
  [21, 11],
  [41],
  [64],
  [50],
  [49],
  [62, 7],
  [50],
];

commands
  .map(
    (command, index) =>
      `${index === 0 ? 'const ll = ' : 'll.'}${command}(${values[index]});`
  )
  .join('\n'); //?

const ll = new MyLinkedList();
ll.addAtHead(73);
ll.addAtHead(48);
ll.addAtIndex(2, 90);
ll.addAtTail(96);
ll.addAtTail(34);
ll.addAtIndex(3, 59);
ll.addAtHead(11);
ll.addAtIndex(4, 75);
ll.addAtTail(70);
ll.addAtTail(13);
ll.addAtTail(49);
ll.addAtHead(77);
ll.addAtTail(4);
ll.addAtHead(14);
ll.addAtTail(95);
ll.addAtIndex(3, 6);
ll.get(13);
ll.addAtTail(0);
ll.addAtIndex(3, 39);
ll.addAtTail(65);
ll.addAtIndex(19, 15);
ll.addAtHead(1);
ll.addAtTail(58);
ll.get(7);
ll.addAtTail(2);
ll.addAtTail(39);
ll.addAtTail(36);
ll.addAtIndex(15, 18);
ll.addAtHead(53);
ll.get(3);
ll.addAtIndex(15, 2);
ll.addAtHead(20);
ll.addAtHead(95);
ll.addAtHead(73);
ll.addAtHead(63);
ll.addAtIndex(31, 33);
ll.deleteAtIndex(25);
ll.addAtHead(96);
ll.addAtHead(14);
ll.addAtTail(77);
ll.addAtHead(19);
ll.addAtIndex(28, 27);
ll.get(11);
ll.addAtHead(21);
ll.addAtTail(63);
ll.addAtIndex(7, 55);
ll.addAtTail(47);
ll.addAtHead(20);
ll.addAtTail(86);
ll.deleteAtIndex(6);
ll.addAtIndex(32, 3);
ll.addAtHead(13);
ll.deleteAtIndex(11);
ll.addAtHead(30);
ll.addAtHead(1);
ll.addAtHead(2);
ll.addAtTail(57);
ll.addAtTail(66);
ll.addAtHead(54);
ll.get(37); //?
ll.get(35); //?
ll.addAtHead(39);
ll.addAtHead(61);
ll.addAtTail(95);
ll.addAtTail(12);
ll.addAtHead(0);
ll.addAtHead(43);
ll.addAtTail(73);
ll.addAtTail(40);
ll.get(14);
ll.addAtHead(58);
ll.addAtHead(70);
ll.get(7);
ll.deleteAtIndex(47);
ll.addAtHead(58);
ll.deleteAtIndex(36);
ll.deleteAtIndex(19);
ll.addAtTail(26);
ll.get(1);
ll.addAtTail(61);
ll.deleteAtIndex(27);
ll.addAtHead(12);
ll.deleteAtIndex(42);
ll.addAtHead(1);
ll.addAtIndex(33, 35);
ll.get(54);
ll.deleteAtIndex(17);
ll.deleteAtIndex(38);
ll.addAtIndex(11, 83);
ll.deleteAtIndex(33);
ll.addAtIndex(48, 87);
ll.addAtHead(48);
ll.addAtTail(11);
ll.addAtIndex(54, 68);
ll.addAtIndex(21, 11);
ll.addAtTail(41);
ll.deleteAtIndex(64);
ll.deleteAtIndex(50);
ll.addAtHead(49);
ll.addAtIndex(62, 7);
ll.deleteAtIndex(50);
