import React from "react";

export default function NewTransaction() {
  return (
    <div style={styles.filter}>
      <button className="waves-effect waves-light btn" style={styles.button}>
        + NOVO LANÇAMENTO
      </button>
      <input style={styles.input} type="text" />
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
