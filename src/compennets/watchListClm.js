import WatchListData from "./WatchListItems";

export default function WatchList({ watchlist, removewatch }) {
  return (
    <>
      <WatchListData
        moviedata={watchlist}
        key={watchlist.imdbID}
        removewatch={removewatch}
      />
    </>
  );
}
