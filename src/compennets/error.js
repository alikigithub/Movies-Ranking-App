export default function Errormsg({ msg }) {
  console.log(msg);
  return (
    <h1
      style={{
        textAlign: "center",
      }}
    >
      ⚠ {msg}
    </h1>
  );
}
