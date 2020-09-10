import React from "react";
import Modal from "react-modal";
import M from "materialize-css/dist/js/materialize";
import axios from "axios";

Modal.setAppElement("#root");

export default function ModalTransaction({
  editTransaction,
  isEdit,
  onClose,
  handleDataTransactions,
}) {
  const initTransaction = {
    _id: null,
    description: "",
    value: "",
    category: "",
    year: "",
    month: "",
    day: "",
    yearMonth: "",
    yearMonthDay: "",
    type: "",
  };

  const [selectedOption, setSelectedOption] = React.useState("");
  const [newTransaction, setNewTransaction] = React.useState(initTransaction);
  const [edit, setEdit] = React.useState(true);
  const [radioDisable, setRadioDisable] = React.useState(false);

  const {
    _id,
    description,
    value,
    category,
    year,
    month,
    day,
    yearMonth,
    yearMonthDay,
    type,
  } = newTransaction;

  const handleFormSubmit = async (event) => {
    event.preventDefault();

    let result = null;

    if (isEdit) {
      result = await axios.put(
        `http://localhost:3001/api/transaction/${newTransaction._id}`,
        newTransaction
      );
    } else {
      result = await axios.post(
        "http://localhost:3001/api/transaction/",
        newTransaction
      );
    }
    console.log(result);
    onClose();
    handleDataTransactions(newTransaction);
  };

  const handleChange = (event) => {
    const name = event.target.name;
    const inputValue = event.target.value;

    let newObject = null;
    let newValue = null;

    switch (name) {
      case "description":
        newValue = { description: inputValue };
        break;
      case "category":
        newValue = { category: inputValue };
        break;
      case "value":
        newValue = { value: inputValue };
        break;
      case "date":
        console.log(inputValue);
        let date = inputValue.split("-");
        newValue = {
          day: `${date[2]}`,
          month: `${date[1]}`,
          year: `${date[0]}`,
          yearMonth: `${date[0]}-${date[1]}`,
          yearMonthDay: `${date[0]}-${date[1]}-${date[2]}`,
        };
        break;
      case "expense":
        setSelectedOption(name);
        newValue = { type: inputValue };
        break;
      case "profit":
        setSelectedOption(name);
        newValue = { type: inputValue };
        break;
    }
    console.log(newValue);
    setNewTransaction({ ...newTransaction, ...newValue });
  };

  React.useEffect(() => {
    if (isEdit && edit) {
      setNewTransaction(editTransaction);
      setEdit(false);
      setRadioDisable(true);
      if (editTransaction.type === "-") {
        setSelectedOption("expense");
      } else {
        setSelectedOption("profit");
      }
      console.log(editTransaction);
    }

    const calendar = () => {
      let elems = document.querySelectorAll(".datepicker");
      let instances = M.Datepicker.init(elems, {
        format: "yyyy-mm-dd",
      });
      console.log(instances);
    };
    //calendar();
    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  });

  const handleKeyDown = (event) => {
    if (event.key === "Escape") {
      onClose();
    }
  };

  const handleModalClose = () => {
    onClose();
  };

  return (
    <div className="container">
      <Modal isOpen={true} style={customStyles}>
        <div>
          <span style={customStyles.title}>Edição de lançamento</span>
          <button
            className="waves-effect waves-lights btn red dark-4"
            onClick={handleModalClose}
          >
            X
          </button>

          <form style={customStyles.form} onSubmit={handleFormSubmit}>
            <div style={customStyles.radioRow}>
              <label>
                <input
                  name="expense"
                  type="radio"
                  value="-"
                  checked={selectedOption === "expense"}
                  onChange={handleChange}
                  disabled={radioDisable}
                />
                <span style={customStyles.span}>Despesa</span>
              </label>

              <label>
                <input
                  name="profit"
                  type="radio"
                  value="+"
                  checked={selectedOption === "profit"}
                  onChange={handleChange}
                  disabled={radioDisable}
                />
                <span style={customStyles.span}>Receita</span>
              </label>
            </div>
            <div>
              <span>Descrição:</span>
              <input
                type="text"
                name="description"
                onChange={handleChange}
                value={description}
              ></input>
            </div>
            <div>
              <span>Categoria:</span>
              <input
                type="text"
                name="category"
                onChange={handleChange}
                value={category}
              ></input>
            </div>
            <div>
              <span>Valor:</span>
              <input
                type="Number"
                name="value"
                min="0"
                onChange={handleChange}
                value={value}
              ></input>
              <input
                type="date"
                name="date"
                onChange={handleChange}
                value={yearMonthDay}
              />
            </div>
          </form>
          <button
            className="waves-effect waves-lights btn"
            style={customStyles.bottomSalvar}
            onClick={handleFormSubmit}
          >
            SALVAR
          </button>
        </div>
      </Modal>
    </div>
  );
}

const customStyles = {
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
  },
  form: {
    width: "395px",
    height: "450px",
    marginTop: "40px",
    border: "1px solid lightgray",
    borderRadius: "3px",
  },
  title: {
    fontSize: "22px",
    fontWeight: "bold",
    marginRight: "130px",
    marginBottom: "50px",
  },
  bottomSalvar: {
    marginTop: "10px",
  },
  radioRow: {
    alignItem: "center",
    marginTop: "10px",
    marginLeft: "100px",
    marginRight: "15px",
    marginBottom: "10px",
    fontSize: "20px",
    fontWeight: "bold",
  },
  span: {
    marginRight: "15px",
  },
  calendar: {
    width: "150px",
    height: "150px",
  },
};
