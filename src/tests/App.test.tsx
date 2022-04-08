import React from "react";
import { render, screen } from "@testing-library/react";
import ReactDOM from "react-dom";
import { act } from "react-dom/test-utils";
import App from "../App";
import Result from "../components/Result"

let container: any;

beforeEach(() => {
  container = document.createElement("div");
  document.body.appendChild(container);
});

test("renders have calculatrice", () => {
  const { container } = render(<App />);
  const title = screen.getByText(/calculatrice/i);
  expect(title).toBeInTheDocument();
  expect(container.getElementsByClassName("touch").length).toBe(16);
});

test("test addition fonctional", () => {
  act(() => {
    ReactDOM.render(<App />, container);
  });
  const button1 = container.querySelector(".touch[data-value='1']");
  const button2 = container.querySelector(".touch[data-value='2']");
  const buttonPlus = container.querySelector(".touch[data-value='+']");
  const buttonEqual = container.querySelector(".touch[data-value='=']");
  const label = container.querySelector(".result");
  act(() => {
    button1.dispatchEvent(new MouseEvent("click", { bubbles: true }));
  });
  act(() => {
    button2.dispatchEvent(new MouseEvent("click", { bubbles: true }));
  });
  act(() => {
    buttonPlus.dispatchEvent(new MouseEvent("click", { bubbles: true }));
  });
  act(() => {
    button1.dispatchEvent(new MouseEvent("click", { bubbles: true }));
  });
  act(() => {
    button2.dispatchEvent(new MouseEvent("click", { bubbles: true }));
  });
  act(() => {
    buttonEqual.dispatchEvent(new MouseEvent("click", { bubbles: true }));
  });

  expect(label.textContent).toBe(Number(12 + 12).toString());
});

test("Test Substraction", () => {
  act(() => {
      ReactDOM.render(<App />, container)
  });
  const button1 = container.querySelector(".touch[data-value='5']");
  const button2 = container.querySelector(".touch[data-value='2']");
  const buttonMinus = container.querySelector(".touch[data-value='-']");
  const buttonEqual = container.querySelector(".touch[data-value='=']");
  const label = container.querySelector(".result");
  act(() => {
      button1.dispatchEvent(new MouseEvent("click", { bubbles: true }));
    });
    act(() => {
      buttonMinus.dispatchEvent(new MouseEvent("click", { bubbles: true }));
    });
    act(() => {
      button2.dispatchEvent(new MouseEvent("click", { bubbles: true }));
    });
    act(() => {
      buttonEqual.dispatchEvent(new MouseEvent("click", { bubbles: true }));
    });
  
    expect(label.textContent).toBe(Number(5 - 2).toString());
});

test("Test Square", () => {
  act(() => {
      ReactDOM.render(<App />, container)
  });
  const button1 = container.querySelector(".touch[data-value='5']");
  const buttonSquare = container.querySelector(".touch[data-value='√x']");
  const buttonEqual = container.querySelector(".touch[data-value='=']");
  const label = container.querySelector(".result");
 
  act(() => {
      button1.dispatchEvent(new MouseEvent("click", { bubbles: true }));
    });
  act(() => {
    buttonSquare.dispatchEvent(new MouseEvent("click", { bubbles: true }));
  });
  act(() => {
    buttonEqual.dispatchEvent(new MouseEvent("click", { bubbles: true }));
  });
  
    expect(label.textContent).toBe(Number(5 * 5).toString());
});

test("Result", () =>{
  act(() => {
    ReactDOM.render(<Result value={"10"}/>, container)
  });

  const label = container.querySelector(".result");

  expect(label.textContent).toBe("10");
});