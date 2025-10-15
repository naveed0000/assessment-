"use client";

import { useRef } from "react";
import { Card, Typography } from "@mui/material";
import EmojiEventsIcon from "@mui/icons-material/EmojiEvents";
import BoltIcon from "@mui/icons-material/Bolt";
import PsychologyAltIcon from "@mui/icons-material/PsychologyAlt";
import WhatshotIcon from "@mui/icons-material/Whatshot";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";

export function ScoreCard({ score, total }: { score: number; total: number }) {
  const cardRef = useRef<HTMLDivElement>(null);

  // Base motion values
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  // Smooth, subtle spring motion
  const springX = useSpring(x, { stiffness: 80, damping: 15, mass: 0.2 });
  const springY = useSpring(y, { stiffness: 80, damping: 15, mass: 0.2 });

  // Subtle tilt range for realism
  const rotateX = useTransform(springY, [-100, 100], [8, -8]);
  const rotateY = useTransform(springX, [-100, 100], [-8, 8]);

  function handleMouseMove(event: React.MouseEvent) {
    const rect = cardRef.current?.getBoundingClientRect();
    if (!rect) return;
    const offsetX = event.clientX - rect.left - rect.width / 2;
    const offsetY = event.clientY - rect.top - rect.height / 2;
    x.set(offsetX);
    y.set(offsetY);
  }

  function handleMouseLeave() {
    x.set(0);
    y.set(0);
  }

  // Select appropriate icon + text based on score
  let icon = <PsychologyAltIcon sx={{ fontSize: 30, color: "#eab308" }} />;
  let message = "🧠 Keep Practicing!";
  let color = "#eab308";

  if (score === total) {
    icon = <WhatshotIcon sx={{ fontSize: 30, color: "#ef4444" }} />;
    message = "🔥 Perfect Score!";
    color = "#ef4444";
  } else if (score > total / 2) {
    icon = <BoltIcon sx={{ fontSize: 30, color: "#22c55e" }} />;
    message = "💪 Well Done!";
    color = "#22c55e";
  } else if (score >= total / 3) {
    icon = <EmojiEventsIcon sx={{ fontSize: 30, color: "#3b82f6" }} />;
    message = "👏 Good Attempt!";
    color = "#3b82f6";
  }

  return (
    <motion.div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{
        rotateX,
        rotateY,
        transformStyle: "preserve-3d",
        perspective: 1000,
        position: "absolute",
        right: 80,
        top: "30%",
      }}
      initial={{ opacity: 0, x: 150 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
    >
      <Card
        sx={{
          width: 260,
          height: 160,
          borderRadius: 5,
          background:
            "linear-gradient(135deg, #3b82f6 0%, #2563eb 50%, #1e40af 100%)",
          color: "#fff",
          boxShadow: "0 20px 40px rgba(37, 99, 235, 0.35)",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          transform: "translateZ(40px)",
          cursor: "pointer",
          transition: "box-shadow 0.3s ease, transform 0.3s ease",
          "&:hover": {
            boxShadow: "0 25px 60px rgba(37, 99, 235, 0.5)",
            transform: "translateZ(55px)",
          },
        }}
      >
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          style={{ display: "flex", alignItems: "center", gap: "8px" }}
        >
          {icon}
          <Typography variant="h6" sx={{ fontWeight: 600 }}>
            Test Completed
          </Typography>
        </motion.div>

        <Typography
          variant="h4"
          sx={{
            mt: 1,
            fontWeight: 700,
            textShadow: "0 2px 6px rgba(0,0,0,0.25)",
            letterSpacing: 0.5,
          }}
        >
          {score} / {total}
        </Typography>

        <Typography
          variant="body2"
          sx={{
            mt: 1,
            color: "rgba(255,255,255,0.9)",
            letterSpacing: 0.5,
            display: "flex",
            alignItems: "center",
            gap: 0.5,
          }}
        >
          <Typography
            component="span"
            sx={{
              color,
              fontWeight: 600,
            }}
          >
            {message}
          </Typography>
        </Typography>
      </Card>
    </motion.div>
  );
}
