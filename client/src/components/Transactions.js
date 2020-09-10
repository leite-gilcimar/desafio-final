import React from "react";
import Action from "./Action";

export default function Transactions({
  transactions,
  lengthTransaction,
  profit,
  expense,
  balance,
  onPersist,
}) {
  console.log(transactions);

  const handleActionClick = (id, type) => {
    const findTransaction = transactions.find((transaction) => {
      return transaction._id === id;
    });
    onPersist(findTransaction);
    //console.log(findTransaction);
  };

  const formatMonetary = new Intl.NumberFormat("pt-BR", {
    minimumFractionDigits: 2,
  });

  return (
    <div>
      <div style={styles.resume}>
        <div style={{ width: "30%" }}>Lançamentos: {lengthTransaction}</div>
        <div style={{ width: "30%" }}>
          Receitas:{" "}
          <span style={styles.moneyColorPositive}>
            R$ {formatMonetary.format(profit)}
          </span>
        </div>
        <div style={{ width: "30%" }}>
          Despesas:{" "}
          <span style={styles.moneyColorNegative}>
            R$ {formatMonetary.format(expense)}
          </span>
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
            R$ {formatMonetary.format(balance)}
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
                    <td>R$ {formatMonetary.format(value)}</td>
                    <td>
                      <Action
                        onActionClick={handleActionClick}
                        id={_id}
                        type="edit"
                      />
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
