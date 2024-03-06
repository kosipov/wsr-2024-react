import {useState} from "react";

export const Test = (isAdmin) => {
  const [customState, setCustomState] = useState(0);

  const clickHandler = () => {
    setCustomState(customState + 1);
  }

  return (
      <div>
        <span>
          {customState}
        </span>
        <button onClick={clickHandler}>btn</button>
      </div>
  )
}