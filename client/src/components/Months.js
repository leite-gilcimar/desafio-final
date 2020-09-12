import React from "react";

export default function Months({ period, setPeriod }) {
  const [enableButtomForward, setEnableButtomForward] = React.useState(false);
  const [enableButtomBack, setEnableButtomBack] = React.useState(false);
  const [monthIndex, setMonthIndex] = React.useState(0);

  const years = ["2019", "2020", "2021"];
  const months = [];
  for (let y = 0; y < years.length; y++) {
    for (let i = 1; i <= 12; i++) {
      if (i <= 9) {
        months.push(`${years[y]}-0${i}`);
      } else {
        months.push(`${years[y]}-${i}`);
      }
    }
  }

  React.useEffect(() => {
    if (monthIndex <= 0) {
      setEnableButtomBack(true);
    } else {
      setEnableButtomBack(false);
    }
    if (monthIndex >= 35) {
      setEnableButtomForward(true);
    } else {
      setEnableButtomForward(false);
    }
  }, [monthIndex]);

  const handlePeriodChange = (event) => {
    let newMonth = event.target.value;
    let newMonthIndex = months.findIndex((month) => month === newMonth);
    setPeriod(newMonth);
    setMonthIndex(newMonthIndex);
  };

  const handleSetMonths = (event) => {
    let nameButton = event.target.name;
    let newMonthIndex = months.findIndex((month) => month === period);

    if (nameButton === "forward") {
      newMonthIndex++;
    } else {
      newMonthIndex--;
    }
    setPeriod(months[newMonthIndex]);
    setMonthIndex(newMonthIndex);
  };

  return (
    <div className="container" style={styles.divData}>
      <div>
        <button
          className="waves-light btn"
          style={styles.buttom}
          name="back"
          onClick={handleSetMonths}
          disabled={enableButtomBack}
        >
          <i className="material-icons left">arrow_back</i>Voltar
        </button>
      </div>
      <div style={styles.months}>
        <select
          className="browser-default"
          onChange={handlePeriodChange}
          value={months[monthIndex]}
        >
          {months.map((month, index) => {
            return <option key={index}>{month}</option>;
          })}
        </select>
      </div>
      <div>
        <button
          className="waves-light btn"
          style={styles.buttom}
          name="forward"
          onClick={handleSetMonths}
          disabled={enableButtomForward}
        >
          <i className="material-icons right">arrow_forward</i>
          Avançar
        </button>
      </div>
    </div>
  );
}

const styles = {
  divData: {
    display: "flex",
    flexWrap: "wrap",
    justifyContent: "center",
    width: "500px",
    marginTop: "30px",
    marginBottom: "15px",
  },
  buttom: {
    cursor: "pointer",
    marginLeft: "15px",
    marginRight: "15px",
    height: "43px",
  },
  months: {
    height: "30px",
  },
};
