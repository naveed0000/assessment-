"use client";

import { Card, CardContent, Typography, Box } from "@mui/material";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import { motion } from "framer-motion";

interface QuestionCardProps {
  question: string;
  showAnswer?: boolean;
  correctAnswer?: string;
}

export default function QuestionCard({
  question,
  showAnswer,
  correctAnswer,
}: QuestionCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 25 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, ease: "easeOut" }}
      style={{ width: "100%" }}
    >
      <Card
        elevation={3}
        sx={{
          borderRadius: 3,
          p: 2.5,
          backgroundColor: "#ffffff",
          border: "1px solid #e2e8f0",
          transition: "all 0.3s ease",
          "&:hover": {
            boxShadow: "0 6px 20px rgba(0,0,0,0.07)",
          },
        }}
      >
        <CardContent sx={{ p: 0 }}>
          {/* Question Header */}
          <Typography
            variant="h6"
            sx={{
              fontWeight: 600,
              color: "#1e293b",
              lineHeight: 1.5,
              letterSpacing: 0.3,
              fontSize: "1.1rem",
            }}
          >
            {question}
          </Typography>

          {/* Correct Answer Display */}
          {showAnswer && correctAnswer && (
            <motion.div
              initial={{ opacity: 0, y: -5 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4 }}
            >
              <Box
                sx={{
                  mt: 2,
                  p: 1.5,
                  borderRadius: 2,
                  backgroundColor: "#ecfdf5",
                  border: "1px solid #86efac",
                  display: "flex",
                  alignItems: "center",
                  gap: 1,
                }}
              >
                <CheckCircleOutlineIcon
                  sx={{ color: "#16a34a", fontSize: 20 }}
                />
                <Typography
                  variant="body2"
                  sx={{
                    fontWeight: 500,
                    color: "#065f46",
                    fontSize: "0.95rem",
                  }}
                >
                  Correct Answer:&nbsp;
                  <Typography
                    component="span"
                    sx={{ fontWeight: 700, color: "#047857" }}
                  >
                    {correctAnswer}
                  </Typography>
                </Typography>
              </Box>
            </motion.div>
          )}
        </CardContent>
      </Card>
    </motion.div>
  );
}
