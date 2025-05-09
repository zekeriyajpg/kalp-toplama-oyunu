import React, { useState } from "react";
import "./Heart.css";

function Heart({ x, y, onClick }) {
  const [collected, setCollected] = useState(false);

  const handleClick = () => {
    setCollected(true);
    setTimeout(() => {
      onClick();
    }, 500);
  };

  return (
    <div
      className={`heart ${collected ? "collected" : ""}`}
      style={{
        left: `${x}%`,
        top: `${y}%`,
      }}
      onClick={handleClick}
    >
      ❤️
    </div>
  );
}

export default Heart;
