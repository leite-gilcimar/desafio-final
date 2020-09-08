import React from "react";

export default function Months({ period }) {
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

  const handlePeriodChange = (event) => {
    console.log(event.target.value);
    period(event.target.value);
  };

  return (
    <div>
      <select className="browser-default" onChange={handlePeriodChange}>
        {months.map((month, index) => {
          return <option key={index}>{month}</option>;
        })}
      </select>
    </div>
  );
}
