import MainBox from "./compennets/main";
import WatchList from "./compennets/watchListClm";
import Box from "./compennets/BoxTemplate";
import MovieList from "./compennets/MovieListClm";
import Navbar, { NumberResult, Search } from "./compennets/navbar";
import { useEffect, useState } from "react";
import Loading from "./compennets/Loading";
import Errormsg from "./compennets/error";
import DetailMovie from "./compennets/DetailMovie";
import WatchSummary from "./compennets/watchclmHead";
import { useLocalstorage } from "./compennets/localstorage";

let keyvalue = "66b60232";

function App() {
  let [listMovie, setlistMovie] = useState([]);

  let [isloading, setisloading] = useState(true);
  let [errorm, seterrorm] = useState("");
  let [moviename, setmoviename] = useState([]);
  let [imdbrating, setimdbrating] = useState(null);

  let [watchMovie, setwatchMovie] = useLocalstorage([], "watched");
  let watchmoviefun = (movie) => {
    let addornot = watchMovie.filter((match) => match.imdbID === movie.imdbID);

    addornot.length > 0
      ? setwatchMovie([...watchMovie])
      : setwatchMovie([...watchMovie, movie]);
  };
  let removewatch = (id) => {
    setwatchMovie((watchmovie) =>
      watchmovie.filter((movie) => movie.imdbID !== id)
    );
  };
  let moviedetailclose = () => {
    setimdbrating(null);
  };
  useEffect(
    function () {
      let controler = new AbortController();

      async function moviedata() {
        if (moviename.length < 3) {
          seterrorm("");
          setlistMovie([]);
          setisloading(false);
          return;
        }
        try {
          seterrorm("");
          let data = await fetch(
            `http://www.omdbapi.com/?apikey=${keyvalue}&s=${moviename}`,
            { signal: controler.signal }
          );
          if (!data.ok) {
            throw new Error(" Not Able to fecth data");
          }
          let convertData = await data.json();

          if (convertData.Response === "False") {
            throw new Error("Sorry movie not found");
          } else {
            setlistMovie(convertData.Search);
          }
        } catch (err) {
          if (err.name !== "AbortError") {
            seterrorm(err.message);
          }
        } finally {
          setisloading(false);
        }
      }

      moviedata();
      return function () {
        controler.abort();
      };
    },
    [moviename]
  );
  return (
    <>
      <Navbar>
        <Search moviename={moviename} setmoviename={setmoviename} />
        <NumberResult movielist={listMovie} />
      </Navbar>

      <MainBox>
        <Box>
          {isloading && <Loading />}
          {!isloading && !errorm && (
            <MovieList
              movielist={listMovie}
              setimdbrating={setimdbrating}
              imdbrating={imdbrating}
            />
          )}
          {!isloading && errorm && <Errormsg msg={errorm} />}
        </Box>
        <Box>
          {imdbrating ? (
            <DetailMovie
              imdbrating={imdbrating}
              setimdbrating={setimdbrating}
              watchmoviefun={watchmoviefun}
              watchMovie={watchMovie}
              moviedetailclose={moviedetailclose}
            />
          ) : (
            <>
              <WatchSummary watchMovie={watchMovie} />
              <WatchList watchlist={watchMovie} removewatch={removewatch} />
            </>
          )}
        </Box>
      </MainBox>
    </>
  );
}
export default App;
