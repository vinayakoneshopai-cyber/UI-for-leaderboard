import React from 'react';
import { motion } from 'motion/react';
import { Zap, Gift, BarChart2, Target, Users, Play, Clock, Sparkles } from 'lucide-react';
import { MOCK_QUIZZES } from '../data/mockData';

export default function EventsView({ theme, onJoinQuiz }) {
  const whyArenaCards = [
    {
      title: 'Live Competitions',
      desc: 'Join live quizzes and compete in real-time.',
      icon: Zap,
      color: 'text-violet-500 bg-violet-500/10 border-violet-500/20',
      gradient: 'from-violet-500/10 to-transparent',
    },
    {
      title: 'Real Rewards',
      desc: 'Win exciting prizes and recognition.',
      icon: Gift,
      color: 'text-amber-500 bg-amber-500/10 border-amber-500/20',
      gradient: 'from-amber-500/10 to-transparent',
    },
    {
      title: 'Global Leaderboard',
      desc: 'Climb the ranks and become the champion.',
      icon: BarChart2,
      color: 'text-emerald-500 bg-emerald-500/10 border-emerald-500/20',
      gradient: 'from-emerald-500/10 to-transparent',
    },
    {
      title: 'Track Progress',
      desc: 'Monitor your stats and improve daily.',
      icon: Target,
      color: 'text-sky-500 bg-sky-500/10 border-sky-500/20',
      gradient: 'from-sky-500/10 to-transparent',
    },
  ];

  return (
    <div id="events-view-container" className="space-y-16">
      {/* Hero Banner Section */}
      <section
        id="hero-banner-section"
        className={`relative overflow-hidden rounded-3xl p-8 md:p-12 border transition-all duration-300 ${
          theme === 'dark'
            ? 'bg-gradient-to-br from-[#121324] via-[#0e0f1d] to-[#080911] border-gray-800'
            : 'bg-gradient-to-br from-[#fafaff] via-[#f5f6ff] to-[#ebeeff] border-gray-200'
        }`}
      >
        {/* Glow circles for dark theme */}
        {theme === 'dark' && (
          <>
            <div className="absolute top-1/4 -left-12 w-64 h-64 rounded-full bg-violet-600/10 blur-[100px] pointer-events-none" />
            <div className="absolute bottom-1/4 -right-12 w-72 h-72 rounded-full bg-indigo-600/10 blur-[100px] pointer-events-none" />
          </>
        )}

        <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          {/* Hero Left Info */}
          <div className="lg:col-span-7 space-y-6 text-left">
            <span
              id="hero-badge"
              className={`inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full text-xs font-semibold tracking-wider uppercase border ${
                theme === 'dark'
                  ? 'bg-violet-500/10 text-violet-400 border-violet-500/20'
                  : 'bg-violet-50 text-violet-600 border-violet-100'
              }`}
            >
              <Sparkles size={12} className="animate-pulse" />
              The Arena
            </span>

            <h1 id="hero-title" className="text-4xl md:text-5xl lg:text-6xl font-display font-extrabold tracking-tight leading-tight">
              Compete. Climb.{' '}
              <span className="bg-gradient-to-r from-violet-500 via-indigo-500 to-purple-500 bg-clip-text text-transparent">
                Win.
              </span>
            </h1>

            <p
              id="hero-description"
              className={`text-base md:text-lg max-w-xl leading-relaxed ${
                theme === 'dark' ? 'text-gray-400' : 'text-gray-600'
              }`}
            >
              Live quizzes, hackathons and tournaments with real prizes. Register, play, and rise up the global leaderboard. Track your rank, compare with others, and reach the pinnacle.
            </p>

            <div id="hero-actions" className="flex flex-wrap gap-4 pt-2">
              <button
                id="hero-explore-btn"
                onClick={() => {
                  const element = document.getElementById('live-quizzes-section');
                  element?.scrollIntoView({ behavior: 'smooth' });
                }}
                className="px-6 py-3 rounded-xl bg-gradient-to-r from-violet-600 to-indigo-600 hover:from-violet-500 hover:to-indigo-500 text-white font-medium shadow-lg shadow-violet-500/20 hover:shadow-violet-500/35 transition-all flex items-center gap-2 group hover:-translate-y-0.5 active:translate-y-0 active:scale-98"
              >
                <span>Explore Events</span>
                <Play size={16} fill="currentColor" className="group-hover:translate-x-0.5 transition-transform" />
              </button>
            </div>
          </div>

          {/* Hero Right Visual: 3D-styled CSS Trophy Podiums */}
          <div id="hero-trophy-container" className="lg:col-span-5 flex justify-center items-center relative py-8">
            <div className="relative w-72 h-72 flex items-center justify-center">
              {/* Pulsing glow circles behind */}
              <div className="absolute inset-0 rounded-full bg-violet-500/5 dark:bg-violet-500/15 animate-ping-slow pointer-events-none" />
              <div className="absolute inset-8 rounded-full bg-indigo-500/10 dark:bg-indigo-500/20 blur-xl pointer-events-none" />

              {/* Pedestal */}
              <div className="absolute bottom-4 w-48 h-10 rounded-full bg-gradient-to-t from-gray-300 to-gray-200 dark:from-gray-900 dark:to-gray-800 border border-gray-400/20 dark:border-white/10 shadow-2xl flex items-center justify-center">
                <div className="absolute -inset-1 rounded-full bg-violet-500/20 blur opacity-70" />
              </div>

              {/* Trophy Cup */}
              <motion.div
                id="interactive-trophy"
                animate={{ y: [0, -10, 0] }}
                transition={{ repeat: Infinity, duration: 4, ease: 'easeInOut' }}
                className="relative z-10 flex flex-col items-center"
              >
                {/* Trophy Base */}
                <div className="w-16 h-4 bg-gradient-to-r from-amber-600 to-amber-700 rounded-lg shadow-md" />
                {/* Trophy Stem */}
                <div className="w-6 h-12 bg-gradient-to-r from-amber-500 to-amber-600" />
                {/* Trophy Main Cup */}
                <div className="relative w-28 h-28 bg-gradient-to-tr from-amber-400 via-amber-500 to-yellow-300 rounded-b-full shadow-lg flex items-center justify-center">
                  {/* Star Emblem on cup */}
                  <div className="w-10 h-10 rounded-full bg-amber-300/30 flex items-center justify-center animate-pulse">
                    <Sparkles size={20} className="text-yellow-100" />
                  </div>

                  {/* Cup Ear handles */}
                  <div className="absolute -left-4 top-2 w-6 h-14 border-4 border-amber-500 rounded-l-full border-r-0" />
                  <div className="absolute -right-4 top-2 w-6 h-14 border-4 border-amber-500 rounded-r-full border-l-0" />
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* Why Arena Section */}
      <section id="why-arena-section" className="space-y-8">
        <div id="why-arena-title-area" className="text-center max-w-xl mx-auto space-y-2">
          <h2 className="text-3xl font-display font-extrabold tracking-tight">Why Arena?</h2>
          <p className={theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}>
            Everything you need to compete, level up your knowledge, and stand on the global podium.
          </p>
        </div>

        <div id="why-arena-grid" className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {whyArenaCards.map((card, idx) => {
            const Icon = card.icon;
            return (
              <div
                key={idx}
                id={`why-arena-card-${idx}`}
                className={`p-6 rounded-2xl border text-left transition-all duration-300 hover:scale-[1.03] ${
                  theme === 'dark'
                    ? 'bg-[#121324] border-gray-800 hover:border-violet-500/50 shadow-[0_4px_20px_rgba(0,0,0,0.2)]'
                    : 'bg-white border-gray-100 hover:border-violet-300 shadow-md shadow-gray-100/50'
                }`}
              >
                <div className={`w-11 h-11 rounded-xl flex items-center justify-center border mb-5 ${card.color}`}>
                  <Icon size={20} />
                </div>
                <h3 className="font-display font-bold text-lg mb-2">{card.title}</h3>
                <p className={`text-sm leading-relaxed ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>
                  {card.desc}
                </p>
              </div>
            );
          })}
        </div>
      </section>

      {/* Live Now Section */}
      <section id="live-quizzes-section" className="space-y-6 text-left">
        <div id="live-quizzes-header" className="flex items-center justify-between">
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <h2 className="text-2xl font-display font-bold tracking-tight">Live Now</h2>
              <span className="flex items-center gap-1.5 px-2 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider bg-red-500/10 text-red-500 animate-pulse border border-red-500/20">
                <span className="w-1.5 h-1.5 rounded-full bg-red-500" />
                Live
              </span>
            </div>
            <p className={`text-sm ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>
              Join ongoing events and test your skills!
            </p>
          </div>
        </div>

        <div id="live-quizzes-grid" className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
          {MOCK_QUIZZES.map((quiz) => (
            <div
              key={quiz.id}
              id={`quiz-card-${quiz.id}`}
              className={`rounded-2xl border flex flex-col transition-all duration-300 hover:-translate-y-1 shadow-lg ${
                theme === 'dark'
                  ? 'bg-[#121324] border-gray-800 hover:border-violet-500/30'
                  : 'bg-white border-gray-100 hover:border-violet-200'
              }`}
            >
              {/* Card Banner */}
              <div className="p-5 flex-1 space-y-4">
                <div className="flex items-center justify-between">
                  <span
                    className={`text-xs px-2.5 py-1 rounded-lg font-medium ${
                      theme === 'dark'
                        ? 'bg-violet-500/10 text-violet-400 border border-violet-500/10'
                        : 'bg-violet-50 text-violet-600'
                    }`}
                  >
                    {quiz.category}
                  </span>
                  <span className="flex items-center gap-1 text-[11px] font-semibold text-red-500 uppercase bg-red-500/5 px-2 py-0.5 rounded">
                    <span className="w-1 h-1 rounded-full bg-red-500 animate-ping" />
                    LIVE
                  </span>
                </div>

                <div className="space-y-1.5">
                  <h3 className="font-display font-bold text-lg group-hover:text-violet-500 transition-colors">
                    {quiz.title}
                  </h3>
                  <div className="flex items-center gap-4 text-xs text-gray-500 dark:text-gray-400">
                    <span className="flex items-center gap-1">
                      <Clock size={12} />
                      {quiz.questionsCount} Qs • {quiz.durationMinutes} Min
                    </span>
                  </div>
                </div>

                <div className="flex items-center gap-2 pt-2 border-t border-gray-100/50 dark:border-gray-800/50">
                  <Users size={14} className="text-gray-400" />
                  <span className="text-xs text-gray-500 dark:text-gray-400 font-medium">
                    {quiz.playersCount} players online
                  </span>
                </div>
              </div>

              {/* Action */}
              <div className="p-4 pt-0">
                <button
                  id={`join-quiz-btn-${quiz.id}`}
                  onClick={() => onJoinQuiz(quiz.id)}
                  className="w-full py-2.5 px-4 rounded-xl font-medium text-xs bg-gradient-to-r from-violet-600 to-indigo-600 hover:from-violet-500 hover:to-indigo-500 text-white shadow-md shadow-violet-500/10 transition-all flex items-center justify-center gap-2 group/btn"
                >
                  <span>Join Live Quiz</span>
                  <Play size={12} fill="currentColor" className="group-hover/btn:translate-x-0.5 transition-transform" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
