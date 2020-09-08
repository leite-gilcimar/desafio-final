import React from "react";

export default function Transactions({ transactions, lengthTransaction }) {
  console.log(transactions);

  return (
    <div>
      <div>
        <span>Lançamentos: {lengthTransaction}</span>
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
};
