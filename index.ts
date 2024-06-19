class Node<T> {
  constructor(
    public data: T,
    public previous: Node<T> | null = null,
    public next: Node<T> | null = null
  ) {}
}

export class DoublyLinkedList<T> {
  private head: Node<T> | null = null;
  private tail: Node<T> | null = null;

  private isReversed: boolean = false;

  public length: number = 0;

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

  private getActualIndex(index: number): number {
    const positiveIndex = index < 0 ? this.length + index : index;

    if (!this.isReversed) return positiveIndex;

    return this.length - 1 - positiveIndex;
  }

  public push(...data: Array<T>): number {
    const insert = this.isReversed
      ? this.insertAtFirst.bind(this)
      : this.insertAtLast.bind(this);

    for (let i = 0; i < data.length; i++) {
      insert(data[i]);
    }

    return this.length;
  }

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
  public pop(): T | undefined {
    return this.isReversed ? this.removeFromFirst() : this.removeFromLast();
  }

  public unshift(...data: Array<T>): number {
    const insert = this.isReversed
      ? this.insertAtLast.bind(this)
      : this.insertAtFirst.bind(this);

    for (let i = data.length - 1; i !== -1; i--) {
      insert(data[i]);
    }

    return this.length;
  }

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

  public shift(): T | undefined {
    return this.isReversed ? this.removeFromLast() : this.removeFromFirst();
  }

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

  public at(index: number): T | undefined {
    return this.getNodeAt(index)?.data;
  }

  public toArray(): Array<T> {
    const array: Array<T> = [];
    let node = this.isReversed ? this.tail : this.head;

    while (node != null) {
      array.push(node.data);
      node = node[this.isReversed ? "previous" : "next"];
    }

    return array;
  }

  public toString(): string {
    const array = this.toArray();

    if (array.length === 0) return "null";
    if (array.length === 1) return "null<-" + array[0];

    return "null<-" + array.join("<->") + "->null";
  }

  reverse(): this {
    this.isReversed = !this.isReversed;
    return this;
  }

  map<U>(
    cb: (value: T, index: number, array?: Array<T>) => U,
    thisArgs: any = null
  ): DoublyLinkedList<U> {
    const doubly = new DoublyLinkedList<U>();
    const array = cb.length === 3 ? this.toArray() : [];
    const boundedCallback = cb.bind(thisArgs)
    let index = 0;
    
    for (const value of this) {
      doubly.push(boundedCallback(value!, index, array));
      index++;
    }

    return doubly;
  }

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
