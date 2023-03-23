import { useEffect, useRef, useState } from "react";

export function InputControl() {
  const [inputState, setinputState] = useState(true);
  const [alertState, setAlertState] = useState(false);

  let placeholderText = inputState ? "Insert Text" : "Insert Numbers";
  let inputType = inputState ? "text" : "number";

  const validText = new RegExp("[a-zA-Z]");
  const validNumber = new RegExp("[0-9]");

  const inputRef = useRef();

  const changeAlertState = () => {
    if (!alertState) {
      setAlertState(!alertState);
      setTimeout(() => {
        setAlertState(false);
      }, 4000);
    }
  };

  let alertElement = alertState
    ? `That's not a ${inputState ? "letter!" : "number!"} `
    : "";

  const controlElement = (event) => {
    if (inputState) {
      if (!validText.test(event.key) && event.key !== "Backspace") {
        event.preventDefault();
        changeAlertState();
      }
    } else {
      if (
        !validNumber.test(event.key) &&
        event.key !== "Backspace" &&
        event.key !== "+"
      ) {
        event.preventDefault();
        changeAlertState();
      }
    }
  };

  const handleClick = () => {
    setinputState(!inputState);
    inputRef.current.value = "";
    setAlertState(false);
  };

  return (
    <div style={{ marginLeft: "2rem" }}>
      <form
        style={{
          display: "flex",
          flexDirection: "column",
          marginBottom: "1rem",
        }}
      >
        <label
          htmlFor="inputField"
          style={{ fontWeight: "bold", marginBottom: "1rem" }}
        >
          Put here your {inputType}
        </label>
        <input
          style={{ width: "20rem", height: "2rem" }}
          id="inputField"
          placeholder={placeholderText}
          type={inputType}
          ref={inputRef}
          onKeyDown={controlElement}
        ></input>
      </form>

      <button onClick={handleClick}>
        Click for {inputState ? "number" : "text"} input
      </button>

      <div style={{ color: "red", fontWeight: "bold"}}>{alertElement}</div>
    </div>
  );
}
