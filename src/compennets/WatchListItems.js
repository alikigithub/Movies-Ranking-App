export default function WatchListData({ moviedata, removewatch }) {
  return moviedata.map((listItem) => (
    <div key={listItem.imdbID} className="List">
      <img src={listItem.Poster} alt="not found" />
      <div className="List-text">
        <h3>{listItem.Title}</h3>
        <span>⭐{listItem.imdbRating}</span>
        <span>🌟{listItem.userRating}</span>
        <span>
          {listItem.runtime !== undefined ? `"⏳"${listItem.runtime} "m"` : " "}
        </span>
      </div>
      <button className="btnclose" onClick={() => removewatch(listItem.imdbID)}>
        {" "}
        x
      </button>
    </div>
  ));
}
