function average(arrayvalues) {
  let lenghtofValue = +arrayvalues.length;

  Number(arrayvalues);
  let reducevalue = Number(
    arrayvalues.reduce((storge, current) => {
      return storge + current;
    }, 0)
  );

  return +reducevalue / +lenghtofValue;
}
export default function WatchSummary({ watchMovie }) {
  let movieWatchTime = average(watchMovie.map((time) => Number(time.runtime)));

  let userRating = average(
    watchMovie.map((rating) => Number(rating.userRating))
  );
  let imdbRating = average(
    watchMovie.map((rating) => Number(rating.imdbRating))
  );
  return (
    <div className="summarywatch">
      <h2>MOVIE YOU WATCHED</h2>
      <div className="watchStatistics">
        <p>
          {" "}
          🔢 {watchMovie.length > 0 ? watchMovie.length : "No Movie Added"}{" "}
          Movies
        </p>
        <p>
          {" "}
          {watchMovie.length > 0
            ? `⭐${Number(imdbRating.toFixed(1))}`
            : " ⭐No imdbRaiting"}
        </p>
        <p>
          {" "}
          {watchMovie.length > 0
            ? `🌟 ${userRating.toFixed(1)}`
            : " ⭐No UserRaiting"}{" "}
        </p>
        <p>{movieWatchTime ? `⏳${movieWatchTime}min` : " "}</p>
      </div>
    </div>
  );
}
