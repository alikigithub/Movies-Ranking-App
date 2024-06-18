import { useState } from "react";
export default function Box({ children }) {
  let [isopen, setisopen] = useState(true);
  return (
    <div className="box">
      <button
        className="openbtn"
        onClick={() => setisopen((isopen) => !isopen)}
      >
        {isopen ? "+" : "-"}
      </button>
      {isopen && <> {children} </>}
    </div>
  );
}
