import { useEffect, useState } from "react";
export function useLocalstorage(initialValue, key) {
  let [value, setvalue] = useState(function () {
    let getmovie = localStorage.getItem(key);
    return getmovie ? JSON.parse(getmovie) : initialValue;
  });
  useEffect(
    function () {
      localStorage.setItem(key, JSON.stringify(value));
    },
    [value, key]
  );

  return [value, setvalue];
}
