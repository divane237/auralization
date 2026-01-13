"use client";

import { useState } from "react";
import { getQuizForChapter } from "@/lib/quizes";

export default function Quiz({ chapterId, title = "Quick Quiz" }) {
  const questions = getQuizForChapter(chapterId);
  const [responses, setResponses] = useState({});
  const [currentIndex, setCurrentIndex] = useState(0);
  const [showFeedback, setShowFeedback] = useState(false);
  const [completed, setCompleted] = useState(false);

  const totalQuestions = questions.length;
  const currentQuestion = questions[currentIndex];

  const score = questions.reduce((sum, question) => {
    return sum + (responses[question.id] === question.answer ? 1 : 0);
  }, 0);

  const handleOptionSelect = (questionId, optionId) => {
    if (showFeedback || completed) return;
    setResponses((prev) => ({ ...prev, [questionId]: optionId }));
    setShowFeedback(true);
  };

  const resetQuiz = () => {
    setResponses({});
    setCurrentIndex(0);
    setShowFeedback(false);
    setCompleted(false);
  };

  const handleAdvance = () => {
    if (!showFeedback) return;
    if (currentIndex === totalQuestions - 1) {
      setCompleted(true);
    } else {
      setCurrentIndex((prev) => prev + 1);
      setShowFeedback(false);
    }
    if (currentIndex === totalQuestions - 1) {
      setShowFeedback(false);
    }
  };

  if (totalQuestions === 0) {
    return (
      <section className="mt-12 rounded-2xl border border-zinc-800 bg-zinc-950/60 p-6 text-sm text-zinc-300">
        <div>No quiz is available for this chapter yet. Check back soon!</div>
      </section>
    );
  }

  if (completed) {
    return (
      <section className="mt-16 rounded-3xl border border-zinc-800 bg-gradient-to-b from-zinc-950 to-zinc-900/80 p-6 text-white shadow-2xl shadow-emerald-900/10">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div>
            <h2 className="text-xl font-semibold">{title}</h2>
            <div className="text-sm text-zinc-400">Great work—here’s how you did.</div>
          </div>
          <div className="text-sm text-zinc-400">
            Score:{" "}
            <span className="font-semibold text-emerald-400">
              {score}/{totalQuestions}
            </span>
          </div>
        </div>

        <div className="mt-8 rounded-2xl border border-zinc-800 bg-zinc-950/60 p-6 text-center">
          <div className="text-lg text-zinc-300">
            You answered {score} out of {totalQuestions} questions correctly.
          </div>
          <button
            type="button"
            onClick={resetQuiz}
            className="mt-6 rounded-xl border border-zinc-700 px-6 py-2 text-sm font-semibold text-zinc-100 transition hover:border-emerald-400 hover:text-emerald-200"
          >
            Try Again
          </button>
        </div>
      </section>
    );
  }

  const selectedOption = currentQuestion ? responses[currentQuestion.id] : null;
  const userIsCorrect = currentQuestion && selectedOption === currentQuestion.answer;
  const correctOption =
    currentQuestion && currentQuestion.options.find((opt) => opt.id === currentQuestion.answer);

  return (
    <section className="mt-16 rounded-3xl border border-zinc-800 bg-gradient-to-b from-zinc-950 to-zinc-900/80 p-6 text-white shadow-2xl shadow-emerald-900/10">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <h2 className="text-xl font-semibold">{title}</h2>
          <div className="text-sm text-zinc-400">
            Questions appear one at a time—pick an answer to reveal feedback.
          </div>
        </div>
        <div className="text-sm text-zinc-400">
          Question {currentIndex + 1} of {totalQuestions}
        </div>
      </div>

      {currentQuestion && (
        <div className="mt-6 rounded-2xl border border-zinc-800 bg-zinc-950/60 p-5">
          <div className="text-sm uppercase tracking-wide text-zinc-500">
            Question {currentIndex + 1}
          </div>
          <h3 className="mt-2 text-lg font-medium text-zinc-100">{currentQuestion.prompt}</h3>

          <div className="mt-4 space-y-3">
            {currentQuestion.options.map((option) => {
              const isSelected = selectedOption === option.id;
              const isCorrect = currentQuestion.answer === option.id;
              let borderColor = "border-zinc-800";
              let background = "bg-transparent";

              if (showFeedback) {
                if (isCorrect) {
                  borderColor = "border-emerald-500/70";
                  background = "bg-emerald-500/10";
                } else if (isSelected && !isCorrect) {
                  borderColor = "border-rose-500/60";
                  background = "bg-rose-500/10";
                }
              } else if (isSelected) {
                borderColor = "border-emerald-400/60";
                background = "bg-emerald-400/10";
              }

              return (
                <button
                  key={option.id}
                  type="button"
                  onClick={() => handleOptionSelect(currentQuestion.id, option.id)}
                  className={`flex w-full items-center justify-between rounded-2xl border ${borderColor} ${background} px-4 py-3 text-left text-sm transition ${
                    showFeedback
                      ? "cursor-not-allowed"
                      : "hover:border-emerald-400/60 hover:bg-emerald-400/5"
                  }`}
                  aria-pressed={isSelected}
                  disabled={showFeedback}
                >
                  <span className="text-zinc-200">{option.label}</span>
                  {showFeedback && isCorrect && (
                    <span className="text-xs font-semibold uppercase tracking-wide text-emerald-300">
                      Correct
                    </span>
                  )}
                </button>
              );
            })}
          </div>

          {showFeedback && (
            <div className="mt-4 text-sm">
              <div className={`font-semibold ${userIsCorrect ? "text-emerald-400" : "text-rose-400"}`}>
                {userIsCorrect ? "Nice work! That’s correct." : "Not quite. Review the explanation:"}
              </div>
              <div className="mt-1 text-zinc-400">
                {currentQuestion.explanation}
                {!userIsCorrect && correctOption ? ` Correct answer: ${correctOption.label}.` : ""}
              </div>
            </div>
          )}
        </div>
      )}

      <div className="mt-6 flex flex-wrap gap-3">
        <button
          type="button"
          onClick={handleAdvance}
          disabled={!showFeedback}
          className={`rounded-xl px-5 py-2 text-sm font-semibold transition ${
            showFeedback ? "bg-emerald-500 text-black hover:bg-emerald-400" : "cursor-not-allowed bg-zinc-800 text-zinc-500"
          }`}
        >
          {currentIndex === totalQuestions - 1 ? "See Results" : "Next Question"}
        </button>
        <button
          type="button"
          onClick={resetQuiz}
          className="rounded-xl border border-zinc-700 px-4 py-2 text-sm font-semibold text-zinc-200 hover:border-emerald-400 hover:text-emerald-200"
        >
          Restart
        </button>
      </div>
    </section>
  );
}
