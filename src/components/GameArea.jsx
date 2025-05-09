import React, { useState, useEffect } from "react";
import Player from "./Player";
import Heart from "./Heart";
import "./GameArea.css";

const generateHearts = (count) =>
  Array.from({ length: count }, (_, i) => ({
    id: i,
    x: Math.floor(Math.random() * 90),
    y: Math.floor(Math.random() * 90),
  }));

function GameArea() {
  const [playerPos, setPlayerPos] = useState({ x: 0, y: 0 });
  const [hearts, setHearts] = useState(generateHearts(10));
  const [collected, setCollected] = useState(0);
  const [message, setMessage] = useState("");

  const moveTo = (x, y, id) => {
    setPlayerPos({ x, y });

    setTimeout(() => {
      setHearts((prev) => prev.filter((heart) => heart.id !== id));
      setCollected((c) => c + 1);
    }, 1000);
  };

  const resetGame = () => {
    setCollected(0);
    setHearts(generateHearts(10));
    setPlayerPos({ x: 0, y: 0 });
    setMessage("");
  };

  useEffect(() => {
    if (collected === 10) {
      setMessage("Sen Zekeriya'nın bahsettiği Sıla olmalısın ❤️ Anlattığı kadar varmışsın");
    }
  }, [collected]);

  return (
    <div className="game-container">
      {/* Üst bilgi paneli */}
      <div className="top-bar">
        <span>Toplanan Kalpler: {collected}/10</span>
        <button onClick={resetGame}>Sıfırla</button>
      </div>

      {/* Oyun alanı */}
      <div className="game-area">
        <Player x={playerPos.x} y={playerPos.y} />
        {hearts.map((heart) => (
          <Heart
            key={heart.id}
            {...heart}
            onClick={() => moveTo(heart.x, heart.y, heart.id)}
          />
        ))}

        {message && (
          <div className="overlay">
            <div className="center-message">{message}</div>
          </div>
        )}
      </div>
    </div>
  );
}

export default GameArea;
