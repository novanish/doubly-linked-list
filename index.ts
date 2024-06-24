class Node<T> {
  /**
   * Represents a node in a doubly linked list.
   * @param data The data stored in the node.
   * @param previous Reference to the previous node in the list.
   * @param next Reference to the next node in the list.
   */
  constructor(
    public data: T,
    public previous: Node<T> | null = null,
    public next: Node<T> | null = null
  ) {}
}

export class DoublyLinkedList<T> {
  /**
   * The head (first node) of the list.
   * @private
   */
  private head: Node<T> | null = null;

  /**
   * The tail (last node) of the list.
   * @private
   */
  private tail: Node<T> | null = null;

  /**
   * Indicates whether the list is reversed.
   * @private
   */
  private isReversed: boolean = false;

  /**
   * The number of elements in the list.
   */
  public length: number = 0;

  /**
   * Inserts a node with the given data at the end of the list.
   * @param data The data to insert.
   * @returns The current list instance.
   */
  private insertAtLast(data: T): this {
    const node = new Node(data);
    this.length += 1;

    if (this.tail == null) {
      this.head = node;
      this.tail = this.head;
      return this;
    }

    node.previous = this.tail;
    this.tail.next = node;
    this.tail = node;

    return this;
  }

  /**
   * Inserts a node with the given data at the beginning of the list.
   * @param data The data to insert.
   * @returns The current list instance.
   */
  private insertAtFirst(data: T): this {
    const node = new Node(data);
    this.length += 1;

    if (this.head == null) {
      this.head = node;
      this.tail = this.head;
      return this;
    }

    node.next = this.head;
    this.head.previous = node;
    this.head = node;

    return this;
  }

  /**
   * Computes the actual index of the list, considering if the list is reversed.
   * @param index The index to compute.
   * @returns The actual index.
   */
  private getActualIndex(index: number): number {
    const positiveIndex = index < 0 ? this.length + index : index;

    if (!this.isReversed) return positiveIndex;

    return this.length - 1 - positiveIndex;
  }

  /**
   * Adds elements to the end of the list.
   * @param data The elements to add.
   * @returns The new length of the list.
   */
  public push(...data: Array<T>): number {
    const insert = this.isReversed
      ? this.insertAtFirst.bind(this)
      : this.insertAtLast.bind(this);

    for (let i = 0; i < data.length; i++) {
      insert(data[i]);
    }

    return this.length;
  }

  /**
   * Removes and returns the last element of the list.
   * @returns The removed element or undefined if the list is empty.
   */
  public removeFromLast(): T | undefined {
    if (this.tail == null) return;

    const node = this.tail;

    this.length--;
    if (this.length === 0) {
      this.head = this.tail = null;
    } else {
      this.tail = node.previous;
      this.tail!.next = null;
    }

    return node.data;
  }

  /**
   * Removes and returns the last element if the list is not reversed,
   * otherwise removes and returns the first element.
   * @returns The removed element or undefined if the list is empty.
   */
  public pop(): T | undefined {
    return this.isReversed ? this.removeFromFirst() : this.removeFromLast();
  }

  /**
   * Adds elements to the beginning of the list.
   * @param data The elements to add.
   * @returns The new length of the list.
   */
  public unshift(...data: Array<T>): number {
    const insert = this.isReversed
      ? this.insertAtLast.bind(this)
      : this.insertAtFirst.bind(this);

    for (let i = data.length - 1; i !== -1; i--) {
      insert(data[i]);
    }

    return this.length;
  }

  /**
   * Removes and returns the first element of the list.
   * @returns The removed element or undefined if the list is empty.
   */
  private removeFromFirst(): T | undefined {
    if (this.head == null) return;

    const node = this.head;

    this.length--;
    if (this.length === 0) {
      this.head = this.tail = null;
    } else {
      this.head = node.next;
      this.head!.previous = null;
    }

    return node.data;
  }

  /**
   * Removes and returns the first element if the list is not reversed,
   * otherwise removes and returns the last element.
   * @returns The removed element or undefined if the list is empty.
   */
  public shift(): T | undefined {
    return this.isReversed ? this.removeFromLast() : this.removeFromFirst();
  }

  /**
   * Retrieves the node at the given index.
   * @param index The index to retrieve.
   * @returns The node at the given index or null if the index is out of bounds.
   */
  private getNodeAt(index: number): Node<T> | null {
    const actualIndex = this.getActualIndex(index);
    if (actualIndex < 0 || actualIndex >= this.length) return null;

    const midPoint = Math.floor(this.length / 2);
    const shouldStartFromLast = midPoint < index;
    const startFrom = shouldStartFromLast ? this.length - 1 : 0;
    const changeCountBy = shouldStartFromLast ? -1 : 1;
    const prop = shouldStartFromLast ? "previous" : "next";

    let node = shouldStartFromLast ? this.tail : this.head;
    if (!node) return null;

    for (let i = startFrom; i != actualIndex; i += changeCountBy) {
      node = node![prop];
    }

    return node;
  }

  /**
   * Retrieves the data at the given index.
   * @param index The index to retrieve.
   * @returns The data at the given index or undefined if the index is out of bounds.
   */
  public at(index: number): T | undefined {
    return this.getNodeAt(index)?.data;
  }

  /**
   * Converts the list to an array.
   * @returns An array containing all elements of the list.
   */
  public toArray(): Array<T> {
    const array: Array<T> = [];
    let node = this.isReversed ? this.tail : this.head;

    while (node != null) {
      array.push(node.data);
      node = node[this.isReversed ? "previous" : "next"];
    }

    return array;
  }

  /**
   * Converts the list to a string representation.
   * @returns A string representation of the list.
   */
  public toString(): string {
    const array = this.toArray();

    if (array.length === 0) return "null";
    if (array.length === 1) return "null<-" + array[0];

    return "null<-" + array.join("<->") + "->null";
  }

  /**
   * Reverses the order of the list.
   * @returns The current list instance.
   */
  reverse(): this {
    this.isReversed = !this.isReversed;
    return this;
  }

  /**
   * Creates a new list with the results of calling a provided function on every element in the list.
   * @param cb The function to call on each element.
   * @param thisArgs Optional. The value to use as `this` when executing `cb`.
   * @returns A new list with each element being the result of the `cb` function.
   */
  map<U>(
    cb: (value: T, index: number, array?: Array<T>) => U,
    thisArgs: any = null
  ): DoublyLinkedList<U> {
    const doubly = new DoublyLinkedList<U>();
    const array = cb.length === 3 ? this.toArray() : [];
    const boundedCallback = cb.bind(thisArgs);
    let index = 0;

    for (const value of this) {
      doubly.push(boundedCallback(value!, index, array));
      index++;
    }

    return doubly;
  }

  /**
   * Creates a new list with all elements that pass the test implemented by the provided function.
   * @param cb The function to test each element.
   * @param thisArgs Optional. The value to use as `this` when executing `cb`.
   * @returns A new list with the elements that pass the test.
   */
  filter(
    cb: (value: T, index: number, array?: Array<T>) => boolean,
    thisArgs: any = null
  ): DoublyLinkedList<T> {
    const doubly = new DoublyLinkedList<T>();
    const array = cb.length === 3 ? this.toArray() : [];
    const boundedCallback = cb.bind(thisArgs);
    let index = 0;

    for (const value of this) {
      if (boundedCallback(value!, index, array)) doubly.push(value!);
      index++;
    }

    return doubly;
  }

  /**
   * Finds and returns the first element that passes the test implemented by the provided function.
   * @param cb The function to test each element.
   * @param thisArgs Optional. The value to use as `this` when executing `cb`.
   * @returns The first element that passes the test or undefined if no elements pass the test.
   */
  find(
    cb: (value: T, index: number, array?: Array<T>) => boolean,
    thisArgs: any = null
  ): T | undefined {
    const array = cb.length === 3 ? this.toArray() : [];
    const boundedCallback = cb.bind(thisArgs);
    let index = 0;

    for (const value of this) {
      if (boundedCallback(value!, index, array)) return value!;
      index++;
    }

    return undefined;
  }

  /**
   * Tests whether at least one element in the list passes the test implemented by the provided function.
   * @param cb The function to test each element.
   * @param thisArgs Optional. The value to use as `this` when executing `cb`.
   * @returns `true` if at least one element passes the test, otherwise `false`.
   */
  some(
    cb: (value: T, index: number, array?: Array<T>) => boolean,
    thisArgs: any = null
  ): boolean {
    const array = cb.length === 3 ? this.toArray() : [];
    const boundedCallback = cb.bind(thisArgs);
    let index = 0;

    for (const value of this) {
      if (boundedCallback(value!, index, array)) return true;
      index++;
    }

    return false;
  }

  /**
   * Tests whether all elements in the list pass the test implemented by the provided function.
   * @param cb The function to test each element.
   * @param thisArgs Optional. The value to use as `this` when executing `cb`.
   * @returns `true` if all elements pass the test, otherwise `false`.
   */
  every(
    cb: (value: T, index: number, array?: Array<T>) => boolean,
    thisArgs: any = null
  ): boolean {
    const array = cb.length === 3 ? this.toArray() : [];
    const boundedCallback = cb.bind(thisArgs);
    let index = 0;

    for (const value of this) {
      if (!boundedCallback(value!, index, array)) return false;
      index++;
    }

    return true;
  }

  /**
   * Makes the list iterable.
   * @returns An iterator for the list.
   */
  public [Symbol.iterator]() {
    let node = this.isReversed ? this.tail : this.head;
    const isReversed = this.isReversed;

    return {
      next() {
        const value = node?.data;

        if (node == null) return { value: null, done: true };

        node = node[isReversed ? "previous" : "next"];

        return {
          value: value!,
          done: false,
        };
      },
    };
  }
}
