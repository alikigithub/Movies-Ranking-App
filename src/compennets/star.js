import { useState } from "react";

export default function Star({
  lengthofStat = 5,
  arrayofnames = [],
  setstarstare,
}) {
  let color = "#fcc419";
  let high = "20px";
  let [starrank, setstarrank] = useState(0);
  let [temstarrank, settemstarrank] = useState(0);
  setstarstare(starrank);
  let star = {
    display: "flex",
    gap: 3.0,
    position: "relative",

    justifyContent: "center",
    alignItems: "center",
    marginBottom: "1rem",
  };
  let mainstar = {
    display: "flex",
    justifyContent: "center",

    position: "relative",
  };
  let numbervalueStar = {
    position: "relative",
  };
  return (
    <div style={mainstar}>
      <div style={star}>
        {Array.from({ length: lengthofStat }, (_, i) => (
          <Raiting
            key={i}
            color={color}
            high={high}
            setstarrank={setstarrank}
            rank={i + 1}
            starrank={starrank}
            settemstarrank={settemstarrank}
            temstarrank={temstarrank}
          />
        ))}
      </div>
      <div style={numbervalueStar}>
        <p style={{ position: "absolute" }}>
          {arrayofnames.length === lengthofStat
            ? arrayofnames[temstarrank ? temstarrank - 1 : starrank - 1]
            : temstarrank || starrank || " "}
        </p>
      </div>
    </div>
  );
}

export function Raiting({
  key,
  color,
  high,
  setstarrank,
  rank,
  starrank,
  settemstarrank,
  temstarrank,
}) {
  let starstyle = {
    height: "30px",
  };

  let full = temstarrank ? temstarrank > rank - 1 : starrank > rank - 1;

  return (
    <div
      role="button"
      onClick={() => setstarrank(rank)}
      onMouseEnter={() => settemstarrank(rank)}
      onMouseLeave={() => settemstarrank(0)}
    >
      {full ? (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 20 20"
          fill={color}
          stroke={color}
          height={high}
        >
          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
        </svg>
      ) : (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke={color}
          height={high}
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="{2}"
            d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z"
          />
        </svg>
      )}
    </div>
  );
}
