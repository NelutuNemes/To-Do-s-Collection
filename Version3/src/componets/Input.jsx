import React, { useState } from "react";

function Input(props) {
  const [userInput, setUserInput] = useState("");
  function changeHandler(e) {
    const userTypedValue = e.target.value;
    setUserInput(userTypedValue);
  }
  return (
    <div className="form">
      <input onChange={changeHandler} type="text" value={userInput} />
      <button
        onClick={() => {
          props.addItem(userInput);
          setUserInput("");
        }}
      >
        <span>Add task</span>
      </button>
    </div>
  );
}

export default Input;
