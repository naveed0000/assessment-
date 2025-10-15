"use client";

import { useState, useRef } from "react";
import {
  Button,
  Box,
  Typography,
  LinearProgress,
  Card,
  CardContent,
} from "@mui/material";
import { useForm, useFieldArray } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { questionList } from "./data/question";
import QuestionCard from "./quiz/_components/QuestionCard";
import OptionGroup from "./quiz/_components/OptionGroup";
import { ScoreCard } from "./quiz/_components/ScoreCard";

const schema = z.object({
  answers: z.array(z.string().optional()).length(questionList.length),
});
export type SchemaType = z.infer<typeof schema>;

export default function QuizPage() {
  const [current, setCurrent] = useState(0);
  const [submitted, setSubmitted] = useState(false);
  const [score, setScore] = useState<number | null>(null);

  const { control, handleSubmit, watch, setValue } = useForm({
    resolver: zodResolver(schema),
    defaultValues: { answers: Array(questionList.length).fill("") },
    shouldUnregister: false,
  });

  const { fields } = useFieldArray({
    control,
    name: "answers",
  });

  const answers = watch("answers");
  const nextQuestion = () => current < questionList.length - 1 && setCurrent(current + 1);
  const prevQuestion = () => current > 0 && setCurrent(current - 1);

  const onSubmit = (data: SchemaType) => {
    const correct = data.answers.filter(
      (ans, i) => ans === questionList[i].answer
    ).length;
    setScore(correct);
    setSubmitted(true);
  };

  const question = questionList[current];
  const progress = ((current + 1) / questionList.length) * 100;

  return (
    <Box
      sx={{
        minHeight: "100vh",
        bgcolor: "#f7f8fa",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        py: 6,
        position: "relative",
      }}
    >
      {/* Title */}
      <Typography
        variant="h4"
        sx={{ fontWeight: 600, mb: 3, color: "#1e293b", letterSpacing: 0.5 }}
      >
        🧠 Quick Test Series
      </Typography>

      {/* Progress Bar */}
      <Box sx={{ width: "90%", maxWidth: 700, mb: 2 }}>
        <LinearProgress
          variant="determinate"
          value={progress}
          sx={{
            height: 10,
            borderRadius: 5,
            backgroundColor: "#e2e8f0",
            "& .MuiLinearProgress-bar": { backgroundColor: "#3b82f6" },
          }}
        />
        <Typography
          variant="body2"
          sx={{ mt: 1, textAlign: "right", color: "#475569" }}
        >
          Question {current + 1} / {questionList.length}
        </Typography>
      </Box>

      {/* Question Section */}
      <motion.div
        key={current}
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -40 }}
        transition={{ duration: 0.4, ease: "easeOut" }}
        style={{ width: "100%", display: "flex", justifyContent: "center" }}
      >
        <Card
          sx={{
            width: "90%",
            maxWidth: 700,
            borderRadius: 4,
            boxShadow: "0 10px 30px rgba(0,0,0,0.08)",
          }}
        >
          <CardContent sx={{ p: 4 }}>
            <form onSubmit={handleSubmit(onSubmit)}>
              <QuestionCard
                question={`Q${current + 1}. ${question.question}`}
                showAnswer={submitted}
                correctAnswer={question.answer}
              />

              <OptionGroup
                control={control}
                name={`answers.${current}`}
                options={question.options}
                correctAnswer={question.answer}
                submitted={submitted}
                value={answers[current]}
                onChange={(val) => setValue(`answers.${current}`, val)}
              />

              <Box
                sx={{
                  display: "flex",
                  justifyContent: "space-between",
                  mt: 4,
                }}
              >
                <Button
                  variant="outlined"
                  onClick={prevQuestion}
                  disabled={current === 0}
                  sx={{
                    textTransform: "none",
                    borderRadius: 2,
                    px: 3,
                    py: 1,
                    borderColor: "#94a3b8",
                    color: "#475569",
                    "&:hover": { borderColor: "#3b82f6", color: "#3b82f6" },
                  }}
                >
                  Prev
                </Button>

                {current === questionList.length - 1 ? (
                  <Button
                    variant="contained"
                    color="primary"
                    type="submit"
                    sx={{
                      textTransform: "none",
                      borderRadius: 2,
                      px: 3,
                      py: 1,
                      backgroundColor: "#3b82f6",
                      "&:hover": { backgroundColor: "#2563eb" },
                    }}
                  >
                    Submit
                  </Button>
                ) : (
                  <Button
                    variant="contained"
                    onClick={nextQuestion}
                    sx={{
                      textTransform: "none",
                      borderRadius: 2,
                      px: 3,
                      py: 1,
                      backgroundColor: "#3b82f6",
                      "&:hover": { backgroundColor: "#2563eb" },
                    }}
                  >
                    Next
                  </Button>
                )}
              </Box>
            </form>
          </CardContent>
        </Card>
      </motion.div>

      {/* ✅ 3D Score Card */}
      {submitted && score !== null && (
        <ScoreCard score={score} total={questionList.length} />
      )}
    </Box>
  );
}
