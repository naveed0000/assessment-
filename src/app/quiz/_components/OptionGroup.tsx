"use client";

import {
  FormControl,
  FormGroup,
  FormControlLabel,
  Checkbox,
  Typography,
  Box,
} from "@mui/material";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import CancelRoundedIcon from "@mui/icons-material/CancelRounded";
import { motion } from "framer-motion";

interface OptionGroupProps {
  name: string;
  options: string[];
  value: string;
  onChange: (value: string) => void;
  submitted?: boolean;
  correctAnswer?: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  control?: any;
}

export default function OptionGroup({
  options,
  value,
  onChange,
  submitted = false,
  correctAnswer,
}: OptionGroupProps) {
  return (
    <FormControl component="fieldset" sx={{ mt: 3, width: "100%" }}>
      <FormGroup>
        {options.map((opt, i) => {
          const isSelected = value === opt;
          const isCorrect = opt === correctAnswer;
          const userChoseCorrect = submitted && isSelected && isCorrect;
          const userChoseWrong = submitted && isSelected && !isCorrect;

          const bgColor = userChoseCorrect
            ? "#ecfdf5"
            : userChoseWrong
            ? "#fef2f2"
            : isSelected
            ? "#e0f2fe"
            : "transparent";

          const borderColor = userChoseCorrect
            ? "#22c55e"
            : userChoseWrong
            ? "#ef4444"
            : isSelected
            ? "#3b82f6"
            : "#e2e8f0";

          return (
            <motion.div
              key={i}
              whileHover={!submitted ? { scale: 1.02 } : {}}
              whileTap={!submitted ? { scale: 0.98 } : {}}
              transition={{ duration: 0.25, ease: "easeOut" }}
              style={{ width: "100%" }}
            >
              <Box
                sx={{
                  mb: 1.8,
                  borderRadius: 2,
                  border: `1px solid ${borderColor}`,
                  backgroundColor: bgColor,
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "flex-start",
                  p: 1.5,
                  pl: 2,
                  pr: 2,
                  transition: "all 0.3s ease",
                  cursor: submitted ? "not-allowed" : "pointer",
                  "&:hover": {
                    backgroundColor: !submitted ? "#f8fafc" : bgColor,
                    boxShadow: !submitted
                      ? "0 4px 10px rgba(0,0,0,0.05)"
                      : "none",
                  },
                }}
              >
                {/* ✅ Fix: Remove outer onClick — rely only on Checkbox */}
                <FormControlLabel
                  sx={{ width: "100%", m: 0 }}
                  control={
                    <Checkbox
                      checked={isSelected}
                      onChange={() => onChange(isSelected ? "" : opt)}
                      disabled={submitted}
                      sx={{
                        color: "#64748b",
                        "&.Mui-checked": { color: "#3b82f6" },
                        "&:hover": { backgroundColor: "transparent" },
                      }}
                    />
                  }
                  label={
                    <Box
                      sx={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "space-between",
                        width: "100%",
                      }}
                    >
                      <Typography
                        sx={{
                          color: userChoseWrong
                            ? "error.main"
                            : userChoseCorrect
                            ? "success.main"
                            : "text.primary",
                          fontSize: 15,
                          fontWeight: 500,
                          flex: 1,
                        }}
                      >
                        {opt}
                      </Typography>

                      {userChoseCorrect && (
                        <CheckCircleIcon
                          sx={{ color: "success.main", fontSize: 22 }}
                        />
                      )}
                      {userChoseWrong && (
                        <CancelRoundedIcon
                          sx={{ color: "error.main", fontSize: 22 }}
                        />
                      )}
                    </Box>
                  }
                />

                {/* Show red error message below wrong selected option */}
                {userChoseWrong && (
                  <motion.div
                    initial={{ opacity: 0, y: -5 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.25 }}
                  >
                    <Typography
                      variant="body2"
                      sx={{
                        color: "error.main",
                        fontSize: 13,
                        pl: 5,
                        mt: 0.5,
                      }}
                    >
                      Incorrect answer — correct answer is{" "}
                      <strong>{correctAnswer}</strong>.
                    </Typography>
                  </motion.div>
                )}
              </Box>
            </motion.div>
          );
        })}
      </FormGroup>
    </FormControl>
  );
}
