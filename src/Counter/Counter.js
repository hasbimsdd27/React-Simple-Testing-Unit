import React, { useState } from "react";
import "./Counter.css";

export default function Counter() {
  const [counterValue, setCounterValue] = useState(0);
  const [inputValue, setInputValue] = useState(1);
  return (
    <div>
      <h3 data-testid="header">My Counter</h3>
      <h2
        data-testid="counter"
        className={
          counterValue >= 100 ? "green" : counterValue <= -100 ? "red" : ""
        }
      >
        {counterValue}
      </h2>
      <button
        data-testid="substract-btn"
        onClick={() => setCounterValue((prev) => (prev -= inputValue))}
      >
        -
      </button>
      <input
        data-testid="input"
        type="number"
        value={inputValue}
        onChange={(e) => setInputValue(parseInt(e.target.value))}
        className="text-center"
      />
      <button
        data-testid="add-btn"
        onClick={() => setCounterValue((prev) => (prev += inputValue))}
      >
        +
      </button>
    </div>
  );
}
