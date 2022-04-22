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