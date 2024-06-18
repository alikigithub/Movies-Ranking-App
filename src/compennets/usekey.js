import { useEffect } from "react";
export function useKey(valueE, action) {
  useEffect(
    function () {
      function callback(e) {
        if (e.code.toLowerCase() === valueE.toLowerCase()) {
          action();
        }
      }
      document.addEventListener("keydown", callback);
      return function () {
        document.removeEventListener("keydown", callback);
      };
    },
    [valueE, action]
  );
}
