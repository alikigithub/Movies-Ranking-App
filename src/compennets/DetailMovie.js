import { useEffect, useRef, useState } from "react";
import Star from "./star";
import { useKey } from "./usekey";

export default function DetailMovie({
  imdbrating,
  setimdbrating,
  watchmoviefun,
  watchMovie,
  moviedetailclose,
}) {
  let [detaildata, setdetaildata] = useState([]);
  let [loading, setloading] = useState();
  let [errorcheck, seterrorcheck] = useState();
  let [starstare, setstarstare] = useState(0);
  let countsRatiting = useRef(0);
  let watahlistData = (id) => {
    let sentdata = {
      imdbID: imdbrating,
      Title: id.Title,
      Year: id.Year,
      Poster: id.Poster,
      runtime: id.runtime,
      imdbRating: id.imdbRating,
      userRating: starstare,
    };

    watchmoviefun(sentdata);
  };
  let watched = watchMovie.find(
    (moviematch) => moviematch.imdbID === detaildata.imdbID
  );
  useKey("escape", moviedetailclose);
  useEffect(
    function () {
      countsRatiting.current++;
    },
    [starstare]
  );

  useEffect(
    function () {
      async function detailmoviecall() {
        setloading(true);
        try {
          let data1 = await fetch(
            `http://www.omdbapi.com/?apikey=66b60232&i=${imdbrating}`
          );

          if (!data1.ok || data1.status !== 200) {
            throw new Error("Api not fatching the detail of the movie");
          } else {
            let dataconvert = await data1.json();
            if (dataconvert.Response === "False") {
              throw new Error("Api not fatching the detail of the movie");
            }

            setdetaildata(dataconvert);
          }
        } catch (err) {
          seterrorcheck(err.message);
        } finally {
          setloading(false);
        }
      }
      detailmoviecall();
    },
    [imdbrating]
  );
  useEffect(
    function () {
      document.title = `Movie | ${detaildata.Title}`;
      return function () {
        document.title = "Popcorn";
      };
    },
    [detaildata.Title]
  );

  return errorcheck ? (
    <div
      style={{
        textAlign: "center",
      }}
    >
      <h1> {errorcheck}</h1>
    </div>
  ) : loading === false ? (
    detaildata.length !== 0 && (
      <div className="maindetail">
        <button onClick={() => setimdbrating(null)} className="detailBtn">
          <span>⬅</span>
        </button>
        <div className="posterclass">
          <img src={detaildata.Poster} alt="not found" />
          <div className="posterData">
            <h1>{detaildata.Title}</h1>
            <p>{detaildata.Released}</p>
            <p>{detaildata.Runtime}</p>
            <p>{detaildata.Genre}</p>
            <p>⭐{detaildata.imdbRating} IMDb Rating</p>
          </div>
        </div>
        <div className="starclass">
          <div className="stardec">
            {watched ? (
              `You Already Rated this movie:${watched.userRating} `
            ) : (
              <Star setstarstare={setstarstare} lengthofStat={10} />
            )}

            {starstare > 0 && (
              <button
                className="addbtn"
                onClick={() => {
                  watahlistData(detaildata);
                  setimdbrating(null);
                }}
              >
                Add to list
              </button>
            )}
          </div>
          <div className="starclassData">
            <p>{detaildata.Plot}</p>
            <p> Starring {detaildata.Actors}</p>
            <p> Directed By {detaildata.Director}</p>
          </div>
        </div>
      </div>
    )
  ) : (
    <div>
      <h1>Loading...</h1>
    </div>
  );
}
