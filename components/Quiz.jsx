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

  // No quiz available
  if (totalQuestions === 0) {
    return (
      <section className="mt-12 rounded-2xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900/50 p-6">
        <div className="flex items-center gap-3 text-slate-600 dark:text-slate-400">
          <svg className="w-5 h-5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          <span>No quiz is available for this chapter yet. Check back soon!</span>
        </div>
      </section>
    );
  }

  // Quiz completed - Results view
  if (completed) {
    const percentage = Math.round((score / totalQuestions) * 100);
    const isPerfect = score === totalQuestions;
    const isGood = percentage >= 70;

    return (
      <section className="mt-12 rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900/50 overflow-hidden">
        {/* Header */}
        <div className="px-6 py-5 border-b border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-800/30">
          <div className="flex items-center justify-between gap-4">
            <div>
              <h2 className="text-xl font-semibold text-slate-900 dark:text-slate-100">
                {title}
              </h2>
              <p className="text-sm text-slate-600 dark:text-slate-400 mt-1">
                Quiz Complete
              </p>
            </div>
            <div className="flex items-center gap-2">
              {isPerfect ? (
                <svg className="w-6 h-6 text-green-600 dark:text-green-400" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              ) : isGood ? (
                <svg className="w-6 h-6 text-blue-600 dark:text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              ) : (
                <svg className="w-6 h-6 text-amber-600 dark:text-amber-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              )}
            </div>
          </div>
        </div>

        {/* Score Display */}
        <div className="p-8 text-center">
          <div className="inline-flex flex-col items-center gap-4">
            {/* Score Circle */}
            <div className="relative w-32 h-32">
              <svg className="w-32 h-32 transform -rotate-90">
                <circle
                  cx="64"
                  cy="64"
                  r="56"
                  stroke="currentColor"
                  strokeWidth="8"
                  fill="none"
                  className="text-slate-200 dark:text-slate-800"
                />
                <circle
                  cx="64"
                  cy="64"
                  r="56"
                  stroke="currentColor"
                  strokeWidth="8"
                  fill="none"
                  strokeDasharray={`${2 * Math.PI * 56}`}
                  strokeDashoffset={`${2 * Math.PI * 56 * (1 - percentage / 100)}`}
                  className={`transition-all duration-1000 ${isPerfect ? 'text-green-600 dark:text-green-400' :
                    isGood ? 'text-blue-600 dark:text-blue-400' :
                      'text-amber-600 dark:text-amber-400'
                    }`}
                  strokeLinecap="round"
                />
              </svg>
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="text-center">
                  <div className="text-3xl font-bold text-slate-900 dark:text-slate-100">
                    {percentage}%
                  </div>
                </div>
              </div>
            </div>

            {/* Score Text */}
            <div>
              <p className="text-lg font-medium text-slate-900 dark:text-slate-100">
                {score} out of {totalQuestions} correct
              </p>
              <p className="text-sm text-slate-600 dark:text-slate-400 mt-1">
                {isPerfect ? "Perfect score! Excellent work!" :
                  isGood ? "Great job! You've mastered most concepts." :
                    "Good effort! Review the material and try again."}
              </p>
            </div>
          </div>

          {/* Restart Button */}
          <button
            type="button"
            onClick={resetQuiz}
            className="mt-8 inline-flex items-center gap-2 px-6 py-3 
                     bg-slate-900 dark:bg-slate-100 
                     text-white dark:text-slate-900 
                     rounded-lg font-semibold text-sm
                     hover:bg-slate-800 dark:hover:bg-slate-200
                     transition-all"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
            </svg>
            Try Again
          </button>
        </div>
      </section>
    );
  }

  // Active quiz view
  const selectedOption = currentQuestion ? responses[currentQuestion.id] : null;
  const userIsCorrect = currentQuestion && selectedOption === currentQuestion.answer;
  const correctOption =
    currentQuestion && currentQuestion.options.find((opt) => opt.id === currentQuestion.answer);

  return (
    <section className="mt-12 rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900/50 overflow-hidden">
      {/* Header */}
      <div className="px-6 py-5 border-b border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-800/30">
        <div className="flex items-center justify-between gap-4">
          <div>
            <h2 className="text-xl font-semibold text-slate-900 dark:text-slate-100">
              {title}
            </h2>
            <p className="text-sm text-slate-600 dark:text-slate-400 mt-1">
              Select an answer to see feedback
            </p>
          </div>
          <div className="flex items-center gap-2 text-sm text-slate-600 dark:text-slate-400">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
            </svg>
            <span>{currentIndex + 1} / {totalQuestions}</span>
          </div>
        </div>

        {/* Progress bar */}
        <div className="mt-4 h-1 bg-slate-200 dark:bg-slate-800 rounded-full overflow-hidden">
          <div
            className="h-full bg-slate-900 dark:bg-slate-100 transition-all duration-300"
            style={{ width: `${((currentIndex + 1) / totalQuestions) * 100}%` }}
          />
        </div>
      </div>

      {/* Question */}
      {currentQuestion && (
        <div className="p-6">
          <div className="mb-6">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-100 dark:bg-slate-800 text-xs font-medium text-slate-700 dark:text-slate-300 mb-3">
              Question {currentIndex + 1}
            </div>
            <h3 className="text-lg font-medium text-slate-900 dark:text-slate-100 leading-relaxed">
              {currentQuestion.prompt}
            </h3>
          </div>

          {/* Options */}
          <div className="space-y-3">
            {currentQuestion.options.map((option) => {
              const isSelected = selectedOption === option.id;
              const isCorrect = currentQuestion.answer === option.id;

              let baseClasses = "flex items-center justify-between w-full px-4 py-3 rounded-lg border text-left transition-all";
              let stateClasses = "";

              if (showFeedback) {
                if (isCorrect) {
                  stateClasses = "border-green-500 dark:border-green-600 bg-green-50 dark:bg-green-950/30 cursor-not-allowed";
                } else if (isSelected && !isCorrect) {
                  stateClasses = "border-red-500 dark:border-red-600 bg-red-50 dark:bg-red-950/30 cursor-not-allowed";
                } else {
                  stateClasses = "border-slate-200 dark:border-slate-800 opacity-50 cursor-not-allowed";
                }
              } else {
                if (isSelected) {
                  stateClasses = "border-slate-400 dark:border-slate-600 bg-slate-100 dark:bg-slate-800";
                } else {
                  stateClasses = "border-slate-200 dark:border-slate-800 hover:border-slate-300 dark:hover:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-800/50";
                }
              }

              return (
                <button
                  key={option.id}
                  type="button"
                  onClick={() => handleOptionSelect(currentQuestion.id, option.id)}
                  className={`${baseClasses} ${stateClasses}`}
                  disabled={showFeedback}
                >
                  <span className="text-slate-900 dark:text-slate-100 font-medium">
                    {option.label}
                  </span>

                  {showFeedback && isCorrect && (
                    <span className="flex items-center gap-1 text-sm font-medium text-green-700 dark:text-green-400">
                      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                      </svg>
                      Correct
                    </span>
                  )}

                  {showFeedback && isSelected && !isCorrect && (
                    <span className="flex items-center gap-1 text-sm font-medium text-red-700 dark:text-red-400">
                      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                      </svg>
                      Incorrect
                    </span>
                  )}
                </button>
              );
            })}
          </div>

          {/* Feedback */}
          {showFeedback && (
            <div className={`mt-6 p-4 rounded-lg border ${userIsCorrect
              ? 'border-green-200 dark:border-green-900 bg-green-50 dark:bg-green-950/30'
              : 'border-amber-200 dark:border-amber-900 bg-amber-50 dark:bg-amber-950/30'
              }`}>
              <div className="flex items-start gap-3">
                {userIsCorrect ? (
                  <svg className="w-5 h-5 text-green-700 dark:text-green-400 flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                ) : (
                  <svg className="w-5 h-5 text-amber-700 dark:text-amber-400 flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                  </svg>
                )}
                <div className="flex-1 text-sm">
                  <p className={`font-semibold mb-1 ${userIsCorrect
                    ? 'text-green-900 dark:text-green-100'
                    : 'text-amber-900 dark:text-amber-100'
                    }`}>
                    {userIsCorrect ? "That's correct!" : "Not quite right"}
                  </p>
                  <p className={userIsCorrect
                    ? 'text-green-800 dark:text-green-200'
                    : 'text-amber-800 dark:text-amber-200'
                  }>
                    {currentQuestion.explanation}
                    {!userIsCorrect && correctOption && (
                      <span className="font-medium"> The correct answer is: {correctOption.label}</span>
                    )}
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* Actions */}
          <div className="mt-6 flex items-center gap-3">
            <button
              type="button"
              onClick={handleAdvance}
              disabled={!showFeedback}
              className={`flex items-center gap-2 px-6 py-3 rounded-lg font-semibold text-sm transition-all ${showFeedback
                ? 'bg-slate-900 dark:bg-slate-100 text-white dark:text-slate-900 hover:bg-slate-800 dark:hover:bg-slate-200'
                : 'bg-slate-200 dark:bg-slate-800 text-slate-400 dark:text-slate-600 cursor-not-allowed'
                }`}
            >
              {currentIndex === totalQuestions - 1 ? 'See Results' : 'Next Question'}
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
              </svg>
            </button>

            <button
              type="button"
              onClick={resetQuiz}
              className="px-4 py-3 rounded-lg font-semibold text-sm 
                       border border-slate-300 dark:border-slate-700
                       text-slate-700 dark:text-slate-300
                       hover:bg-slate-100 dark:hover:bg-slate-800
                       transition-all"
            >
              Restart
            </button>
          </div>
        </div>
      )}
    </section>
  );
}