import React from "react";

export default function Transactions({
  transactions,
  lengthTransaction,
  profit,
  expense,
  balance,
}) {
  console.log(transactions);

  return (
    <div>
      <div style={styles.resume}>
        <div style={{ width: "30%" }}>Lançamentos: {lengthTransaction}</div>
        <div style={{ width: "30%" }}>
          Receitas:{" "}
          <span style={styles.moneyColorPositive}>R$ {profit.toFixed(2)}</span>
        </div>
        <div style={{ width: "30%" }}>
          Despesas:{" "}
          <span style={styles.moneyColorNegative}>R$ {expense.toFixed(2)}</span>
        </div>
        <div style={{ width: "30%" }}>
          Saldo:{" "}
          <span
            style={
              balance >= 0
                ? styles.moneyColorPositive
                : styles.moneyColorNegative
            }
          >
            R$ {balance.toFixed(2)}
          </span>
        </div>
      </div>
      <div>
        <table style={styles.table} className="centered">
          <thead>
            <tr>
              <th>Dia</th>
              <th>Categoria</th>
              <th>Descrição</th>
              <th>Valor</th>
              <th>Editar</th>
              <th>Excluir</th>
            </tr>
          </thead>
          <tbody>
            {transactions.map(
              ({
                category,
                day,
                description,
                month,
                type,
                value,
                year,
                yearMonth,
                yearMonthDay,
                _id,
              }) => {
                return (
                  <tr
                    key={_id}
                    style={type === "-" ? styles.expense : styles.profit}
                  >
                    <td>{day}</td>
                    <td>{category}</td>
                    <td>{description}</td>
                    <td>R$ {value.toFixed(2)}</td>
                    <td>
                      <span
                        className="material-icons"
                        style={{ cursor: "pointer" }}
                      >
                        edit
                      </span>
                    </td>
                    <td>
                      <span
                        className="material-icons"
                        style={{ cursor: "pointer" }}
                      >
                        delete
                      </span>
                    </td>
                  </tr>
                );
              }
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

const styles = {
  expense: {
    backgroundColor: "#FE7E7E",
  },
  profit: {
    backgroundColor: "#7fffd4",
  },
  table: {
    border: "1px solid lightgrey",
    borderRadius: "10px",
  },
  resume: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
    padding: "15px",
    marging: "15px",
    border: "1px solid lightgrey",
  },
  moneyColorPositive: {
    fontWeight: "bold",
    color: "#7fffd4",
  },
  moneyColorNegative: {
    fontWeight: "bold",
    color: "#FE7E7E",
  },
};
