import React from "react";

export default function NewTransaction({ handleFilter, handleNewTransaction }) {
  const handleInput = (event) => {
    handleFilter(event.target.value);
  };

  const handleClick = () => {
    console.log("click");
    handleNewTransaction("opa");
  };

  return (
    <div style={styles.filter}>
      <button
        className="waves-light btn-small"
        style={styles.button}
        onClick={handleClick}
      >
        + NOVO LANÇAMENTO
      </button>
      <input
        style={styles.input}
        type="text"
        placeholder="Filtro"
        onChange={handleInput}
      />
    </div>
  );
}

const styles = {
  filter: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
  },
  input: {
    width: "730px",
    margin: "10px",
  },
  button: {
    marginTop: "20px",
  },
};
