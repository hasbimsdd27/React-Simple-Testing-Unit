import React from "react";
import Counter from "../Counter";
import { render, fireEvent, cleanup } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";

let getByTestId;

beforeEach(() => {
  const component = render(<Counter />);
  getByTestId = component.getByTestId;
});

afterEach(() => {
  cleanup();
});

test("header renders witch correct text", () => {
  const headerEl = getByTestId("header");
  expect(headerEl.textContent).toBe("My Counter");
});

test("Counter initially start with text of 0", () => {
  const counterEl = getByTestId("counter");
  expect(counterEl.textContent).toBe("0");
});

test("input contain initial value of 1", () => {
  const inputEl = getByTestId("input");
  expect(inputEl.value).toBe("1");
});

test("add button renders with +", () => {
  const addBtn = getByTestId("add-btn");
  expect(addBtn.textContent).toBe("+");
});

test("substract button renders with -", () => {
  const subtractBtn = getByTestId("substract-btn");
  expect(subtractBtn.textContent).toBe("-");
});

test("change value of input works correctly", () => {
  const inputEl = getByTestId("input");

  expect(inputEl.value).toBe("1");

  fireEvent.change(inputEl, {
    target: {
      value: "5",
    },
  });

  expect(inputEl.value).toBe("5");
});

test("clicking on plus button adds 1 to the counter", () => {
  const btnEl = getByTestId("add-btn");
  const counterEl = getByTestId("counter");
  fireEvent.click(btnEl);
  expect(counterEl.textContent).toBe("1");
});

test("clicking on substract button substracts 1 to the counter", () => {
  const btnEl = getByTestId("substract-btn");
  const counterEl = getByTestId("counter");
  fireEvent.click(btnEl);
  expect(counterEl.textContent).toBe("-1");
});

test("changing input value then clicking on plus button works correctly", () => {
  const btnEl = getByTestId("add-btn");
  const counterEl = getByTestId("counter");
  const inputEl = getByTestId("input");

  fireEvent.change(inputEl, { target: { value: "5" } });
  fireEvent.click(btnEl);
  expect(counterEl.textContent).toBe("5");
});

test("changing input value then clicking on subtract button works correctly", () => {
  const btnEl = getByTestId("substract-btn");
  const counterEl = getByTestId("counter");
  const inputEl = getByTestId("input");

  fireEvent.change(inputEl, { target: { value: "5" } });
  fireEvent.click(btnEl);
  expect(counterEl.textContent).toBe("-5");
});

test("adding and then subtracting leads to the correct number", () => {
  const addBtnEl = getByTestId("add-btn");
  const subtractBtnEl = getByTestId("substract-btn");
  const counterEl = getByTestId("counter");
  const inputEl = getByTestId("input");

  fireEvent.change(inputEl, { target: { value: "10" } });

  fireEvent.click(addBtnEl);
  fireEvent.click(addBtnEl);
  fireEvent.click(addBtnEl);
  fireEvent.click(addBtnEl);
  fireEvent.click(subtractBtnEl);
  fireEvent.click(subtractBtnEl);

  expect(counterEl.textContent).toBe("20");

  fireEvent.change(inputEl, { target: { value: "5" } });

  fireEvent.click(addBtnEl);
  fireEvent.click(subtractBtnEl);
  fireEvent.click(subtractBtnEl);

  expect(counterEl.textContent).toBe("15");
});

test("counter contains correct className", () => {
  const addBtnEl = getByTestId("add-btn");
  const subtractBtnEl = getByTestId("substract-btn");
  const counterEl = getByTestId("counter");
  const inputEl = getByTestId("input");

  expect(counterEl.className).toBe("");

  fireEvent.change(inputEl, { target: { value: "50" } });
  fireEvent.click(addBtnEl);
  expect(counterEl.className).toBe("");
  fireEvent.click(addBtnEl);
  expect(counterEl.className).toBe("green");
  fireEvent.click(addBtnEl);
  expect(counterEl.className).toBe("green");

  fireEvent.click(subtractBtnEl);
  fireEvent.click(subtractBtnEl);
  expect(counterEl.className).toBe("");

  fireEvent.click(subtractBtnEl);
  fireEvent.click(subtractBtnEl);
  fireEvent.click(subtractBtnEl);
  fireEvent.click(subtractBtnEl);
  expect(counterEl.className).toBe("red");
});
