import React from "react";

export default function Transactions({ transactions, lengthTransaction }) {
  console.log(transactions);

  return (
    <div>
      <div>Lançamentos: {lengthTransaction}</div>
      <div>
        <table className="striped">
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
                  <tr key={_id}>
                    <td>{day}</td>
                    <td>{category}</td>
                    <td>{description}</td>
                    <td>R$ {value.toFixed(2)}</td>
                    <td>
                      <span className="material-icons">edit</span>
                    </td>
                    <td>
                      <span className="material-icons">delete</span>
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
