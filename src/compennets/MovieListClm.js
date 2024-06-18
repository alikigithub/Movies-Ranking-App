import List from "./MovieListItems";
import { useEffect } from "react";
export default function MovieList({ movielist, setimdbrating }) {
  useEffect(
    function () {
      if (movielist.length <= 0) {
        setimdbrating(null);
      }
    },
    [movielist, setimdbrating]
  );
  return (
    <div className="movielist">
      <List listMovie={movielist} setimdbrating={setimdbrating} />
    </div>
  );
}
