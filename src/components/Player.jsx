import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";

function Player({ x, y }) {
  const [eyeOffset, setEyeOffset] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e) => {
      const player = document.getElementById("player");
      if (!player) return;

      const rect = player.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;

      const dx = e.clientX - centerX;
      const dy = e.clientY - centerY;

      const maxOffset = 3; // Göz hareket sınırı
      const distance = Math.sqrt(dx * dx + dy * dy);
      const scale = Math.min(maxOffset / distance, 1);

      setEyeOffset({
        x: dx * scale,
        y: dy * scale,
      });
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  return (
    <motion.div
      id="player"
      animate={{ left: `${x}%`, top: `${y}%` }}
      transition={{ duration: 1 }}
      style={{
        position: "absolute",
        width: "40px",
        height: "40px",
        backgroundColor: "crimson",
        display: "flex",
        justifyContent: "center",
        alignItems: "flex-start",
        borderRadius: "6px",
        transform: "translate(-50%, -50%)",
      }}
    >
      {/* Gözler */}
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          width: "60%",
          marginTop: "6px",
        }}
      >
        {[0, 1].map((_, i) => (
          <div
            key={i}
            style={{
              width: "8px",
              height: "8px",
              backgroundColor: "#5C4033",
              borderRadius: "50%",
              transform: `translate(${eyeOffset.x}px, ${eyeOffset.y}px)`,
              transition: "transform 0.1s linear",
            }}
          ></div>
        ))}
      </div>
    </motion.div>
  );
}

export default Player;
