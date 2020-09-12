import React from "react";
import axios from "axios";
import Months from "./components/Months";
import Transactions from "./components/Transactions";
import NewTransaction from "./components/NewTransaction";
import ModalTransaction from "./components/ModalTransaction";

export default function App() {
  const [transactions, setTransactions] = React.useState([]);
  const [period, setPeriod] = React.useState("2019-01");
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

      transactions.sort((a, b) => {
        return Number(a.day) - Number(b.day);
      });

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
        accumulator = accumulator + Number(currentItem.value);
      }
      return accumulator;
    }, 0);
    const balance = filteredTransactions.reduce((accumulator, currentItem) => {
      if (currentItem.type === "-") {
        accumulator -= Number(currentItem.value);
      }
      return accumulator;
    }, profit);

    const expense = balance - profit;

    // console.log(
    //   `lancamento: ${filteredTransactions.length} receitas: ${balance}`
    // );

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

  const handleNewTransaction = () => {
    setIsModalOpen(true);
  };

  const handleCloseNewTransaction = () => {
    setIsModalOpen(false);
    setIsEdit(false);
  };

  const handlePersist = (transaction) => {
    setEditTransaction(transaction);
    setIsEdit(true);
    setIsModalOpen(true);
  };

  const handleDataTransactions = (transaction) => {
    handleOrganizeTransaction(transaction, "edit");
    setIsEdit(false);
  };

  const handleDelete = async (transaction) => {
    await axios.delete(
      `http://localhost:3001/api/transaction/${transaction._id}`
    );

    handleOrganizeTransaction(transaction, "delete");
    //console.log(result);
  };

  const handleOrganizeTransaction = (transaction, action) => {
    const newFilteredTransactions = filteredTransactions.filter(
      (transactionItem) => {
        return transactionItem._id !== transaction._id;
      }
    );
    if (action !== "delete") {
      newFilteredTransactions.push(transaction);
    }
    newFilteredTransactions.sort((a, b) => {
      return Number(a.day) - Number(b.day);
      //return a._id.localeCompare(b._id);
    });
    setTransactions(newFilteredTransactions);
    setFilteredTransactions(newFilteredTransactions);
  };

  return (
    <div>
      <div className="container">
        <h1 className="center">Desafio Final do Bootcamp Full Stack</h1>
        <h4 className="center">Controle Financeiro Pessoal</h4>
        <Months period={period} setPeriod={handleSetPeriod} />
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
          onDelete={handleDelete}
        />
        {isModalOpen && (
          <ModalTransaction
            editTransaction={editTransaction}
            isEdit={isEdit}
            onClose={handleCloseNewTransaction}
            handleDataTransactions={handleDataTransactions}
          />
        )}
      </div>
    </div>
  );
}
