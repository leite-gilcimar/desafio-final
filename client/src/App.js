import React from "react";
import axios from "axios";
import Months from "./components/Months";
import Transactions from "./components/Transactions";

export default function App() {
  const [transactions, setTransactions] = React.useState([]);
  const [period, setPeriod] = React.useState("2020-08");
  const [lengthTransaction, setLengthTransaction] = React.useState(0);
  const [profit, setProfit] = React.useState(0);
  const [expense, setExpense] = React.useState(0);
  const [balance, setBalance] = React.useState(0);

  React.useEffect(() => {
    const getTransactions = async () => {
      const result = await axios.get(
        `http://localhost:3001/api/transaction?period=${period}`
      );
      const { data } = result;
      const { length, transactions } = data;
      const profit = transactions.reduce((accumulator, currentItem) => {
        if (currentItem.type === "+") {
          accumulator = accumulator + currentItem.value;
        }
        return accumulator;
      }, 0);
      const balance = transactions.reduce((accumulator, currentItem) => {
        if (currentItem.type === "-") {
          accumulator -= currentItem.value;
        }
        return accumulator;
      }, profit);

      const expense = balance - profit;

      setProfit(profit);
      setExpense(expense);
      setBalance(balance);
      setLengthTransaction(length);
      setTransactions(transactions);
      setPeriod(period);
    };
    getTransactions();
    //console.log(transactions);
  }, [period]);

  const handleSetPeriod = (value) => {
    setPeriod(value);
  };

  return (
    <div>
      <div className="container">
        <h1 className="center">Desafio Final do Bootcamp Full Stack</h1>
        <h4 className="center">Controle Financeiro Pessoal</h4>
        <Months period={handleSetPeriod} />
        <Transactions
          profit={profit}
          expense={expense}
          balance={balance}
          lengthTransaction={lengthTransaction}
          transactions={transactions}
        />
      </div>
    </div>
  );
}
