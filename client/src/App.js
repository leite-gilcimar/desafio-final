import React from "react";
import axios from "axios";
import Months from "./components/Months";
import Transactions from "./components/Transactions";
import NewTransaction from "./components/NewTransaction";
import ModalTransaction from "./components/ModalTransaction";

export default function App() {
  const [transactions, setTransactions] = React.useState([]);
  const [period, setPeriod] = React.useState("2020-08");
  const [lengthTransaction, setLengthTransaction] = React.useState(0);
  const [profit, setProfit] = React.useState(0);
  const [expense, setExpense] = React.useState(0);
  const [balance, setBalance] = React.useState(0);
  const [filteredTransactions, setFilteredTransactions] = React.useState([]);
  const [isModalOpen, setIsModalOpen] = React.useState(false);
  const [isEdit, setIsEdit] = React.useState(false);
  const [editTransaction, setEditTransaction] = React.useState([]);

  React.useEffect(() => {
    const getTransactions = async () => {
      const result = await axios.get(
        `http://localhost:3001/api/transaction?period=${period}`
      );
      const { data } = result;
      const { length, transactions } = data;

      setTransactions(transactions);
      setLengthTransaction(length);
      setFilteredTransactions(Object.assign([], transactions));
      setPeriod(period);
    };
    getTransactions();
    //console.log(transactions);
  }, [period]);

  React.useEffect(() => {
    const profit = filteredTransactions.reduce((accumulator, currentItem) => {
      if (currentItem.type === "+") {
        accumulator = accumulator + currentItem.value;
      }
      return accumulator;
    }, 0);
    const balance = filteredTransactions.reduce((accumulator, currentItem) => {
      if (currentItem.type === "-") {
        accumulator -= currentItem.value;
      }
      return accumulator;
    }, profit);

    const expense = balance - profit;

    setProfit(profit);
    setExpense(expense);
    setBalance(balance);
    setLengthTransaction(filteredTransactions.length);
  }, [filteredTransactions]);

  const handleSetPeriod = (value) => {
    setPeriod(value);
  };

  const handleFilterInput = (filter) => {
    const filterLowerCase = filter.toLowerCase();
    let description = "";
    const filtered = transactions.filter((transaction) => {
      description = transaction.description.toLowerCase();
      return description.includes(filterLowerCase);
    });

    setFilteredTransactions(filtered);
  };

  const handleNewTransaction = (transaction) => {
    setIsModalOpen(true);
  };

  const handleCloseNewTransaction = () => {
    setIsModalOpen(false);
  };

  const handlePersist = (transaction) => {
    setEditTransaction(transaction);
    setIsEdit(true);
    setIsModalOpen(true);
  };

  return (
    <div>
      <div className="container">
        <h1 className="center">Desafio Final do Bootcamp Full Stack</h1>
        <h4 className="center">Controle Financeiro Pessoal</h4>
        <Months period={handleSetPeriod} />
        <NewTransaction
          handleFilter={handleFilterInput}
          handleNewTransaction={handleNewTransaction}
        />
        <Transactions
          profit={profit}
          expense={expense}
          balance={balance}
          lengthTransaction={lengthTransaction}
          transactions={filteredTransactions}
          onPersist={handlePersist}
        />
        {isModalOpen && (
          <ModalTransaction
            editTransaction={editTransaction}
            isEdit={isEdit}
            onClose={handleCloseNewTransaction}
          />
        )}
      </div>
    </div>
  );
}

const styles = {
  rows: {
    display: "flex",
    flexWrap: "wrap",
  },
};
