import React from "react";

export default function Months() {
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

  console.log(months);

  return (
    <div>
      <select className="browser-default">
        {months.map((month, index) => {
          return <option key={index}>{month}</option>;
        })}
      </select>
    </div>
  );
}
