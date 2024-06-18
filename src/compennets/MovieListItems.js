export default function List({ listMovie, setimdbrating }) {
  return listMovie.map((listItem) => (
    <div
      role="button"
      className="List"
      key={listItem.imdbID}
      onClick={() => {
        setimdbrating((id) =>
          id === listItem.imdbID ? null : listItem.imdbID
        );
      }}
    >
      <img src={listItem.Poster} alt="not found" />
      <div className="List-text">
        <h3>{listItem.Title}</h3>
        <p>📅 {listItem.Year}</p>
      </div>
    </div>
  ));
}
