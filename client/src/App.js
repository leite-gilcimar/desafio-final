import React from "react";
import axios from "axios";
import Months from "./components/Months";

export default function App() {
  const [transactions, setTransactions] = React.useState([]);

  React.useEffect(() => {
    const getTransactions = async () => {
      const result = await axios.get(
        "http://localhost:3001/api/transaction?period=2020-09"
      );
      console.log(result);
    };
    getTransactions();
  }, []);

  return (
    <div>
      <div>
        <h1 className="center">Desafio Final do Bootcamp Full Stack</h1>
        <Months />
      </div>
    </div>
  );
}
