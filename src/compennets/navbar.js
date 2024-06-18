import { useRef } from "react";
import { useKey } from "./usekey";

export default function Navbar({ children }) {
  return (
    <div className="navbar">
      <Logo />
      {children}
    </div>
  );
}
function Logo() {
  return (
    <div className="logo">
      <span>🍿</span>
      <h1>UsePopcorn</h1>
    </div>
  );
}
export function Search({ moviename, setmoviename }) {
  let inputEl = useRef(null);

  // let enterfun = (e) => {
  //   if (document.activeElement === inputEl.current) return;
  //   if (e.code === "Enter") {
  //     inputEl.current.focus();
  //     setmoviename("");
  //   }
  // };

  useKey("enter", function () {
    if (document.activeElement === inputEl.current) return;
    inputEl.current.focus();
    setmoviename("");
  });
  return (
    <div className="search">
      <input
        type="text"
        placeholder="Search bar"
        value={moviename}
        onChange={(e) => setmoviename(e.target.value)}
        ref={inputEl}
      />
    </div>
  );
}
export function NumberResult({ movielist }) {
  return (
    <p className="numresult">
      Found <span>{movielist.length}</span> Result
    </p>
  );
}
