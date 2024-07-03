import { expect, test } from "bun:test";
import { DoublyLinkedList } from ".";

test("push", () => {
  const array = [1, 2, 3, 4];
  const doubly = new DoublyLinkedList<number>();

  doubly.push(...array);
  expect(doubly.length).toBe(array.length);
  expect(doubly.toArray()).toEqual(array);

  array.reverse();
  array.push(0);
  doubly.reverse().push(0);
  expect(doubly.toArray()).toEqual(array);
});

test("pop", () => {
  const array = [1, 2, 3, 4];
  const doubly = new DoublyLinkedList<number>();

  doubly.push(...array);

  expect(doubly.pop()).toBe(array.pop() as number);
  expect(doubly.toArray()).toEqual(array);
  expect(doubly.length).toBe(array.length);

  doubly.reverse();
  array.reverse();

  expect(doubly.pop()).toBe(array.pop() as number);
  expect(doubly.toArray()).toEqual(array);
  expect(doubly.length).toBe(array.length);

  expect(new DoublyLinkedList().pop()).toBeUndefined();
});

test("unshift", () => {
  const array = [];
  const doubly = new DoublyLinkedList<number>();

  array.unshift(1, 2);
  doubly.unshift(1, 2);
  expect(doubly.toArray()).toEqual(array);
  expect(doubly.length).toEqual(array.length);

  array.reverse();
  doubly.reverse();
  expect(doubly.toArray()).toEqual(array);

  array.unshift(-1, 0);
  doubly.unshift(-1, 0);
  expect(doubly.toArray()).toEqual(array);
  expect(doubly.length).toEqual(array.length);

  array.reverse();
  doubly.reverse();
  expect(doubly.toArray()).toEqual(array);
});

test("shift", () => {
  const array = [1, 2, 3, 4];
  const doubly = new DoublyLinkedList<number>();

  doubly.push(...array);

  expect(doubly.shift()).toBe(array.shift() as number);
  expect(doubly.toArray()).toEqual(array);
  expect(doubly.length).toBe(array.length);

  doubly.reverse();
  array.reverse();

  expect(doubly.shift()).toBe(array.shift() as number);
  expect(doubly.toArray()).toEqual(array);
  expect(doubly.length).toBe(array.length);

  expect(new DoublyLinkedList().shift()).toBeUndefined();
});

test("reverse", () => {
  const array = [1, 2, 3, 4];
  const doubly = new DoublyLinkedList<number>();

  doubly.push(...array);
  expect(doubly.reverse().toArray()).toEqual(array.toReversed());
  expect(doubly.reverse().toArray()).toEqual(array);
  expect(doubly.length).toBe(array.length);
});

test("at", () => {
  const doubly = new DoublyLinkedList<number>();

  expect(doubly.at(0)).toBeUndefined();

  doubly.push(1, 2, 3, 4);
  expect(doubly.at(0)).toBe(1);
  expect(doubly.at(1)).toBe(2);
  expect(doubly.at(2)).toBe(3);
  expect(doubly.at(3)).toBe(4);
  expect(doubly.at(4)).toBeUndefined();

  doubly.reverse();
  expect(doubly.at(0)).toBe(4);
  expect(doubly.at(1)).toBe(3);
  expect(doubly.at(-1)).toBe(1);
  expect(doubly.at(-2)).toBe(2);
  expect(doubly.at(-5)).toBeUndefined();
});

test("toString", () => {
  const doubly = new DoublyLinkedList();

  expect(doubly.toString()).toBe("null");

  doubly.push(1);
  expect(doubly.toString()).toBe("null<-1");

  doubly.push(2);
  expect(doubly.toString()).toBe("null<-1<->2->null");

  doubly.push(3);
  expect(doubly.toString()).toBe("null<-1<->2<->3->null");
});

test("length", () => {
  const doubly = new DoublyLinkedList<number>();
  expect(doubly.length).toBe(0);

  doubly.push(1);
  expect(doubly.length).toBe(1);

  doubly.push(2, 3, 4, 5);
  expect(doubly.length).toBe(5);
});

test("map", () => {
  const array = [1, 2, 3];
  const double = (n: number) => n * 2;
  const list = new DoublyLinkedList<number>();

  list.push(...array);

  const doubledArray = array.map(double);
  const doubledList = list.map(double);

  expect(doubledList.toArray()).toEqual(doubledArray);

  doubledList.reverse();
  doubledArray.reverse();
  expect(list.toArray()).toEqual(array);

  expect(doubledList.toArray()).toEqual(doubledArray);
});

test("filter", () => {
  const array = [1, 2, 3];
  const isEven = (n: number) => n % 2 === 0;
  const list = new DoublyLinkedList<number>();

  list.push(...array);

  const filteredArray = array.filter(isEven);
  const filteredList = list.filter(isEven);

  expect(filteredList.toArray()).toEqual(filteredArray);

  filteredList.reverse();
  filteredArray.reverse();
  expect(list.toArray()).toEqual(array);

  expect(filteredList.toArray()).toEqual(filteredArray);
});

test("find", () => {
  const array = [1, 2, 3, 4];
  const isEven = (n: number) => n % 2 === 0;
  const isGreaterThanThree = (n: number) => n > 3;
  const list = new DoublyLinkedList<number>();

  list.push(...array);

  expect(list.find(isEven)).toBe(2);

  expect(list.find(isGreaterThanThree)).toBe(4);

  const isGreaterThanFour = (n: number) => n > 4;
  expect(list.find(isGreaterThanFour)).toBeUndefined();

  list.reverse();
  expect(list.find(isEven)).toBe(4);

  const emptyList = new DoublyLinkedList<number>();
  expect(emptyList.find(isEven)).toBeUndefined();
});

test("some", () => {
  const list = new DoublyLinkedList<number>();

  expect(list.some((n) => n > 0)).toBe(false);

  list.push(1, 2, 3, 4);

  expect(list.some((n) => n % 2 === 0)).toBe(true); // Checks for even numbers

  expect(list.some((n) => n > 4)).toBe(false);

  list.reverse();
  expect(list.some((n) => n % 2 === 0)).toBe(true);
  expect(list.some((n) => n > 4)).toBe(false);
});

test("every", () => {
  const list = new DoublyLinkedList<number>();

  expect(list.every((n) => n > 0)).toBe(true); // Vacuously true

  list.push(1, 2, 3, 4);

  expect(list.every((n) => n > 0)).toBe(true);

  expect(list.every((n) => n % 2 === 0)).toBe(false); // Not all elements are even

  expect(list.every((n) => n < 5)).toBe(true);

  list.reverse();
  expect(list.every((n) => n > 0)).toBe(true);
  expect(list.every((n) => n % 2 === 0)).toBe(false);
});

test("includes", () => {
  const list = new DoublyLinkedList<number>();

  expect(list.includes(1)).toBe(false);

  list.push(1, 2, 3, 4);

  expect(list.includes(1)).toBe(true);
  expect(list.includes(2)).toBe(true);
  expect(list.includes(3)).toBe(true);
  expect(list.includes(4)).toBe(true);

  expect(list.includes(5)).toBe(false);

  list.reverse();
  expect(list.includes(1)).toBe(true);
  expect(list.includes(2)).toBe(true);
  expect(list.includes(3)).toBe(true);
  expect(list.includes(4)).toBe(true);
});

test("slice", () => {
  const list = new DoublyLinkedList<number>();
  const array: Array<number> = [];

  expect(list.slice(0, 0).toArray()).toEqual(array.slice(0, 0));
  expect(list.slice(1, 1).toArray()).toEqual(array.slice(1, 1));

  list.push(1, 2, 3, 4);
  array.push(1, 2, 3, 4);

  expect(list.slice(0, 1).toArray()).toEqual(array.slice(0, 1));
  expect(list.slice(0, 2).toArray()).toEqual(array.slice(0, 2));
  expect(list.slice(0, 3).toArray()).toEqual(array.slice(0, 3));
  expect(list.slice(0, 5).toArray()).toEqual(array.slice(0, 4));

  array.reverse();
  list.reverse();

  expect(list.slice(-1, 0).toArray()).toEqual(array.slice(-1, 0));
  expect(list.slice(-3, 0).toArray()).toEqual(array.slice(-3, 0));
  expect(list.slice(-5, 0).toArray()).toEqual(array.slice(-5, 0));

  array.reverse();
  list.reverse();

  expect(list.slice(-1, 1).toArray()).toEqual(array.slice(-1, 1));
  expect(list.slice(-4, 4).toArray()).toEqual(array.slice(-4, 4));
  expect(list.slice(-5, 5).toArray()).toEqual(array.slice(-5, 5));

  array.reverse();
  list.reverse();

  expect(list.slice(-2, 1).toArray()).toEqual(array.slice(-2, 1));
  expect(list.slice(-3, 2).toArray()).toEqual(array.slice(-3, 2));

  array.reverse();
  list.reverse();

  expect(list.slice(-3, -1).toArray()).toEqual(array.slice(-3, -1));
  expect(list.slice(-4, -2).toArray()).toEqual(array.slice(-4, -2));
  expect(list.slice(-5, -3).toArray()).toEqual(array.slice(-5, -3));
});
