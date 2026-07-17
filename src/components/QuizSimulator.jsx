import React, { useState, useEffect, useRef } from 'react';
import { Trophy, ArrowRight, CheckCircle2, XCircle, Timer, AlertCircle, ArrowLeft, Sparkles } from 'lucide-react';
import { MOCK_QUESTIONS, INITIAL_LIVE_LEADERBOARD_PLAYERS } from '../data/mockData';

export default function QuizSimulator({ theme, quiz, onBack, onFinishQuiz }) {
  const questions = MOCK_QUESTIONS[quiz.id] || MOCK_QUESTIONS['q1'];
  const [started, setStarted] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState(null);
  const [isAnswered, setIsAnswered] = useState(false);
  const [score, setScore] = useState(760); // Starts at the initial 760 user score from Image 1!
  const [correctAnswers, setCorrectAnswers] = useState(0);
  const [timeLeft, setTimeLeft] = useState(quiz.durationMinutes * 60);
  const [livePlayers, setLivePlayers] = useState(() => {
    return INITIAL_LIVE_LEADERBOARD_PLAYERS.map(p => ({ ...p }));
  });

  const timerRef = useRef(null);

  // Countdown timer effect
  useEffect(() => {
    if (started && timeLeft > 0) {
      timerRef.current = setInterval(() => {
        setTimeLeft((prev) => {
          if (prev <= 1) {
            clearInterval(timerRef.current);
            handleCompleteQuiz();
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    }
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [started, timeLeft]);

  // Dynamic leaderboard update effect - simulates other players playing as well!
  useEffect(() => {
    if (!started || isAnswered) return;

    // Every 4 seconds, occasionally increase other players' scores slightly to make the competition feel active!
    const interval = setInterval(() => {
      setLivePlayers((prevPlayers) => {
        const updated = prevPlayers.map((p) => {
          if (p.isUser) return p;
          // Add random score increment for active feel
          const isScoring = Math.random() > 0.4;
          if (isScoring) {
            const added = Math.floor(Math.random() * 80) + 40;
            return {
              ...p,
              score: p.score + added,
              ptsPerMin: Math.floor((p.score + added) / 100),
            };
          }
          return p;
        });

        // Recalculate ranks based on scores
        return sortAndRankPlayers(updated);
      });
    }, 4000);

    return () => clearInterval(interval);
  }, [started, isAnswered]);

  const sortAndRankPlayers = (playersList) => {
    const sorted = [...playersList].sort((a, b) => b.score - a.score);
    return sorted.map((player, idx) => ({
      ...player,
      rank: idx + 1,
    }));
  };

  const handleSelectOption = (idx) => {
    if (isAnswered) return;
    setSelectedOption(idx);
  };

  const handleSubmitAnswer = () => {
    if (selectedOption === null || isAnswered) return;

    const currentQuestion = questions[currentIndex];
    const isCorrect = selectedOption === currentQuestion.correctAnswerIndex;

    let scoreIncrement = 0;
    if (isCorrect) {
      scoreIncrement = 250; // Each correct question adds 250 pts
      setCorrectAnswers((prev) => prev + 1);
    }

    const newScore = score + scoreIncrement;
    setScore(newScore);
    setIsAnswered(true);

    // Immediately update user score in live list and resort ranking
    setLivePlayers((prevPlayers) => {
      const updated = prevPlayers.map((p) => {
        if (p.isUser) {
          return {
            ...p,
            score: newScore,
            ptsPerMin: Math.floor(newScore / 90),
          };
        }
        return p;
      });
      return sortAndRankPlayers(updated);
    });
  };

  const handleNextQuestion = () => {
    if (currentIndex + 1 < questions.length) {
      setCurrentIndex((prev) => prev + 1);
      setSelectedOption(null);
      setIsAnswered(false);
    } else {
      handleCompleteQuiz();
    }
  };

  const handleCompleteQuiz = () => {
    if (timerRef.current) clearInterval(timerRef.current);
    // Find current user rank
    const userInList = livePlayers.find((p) => p.isUser);
    const finalRank = userInList ? userInList.rank : 12;
    onFinishQuiz(score, finalRank);
  };

  const formatTime = (seconds) => {
    const m = Math.floor(seconds / 60).toString().padStart(2, '0');
    const s = (seconds % 60).toString().padStart(2, '0');
    return `${m}:${s}`;
  };

  // Find user's current index or position in live players
  const userRankObj = livePlayers.find((p) => p.isUser);
  const userRank = userRankObj ? userRankObj.rank : 12;

  // Render start panel
  if (!started) {
    return (
      <div id="quiz-start-panel" className="max-w-4xl mx-auto space-y-8 text-left">
        {/* Back Button */}
        <button
          id="back-to-events-btn"
          onClick={onBack}
          className={`flex items-center gap-2 text-sm font-semibold transition-all ${
            theme === 'dark' ? 'text-gray-400 hover:text-white' : 'text-gray-500 hover:text-gray-800'
          }`}
        >
          <ArrowLeft size={16} />
          Back to Events
        </button>

        <div
          id="quiz-intro-card"
          className={`rounded-3xl p-6 md:p-10 border transition-all duration-300 ${
            theme === 'dark'
              ? 'bg-[#121324] border-gray-800 text-white'
              : 'bg-white border-gray-100 text-gray-800 shadow-xl'
          }`}
        >
          <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center">
            {/* Left side details */}
            <div className="md:col-span-7 space-y-6">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[11px] font-bold uppercase tracking-wider bg-red-500/10 text-red-500 border border-red-500/20">
                <span className="w-1.5 h-1.5 rounded-full bg-red-500 animate-ping" />
                Live Tournament
              </span>

              <h2 className="text-3xl font-display font-extrabold tracking-tight">
                {quiz.title}
              </h2>

              <p className={theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}>
                Welcome to the official live arena tournament. Answer questions as fast and accurately as possible to climb the leaderboard! Every correct answer increases your points and raises your position in real-time.
              </p>

              <div className="grid grid-cols-2 gap-4">
                <div className={`p-4 rounded-xl border ${theme === 'dark' ? 'bg-[#181a30] border-gray-800' : 'bg-gray-50 border-gray-100'}`}>
                  <p className="text-xs text-gray-500 dark:text-gray-400">Questions</p>
                  <p className="text-xl font-bold font-display">{questions.length} Items</p>
                </div>
                <div className={`p-4 rounded-xl border ${theme === 'dark' ? 'bg-[#181a30] border-gray-800' : 'bg-gray-50 border-gray-100'}`}>
                  <p className="text-xs text-gray-500 dark:text-gray-400">Duration Limit</p>
                  <p className="text-xl font-bold font-display">{quiz.durationMinutes} Minutes</p>
                </div>
              </div>

              <button
                id="start-quiz-btn"
                onClick={() => setStarted(true)}
                className="w-full md:w-auto px-8 py-3.5 rounded-xl text-sm font-semibold bg-gradient-to-r from-violet-600 to-indigo-600 hover:from-violet-500 hover:to-indigo-500 text-white shadow-lg shadow-violet-500/20 transition-all flex items-center justify-center gap-2 hover:-translate-y-0.5 active:translate-y-0"
              >
                <span>Enter Live Arena</span>
                <ArrowRight size={16} />
              </button>
            </div>

            {/* Right side interactive graphic: Trophy pedestal */}
            <div className="md:col-span-5 flex flex-col items-center justify-center border-l border-gray-100 dark:border-gray-800/50 pl-0 md:pl-8 py-4">
              <div className="relative w-40 h-40 flex items-center justify-center">
                <div className="absolute inset-0 bg-violet-600/10 blur-2xl rounded-full" />
                <Trophy size={64} className="text-amber-500 animate-bounce relative z-10" />
              </div>
              <div className="text-center space-y-1">
                <p className="font-display font-bold text-lg">Current Base Score</p>
                <p className="text-2xl font-mono font-bold text-violet-500">{score} pts</p>
                <p className="text-xs text-gray-400">Rank #12 on Live Leaderboard</p>
              </div>
            </div>
          </div>
        </div>

        {/* How it Works step-by-step indicator */}
        <div id="how-it-works-panel" className="space-y-6">
          <h3 className="text-lg font-bold font-display tracking-tight text-center md:text-left">
            How Live Quiz Arena Works
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            {[
              { step: '1', title: 'Join a Live Quiz', desc: 'Pick an active quiz that is happening now on the board.' },
              { step: '2', title: 'Answer Questions', desc: 'Answer as fast and accurately as possible to score maximum.' },
              { step: '3', title: 'Climb the Rank', desc: 'Your live position adapts on the scoreboard in real-time.' },
              { step: '4', title: 'Win Rewards', desc: 'Standings lock at completion, rewarding top champions.' }
            ].map((step, idx) => (
              <div
                key={idx}
                className={`p-5 rounded-2xl border text-left flex gap-3 ${
                  theme === 'dark' ? 'bg-[#121324] border-gray-800' : 'bg-white border-gray-100 shadow-sm'
                }`}
              >
                <div className="w-8 h-8 rounded-lg bg-violet-500/10 border border-violet-500/20 text-violet-500 font-bold text-sm flex items-center justify-center shrink-0">
                  {step.step}
                </div>
                <div className="space-y-1">
                  <h4 className="font-bold text-sm">{step.title}</h4>
                  <p className="text-xs text-gray-500 dark:text-gray-400 leading-relaxed">{step.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  // Active question render
  const currentQuestion = questions[currentIndex];

  return (
    <div id="active-quiz-container" className="max-w-7xl mx-auto space-y-8 text-left">
      {/* Top status bar */}
      <div id="quiz-status-header" className="flex flex-wrap gap-4 items-center justify-between">
        <div className="flex items-center gap-3">
          <button
            onClick={() => {
              if (confirm('Are you sure you want to quit the live quiz? Progress will be lost.')) {
                onBack();
              }
            }}
            className={`p-2 rounded-xl border transition-colors ${
              theme === 'dark'
                ? 'bg-gray-900 border-gray-800 text-gray-400 hover:text-white'
                : 'bg-gray-50 border-gray-200 text-gray-500 hover:text-gray-800'
            }`}
          >
            <ArrowLeft size={16} />
          </button>
          <div>
            <h2 className="font-display font-bold text-lg">{quiz.title}</h2>
            <p className="text-xs text-gray-500 dark:text-gray-400">Live Tournament Lobby</p>
          </div>
        </div>

        {/* Circular Countdown Timer */}
        <div
          id="quiz-timer"
          className={`flex items-center gap-3 px-4 py-2 rounded-2xl border ${
            theme === 'dark' ? 'bg-[#121324] border-gray-800 text-white' : 'bg-white border-gray-100 shadow-sm text-gray-800'
          }`}
        >
          <Timer size={18} className="text-red-500 animate-pulse" />
          <div className="text-right">
            <p className="text-[10px] text-gray-500 dark:text-gray-400 uppercase font-semibold">Time Remaining</p>
            <p className="text-sm font-mono font-bold text-red-500">{formatTime(timeLeft)}</p>
          </div>
        </div>
      </div>

      {/* Main quiz simulator grid with side leaderboard */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left Side: Question Board */}
        <div
          id="quiz-question-board"
          className={`lg:col-span-8 rounded-3xl p-6 md:p-8 border transition-all duration-300 ${
            theme === 'dark' ? 'bg-[#121324] border-gray-800 text-white' : 'bg-white border-gray-100 text-gray-800 shadow-xl'
          }`}
        >
          {/* Progress row */}
          <div className="flex items-center justify-between mb-6">
            <span className="text-xs font-semibold text-gray-500 dark:text-gray-400">
              QUESTION {currentIndex + 1} OF {questions.length}
            </span>
            <span className="text-xs font-bold text-violet-500 bg-violet-500/10 px-2.5 py-1 rounded-lg">
              +{score - (userRankObj?.score || 760)} pts earned
            </span>
          </div>

          {/* Progress bar */}
          <div className="w-full h-1.5 bg-gray-100 dark:bg-gray-800 rounded-full mb-8 overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-violet-600 to-indigo-600 rounded-full transition-all duration-300"
              style={{ width: `${((currentIndex + 1) / questions.length) * 100}%` }}
            />
          </div>

          {/* Question text */}
          <h3 className="text-xl md:text-2xl font-display font-bold mb-8 leading-snug">
            {currentQuestion.text}
          </h3>

          {/* Answer Options */}
          <div className="space-y-4">
            {currentQuestion.options.map((option, idx) => {
              const letter = String.fromCharCode(65 + idx); // A, B, C, D
              const isSelected = selectedOption === idx;
              const isCorrectOpt = idx === currentQuestion.correctAnswerIndex;

              let cardStyle = 'border-gray-200 dark:border-gray-800 hover:bg-gray-50 dark:hover:bg-white/5';
              let badgeStyle = 'bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400';

              if (isSelected) {
                if (isAnswered) {
                  if (isCorrectOpt) {
                    cardStyle = 'border-emerald-500 bg-emerald-500/10 text-emerald-500';
                    badgeStyle = 'bg-emerald-500 text-white';
                  } else {
                    cardStyle = 'border-red-500 bg-red-500/10 text-red-500';
                    badgeStyle = 'bg-red-500 text-white';
                  }
                } else {
                  cardStyle = 'border-violet-600 bg-violet-600/10 text-violet-500';
                  badgeStyle = 'bg-violet-600 text-white';
                }
              } else if (isAnswered && isCorrectOpt) {
                // Show the correct answer if user got it wrong
                cardStyle = 'border-emerald-500/60 bg-emerald-500/5 text-emerald-500';
                badgeStyle = 'bg-emerald-500/20 text-emerald-500';
              }

              return (
                <button
                  key={idx}
                  id={`option-btn-${letter}`}
                  onClick={() => handleSelectOption(idx)}
                  disabled={isAnswered}
                  className={`w-full flex items-center justify-between p-4.5 rounded-2xl border text-left font-medium transition-all duration-150 ${cardStyle}`}
                >
                  <div className="flex items-center gap-4">
                    <span className={`w-8 h-8 rounded-xl font-bold flex items-center justify-center shrink-0 text-sm ${badgeStyle}`}>
                      {letter}
                    </span>
                    <span className="text-sm md:text-base leading-relaxed">{option}</span>
                  </div>

                  {/* Feedback icons */}
                  {isAnswered && (
                    <div>
                      {isCorrectOpt && <CheckCircle2 size={20} className="text-emerald-500" />}
                      {!isCorrectOpt && isSelected && <XCircle size={20} className="text-red-500" />}
                    </div>
                  )}
                </button>
              );
            })}
          </div>

          {/* Action Footer */}
          <div className="mt-8 pt-6 border-t border-gray-100 dark:border-gray-800/50 flex items-center justify-between">
            <div className="text-xs text-gray-400">
              {isAnswered ? (
                selectedOption === currentQuestion.correctAnswerIndex ? (
                  <span className="text-emerald-500 font-bold flex items-center gap-1">
                    <Sparkles size={14} /> Correct answer! (+250 points)
                  </span>
                ) : (
                  <span className="text-red-500 font-bold flex items-center gap-1">
                    <AlertCircle size={14} /> Incorrect answer. No points added.
                  </span>
                )
              ) : (
                'Select an option and submit your answer'
              )}
            </div>

            {!isAnswered ? (
              <button
                id="submit-answer-btn"
                onClick={handleSubmitAnswer}
                disabled={selectedOption === null}
                className={`px-6 py-2.5 rounded-xl text-sm font-semibold transition-all ${
                  selectedOption !== null
                    ? 'bg-violet-600 text-white hover:bg-violet-500 shadow-md shadow-violet-500/10'
                    : 'bg-gray-100 dark:bg-gray-800 text-gray-400 dark:text-gray-600 cursor-not-allowed'
                }`}
              >
                Submit Answer
              </button>
            ) : (
              <button
                id="next-question-btn"
                onClick={handleNextQuestion}
                className="px-6 py-2.5 rounded-xl text-sm font-semibold bg-violet-600 hover:bg-violet-500 text-white shadow-md shadow-violet-500/10 transition-all flex items-center gap-1"
              >
                <span>{currentIndex + 1 < questions.length ? 'Next Question' : 'Complete Quiz'}</span>
                <ArrowRight size={14} />
              </button>
            )}
          </div>
        </div>

        {/* Right Side: Live Mini Leaderboard */}
        <div className="lg:col-span-4 space-y-4">
          <div
            className={`rounded-3xl p-5 border transition-all duration-300 ${
              theme === 'dark' ? 'bg-[#121324] border-gray-800 text-white' : 'bg-white border-gray-100 text-gray-800 shadow-xl'
            }`}
          >
            <div className="flex items-center justify-between mb-4 pb-3 border-b border-gray-100 dark:border-gray-800/50">
              <div className="flex items-center gap-2">
                <Trophy size={16} className="text-amber-500" />
                <h4 className="font-display font-bold text-sm">Live Rankings</h4>
              </div>
              <span className="flex items-center gap-1 text-[10px] font-semibold text-red-500 bg-red-500/5 px-2 py-0.5 rounded">
                <span className="w-1.5 h-1.5 rounded-full bg-red-500 animate-ping" />
                REAL-TIME
              </span>
            </div>

            {/* Micro Player List */}
            <div className="space-y-2 max-h-[380px] overflow-y-auto pr-1">
              {livePlayers.slice(0, 8).map((p) => {
                const isMe = p.isUser;
                return (
                  <div
                    key={p.id}
                    className={`flex items-center justify-between p-2 rounded-xl border transition-all ${
                      isMe
                        ? 'bg-violet-600/15 border-violet-500/30'
                        : theme === 'dark'
                        ? 'bg-gray-900/40 border-gray-800/60'
                        : 'bg-gray-50 border-gray-100'
                    }`}
                  >
                    <div className="flex items-center gap-2">
                      <span className="w-5 text-center text-xs font-bold font-mono text-gray-400">
                        {p.rank}
                      </span>
                      <div className="w-7 h-7 rounded-lg bg-gradient-to-tr from-violet-500 to-indigo-500 text-white text-[11px] font-bold flex items-center justify-center shrink-0">
                        {p.avatar}
                      </div>
                      <span className={`text-xs font-semibold truncate max-w-[100px] ${isMe ? 'text-violet-400 font-bold' : ''}`}>
                        {p.name.replace(' (Khwahish Seth)', '')}
                      </span>
                    </div>

                    <div className="flex items-center gap-2">
                      <span className="text-xs font-bold font-mono">{p.score}</span>
                      {isMe && (
                        <span className="text-[9px] font-bold uppercase tracking-wider bg-violet-600 text-white px-1.5 py-0.5 rounded">
                          You
                        </span>
                      )}
                    </div>
                  </div>
                );
              })}

              {/* Show "You" at bottom if not in top 8 */}
              {userRank > 8 && (
                <>
                  <div className="text-center text-[10px] text-gray-500 py-1">•••</div>
                  {livePlayers.filter(p => p.isUser).map((p) => (
                    <div
                      key={p.id}
                      className="flex items-center justify-between p-2 rounded-xl border bg-violet-600/15 border-violet-500/30"
                    >
                      <div className="flex items-center gap-2">
                        <span className="w-5 text-center text-xs font-bold font-mono text-violet-400">
                          {p.rank}
                        </span>
                        <div className="w-7 h-7 rounded-lg bg-gradient-to-tr from-violet-500 to-indigo-500 text-white text-[11px] font-bold flex items-center justify-center shrink-0">
                          {p.avatar}
                        </div>
                        <span className="text-xs font-bold text-violet-400">
                          You (Khwahish)
                        </span>
                      </div>

                      <div className="flex items-center gap-2">
                        <span className="text-xs font-bold font-mono text-violet-400">{p.score}</span>
                      </div>
                    </div>
                  ))}
                </>
              )}
            </div>
          </div>

          {/* Tips / Interactive banner */}
          <div
            className={`p-5 rounded-3xl border ${
              theme === 'dark' ? 'bg-[#181a30]/80 border-gray-800' : 'bg-violet-50/50 border-violet-100'
            }`}
          >
            <p className="text-[11px] font-semibold text-violet-500 uppercase tracking-wider mb-1">PRO TIP</p>
            <p className="text-xs text-gray-500 dark:text-gray-400 leading-relaxed font-sans">
              Accuracy keeps you stable, but speed grants bonus ratings. Correct answers unlock combo streaks!
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
