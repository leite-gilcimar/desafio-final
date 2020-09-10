import React from "react";

export default function Action({ onActionClick, id, type }) {
  const handleActionClick = () => {
    onActionClick(id, type);
  };

  return (
    <span
      className="material-icons"
      style={{ cursor: "pointer" }}
      onClick={handleActionClick}
    >
      {type}
    </span>
  );
}
