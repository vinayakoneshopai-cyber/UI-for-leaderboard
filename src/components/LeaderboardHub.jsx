import React, { useState } from 'react';
import { Trophy, Calendar, Star, Play, Sparkles, ChevronDown, Award } from 'lucide-react';
import { INITIAL_LIVE_LEADERBOARD_PLAYERS, INITIAL_WEEKLY_PLAYERS, INITIAL_MONTHLY_PLAYERS } from '../data/mockData';

export default function LeaderboardHub({ theme, userLiveScore, userLiveRank, onJoinGKQuiz }) {
  const [activeTab, setActiveTab] = useState('weekly');

  // Dynamic live leaderboard with user score applied
  const livePlayers = INITIAL_LIVE_LEADERBOARD_PLAYERS.map(p => {
    if (p.isUser) {
      return {
        ...p,
        score: userLiveScore,
        rank: userLiveRank
      };
    }
    return p;
  }).sort((a, b) => b.score - a.score);

  // Recalculate ranks after sorting
  const rankedLivePlayers = livePlayers.map((player, idx) => ({
    ...player,
    rank: idx + 1
  }));

  // Top 3 players on Live Leaderboard (to place on the Podium)
  const firstPlace = rankedLivePlayers.find(p => p.rank === 1) || rankedLivePlayers[0];
  const secondPlace = rankedLivePlayers.find(p => p.rank === 2) || rankedLivePlayers[1];
  const thirdPlace = rankedLivePlayers.find(p => p.rank === 3) || rankedLivePlayers[2];

  // The rest (ranks 4 to 8)
  const restLivePlayers = rankedLivePlayers.filter(p => p.rank >= 4 && p.rank <= 8);

  // Check if user is in rest or lower
  const userRankObj = rankedLivePlayers.find(p => p.isUser);
  const userRank = userRankObj ? userRankObj.rank : 12;
  const isUserInRest = userRank >= 4 && userRank <= 8;

  const weeklyPlayers = INITIAL_WEEKLY_PLAYERS;
  const monthlyPlayers = INITIAL_MONTHLY_PLAYERS;

  // State for the inner sub-navigation of All Over Leaderboard
  const [innerTab, setInnerTab] = useState('global');

  // Winners mock data
  const MOCK_WINNERS = [
    { id: 'w1', name: 'Khwahish Seth', avatar: 'KS', eventWon: 'Tech Trivia 2.0', prize: 'Gold Trophy + $150', score: 28760, date: 'July 1, 2026', rank: 1, isUser: true },
    { id: 'w2', name: 'Arjun Verma', avatar: 'AV', eventWon: 'General Knowledge Quiz', prize: 'Silver Trophy + $100', score: 24510, date: 'July 1, 2026', rank: 2 },
    { id: 'w3', name: 'Priya Sharma', avatar: 'PS', eventWon: 'Design Mastermind', prize: 'Bronze Trophy + $50', score: 22840, date: 'June 15, 2026', rank: 3 },
    { id: 'w4', name: 'Rohan Mehta', avatar: 'RM', eventWon: 'Science Challenge', prize: 'Special Certificate + $20', score: 19320, date: 'June 1, 2026', rank: 4 },
    { id: 'w5', name: 'Sneha Iyer', avatar: 'SI', eventWon: 'Math Olympiad', prize: 'Special Certificate + $20', score: 17680, date: 'May 20, 2026', rank: 5 }
  ];

  return (
    <div id="leaderboard-hub-container" className="space-y-10 text-left">
      {/* Page Header */}
      <div id="leaderboard-header-section" className="space-y-4">
        <h1 className="text-4xl md:text-5xl font-display font-extrabold tracking-tight">
          Leaderboards
        </h1>
        <p className="text-xl font-display font-semibold">
          Compete. Climb.{' '}
          <span className="bg-gradient-to-r from-violet-500 via-indigo-500 to-purple-500 bg-clip-text text-transparent">
            Win.
          </span>
        </p>
        <p className={`text-sm ${theme === 'dark' ? 'text-gray-400' : 'text-gray-500'}`}>
          Track your rank, compare with others and rise to the top.
        </p>
      </div>

      {/* Main Grid: Live Quiz (Column 1) & All Over Leaderboard (Column 2) */}
      <div id="leaderboard-main-grid" className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Column 1: Quiz - Live Leaderboard */}
        <div id="live-quiz-col" className="lg:col-span-5 space-y-4">
          <h2 className="text-lg font-bold font-display tracking-tight flex items-center gap-2">
            <span className="text-violet-500 font-bold">1.</span> Quiz – Live Leaderboard
          </h2>

          <div
            id="live-leaderboard-card"
            className={`rounded-3xl p-6 border transition-all duration-300 relative overflow-hidden ${
              theme === 'dark'
                ? 'bg-gradient-to-b from-[#121324] to-[#0e0f1d] border-gray-800 text-white'
                : 'bg-white border-gray-100 text-gray-800 shadow-xl shadow-gray-100/40'
            }`}
          >
            {/* Header row with LIVE Indicator */}
            <div className="flex items-center justify-between mb-8">
              <span className="font-display font-bold text-sm">Live Quiz Leaderboard</span>
              <span className="flex items-center gap-1.5 px-2 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider bg-red-500/10 text-red-500 border border-red-500/20">
                <span className="w-1.5 h-1.5 rounded-full bg-red-500 animate-ping" />
                Live
              </span>
            </div>

            {/* Top 3 PODIUM */}
            <div id="leaderboard-podium" className="grid grid-cols-3 gap-2 items-end pt-4 pb-6 mb-6 border-b border-gray-100/50 dark:border-gray-800/50">
              {/* 2nd Place (Left) */}
              {secondPlace && (
                <div id="podium-2nd" className="flex flex-col items-center">
                  <div className="relative group">
                    <div className="w-12 h-12 rounded-full overflow-hidden border-2 border-slate-300 bg-gradient-to-tr from-slate-400 to-slate-200 flex items-center justify-center font-bold text-white text-sm">
                      {secondPlace.avatar}
                    </div>
                    <div className="absolute -bottom-1.5 left-1/2 -translate-x-1/2 w-5 h-5 rounded-full bg-slate-300 text-slate-800 font-bold text-[10px] flex items-center justify-center border border-white">
                      2
                    </div>
                  </div>
                  <p className="text-xs font-bold mt-3 truncate max-w-[80px]">{secondPlace.name.split(' ')[0]}</p>
                  <p className="text-[11px] font-mono font-bold text-violet-500 dark:text-violet-400 mt-0.5">{secondPlace.score}</p>
                </div>
              )}

              {/* 1st Place (Center - Elevated) */}
              {firstPlace && (
                <div id="podium-1st" className="flex flex-col items-center -translate-y-2">
                  <div className="relative group">
                    {/* Crown Icon */}
                    <div className="absolute -top-5 left-1/2 -translate-x-1/2 text-amber-500 animate-pulse">
                      <Trophy size={16} className="fill-amber-500" />
                    </div>
                    <div className="w-16 h-16 rounded-full overflow-hidden border-4 border-amber-400 bg-gradient-to-tr from-amber-500 to-yellow-300 flex items-center justify-center font-bold text-white text-base shadow-lg shadow-amber-500/10">
                      {firstPlace.avatar}
                    </div>
                    <div className="absolute -bottom-1.5 left-1/2 -translate-x-1/2 w-6 h-6 rounded-full bg-amber-400 text-amber-950 font-bold text-xs flex items-center justify-center border-2 border-white">
                      1
                    </div>
                  </div>
                  <p className="text-sm font-bold mt-3 truncate max-w-[90px] text-amber-600 dark:text-amber-400">{firstPlace.name.split(' ')[0]}</p>
                  <p className="text-xs font-mono font-bold text-violet-500 dark:text-violet-400 mt-0.5">{firstPlace.score}</p>
                </div>
              )}

              {/* 3rd Place (Right) */}
              {thirdPlace && (
                <div id="podium-3rd" className="flex flex-col items-center">
                  <div className="relative group">
                    <div className="w-11 h-11 rounded-full overflow-hidden border-2 border-orange-400 bg-gradient-to-tr from-orange-500 to-orange-300 flex items-center justify-center font-bold text-white text-xs">
                      {thirdPlace.avatar}
                    </div>
                    <div className="absolute -bottom-1.5 left-1/2 -translate-x-1/2 w-5 h-5 rounded-full bg-orange-400 text-orange-950 font-bold text-[10px] flex items-center justify-center border border-white">
                      3
                    </div>
                  </div>
                  <p className="text-xs font-bold mt-3 truncate max-w-[80px]">{thirdPlace.name.split(' ')[0]}</p>
                  <p className="text-[11px] font-mono font-bold text-violet-500 dark:text-violet-400 mt-0.5">{thirdPlace.score}</p>
                </div>
              )}
            </div>

            {/* List entries for 4 - 8 */}
            <div id="live-list-rows" className="space-y-3">
              {restLivePlayers.map((player) => {
                const isMe = player.isUser;
                return (
                  <div
                    key={player.id}
                    className={`flex items-center justify-between px-4 py-2.5 rounded-xl border transition-all ${
                      isMe
                        ? 'bg-violet-600/15 border-violet-500/30 shadow-[0_0_12px_rgba(139,92,246,0.1)]'
                        : theme === 'dark'
                        ? 'bg-gray-900/40 border-gray-800/60'
                        : 'bg-gray-50 border-gray-100'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <span className={`w-5 text-center font-mono text-xs font-bold ${isMe ? 'text-violet-500 dark:text-violet-400' : 'text-gray-400'}`}>
                        {player.rank}
                      </span>
                      <div className="w-8 h-8 rounded-lg bg-gradient-to-tr from-violet-500 to-indigo-500 text-white font-bold text-xs flex items-center justify-center">
                        {player.avatar}
                      </div>
                      <span className={`text-xs md:text-sm font-semibold truncate ${isMe ? 'text-violet-600 dark:text-violet-400 font-bold' : ''}`}>
                        {player.name.replace(' (Khwahish Seth)', '')}
                      </span>
                    </div>

                    <div className="flex items-center gap-3">
                      <span className="font-mono text-xs md:text-sm font-bold text-gray-700 dark:text-gray-300">
                        {player.score}
                      </span>
                      {isMe && (
                        <span className="text-[10px] font-bold uppercase tracking-wider bg-violet-600 text-white px-2 py-0.5 rounded">
                          You
                        </span>
                      )}
                      {!isMe && <Star size={12} className="text-violet-500 fill-violet-500/30" />}
                    </div>
                  </div>
                );
              })}

              {/* Separator / Out-of-bounds user rank */}
              {!isUserInRest && userRank > 3 && userRankObj && (
                <>
                  <div className="text-center text-xs text-gray-400 py-1 font-bold">•••</div>
                  <div className="flex items-center justify-between px-4 py-2.5 rounded-xl border bg-violet-600/15 border-violet-500/30 shadow-[0_0_12px_rgba(139,92,246,0.1)]">
                    <div className="flex items-center gap-3">
                      <span className="w-5 text-center font-mono text-xs font-bold text-violet-500 dark:text-violet-400">
                        {userRank}
                      </span>
                      <div className="w-8 h-8 rounded-lg bg-gradient-to-tr from-violet-500 to-indigo-500 text-white font-bold text-xs flex items-center justify-center">
                        {userRankObj.avatar}
                      </div>
                      <span className="text-xs md:text-sm font-bold text-violet-600 dark:text-violet-400">
                        You
                      </span>
                    </div>

                    <div className="flex items-center gap-3">
                      <span className="font-mono text-xs md:text-sm font-bold text-violet-600 dark:text-violet-400">
                        {userLiveScore}
                      </span>
                      <span className="text-[10px] font-bold uppercase tracking-wider bg-violet-600 text-white px-2 py-0.5 rounded">
                        You
                      </span>
                    </div>
                  </div>
                </>
              )}
            </div>

            {/* Real-time Indicator Footer */}
            <div className="mt-6 pt-4 border-t border-gray-100/50 dark:border-gray-800/50 flex items-center justify-between text-xs text-gray-400">
              <span className="flex items-center gap-1.5 text-gray-500 dark:text-gray-400">
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                Scores update in real-time
              </span>
              <button
                id="live-leaderboard-play-btn"
                onClick={onJoinGKQuiz}
                className="text-violet-500 font-bold hover:underline flex items-center gap-1 text-[11px]"
              >
                Play Live Quiz →
              </button>
            </div>
          </div>
        </div>

        {/* Column 2: Restructured All Over Leaderboard - with Sidebar Navigation options */}
        <div id="all-over-col" className="lg:col-span-7 space-y-4">
          <h2 className="text-lg font-bold font-display tracking-tight flex items-center gap-2">
            <span className="text-violet-500 font-bold">2.</span> All Over Leaderboard – {innerTab === 'global' ? 'Live Rankings' : innerTab === 'winners' ? 'Winners' : innerTab === 'overview' ? 'Overview' : 'My Position'}
          </h2>

          <div
            id="all-over-card"
            className={`rounded-3xl p-6 border transition-all duration-300 relative overflow-hidden ${
              theme === 'dark'
                ? 'bg-[#121324] border-gray-800 text-white'
                : 'bg-white border-gray-100 text-gray-800 shadow-xl shadow-gray-100/40'
            }`}
          >
            {/* Header */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6 pb-4 border-b border-gray-100/50 dark:border-gray-800/50">
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-lg bg-violet-500/10 text-violet-500 flex items-center justify-center">
                    <Trophy size={16} />
                  </div>
                  <h3 className="font-display font-bold text-base">All Over Leaderboard</h3>
                </div>
                <p className={`text-xs ${theme === 'dark' ? 'text-gray-400' : 'text-gray-500'}`}>
                  Explore Global rankings and historical Tournament Winners.
                </p>
              </div>

              {/* Date Indicator box */}
              <div
                className={`flex items-center gap-2 px-3 py-1.5 rounded-xl border text-xs font-medium select-none ${
                  theme === 'dark'
                    ? 'bg-gray-900 border-gray-800 text-gray-300'
                    : 'bg-gray-50 border-gray-100 text-gray-600'
                }`}
              >
                <Calendar size={13} className="text-gray-400" />
                <span>
                  {innerTab === 'winners' ? 'All-Time Champions' : activeTab === 'weekly' ? 'Week of Jul 14 - Jul 20, 2026' : 'July 2026'}
                </span>
                <ChevronDown size={12} className="text-gray-400 ml-1" />
              </div>
            </div>

            {/* Inner Dashboard Layout (Left sidebar controls, Right list details) */}
            <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-start">
              {/* Left sidebar internal navigation */}
              <div className="md:col-span-3 space-y-4">
                <div className="flex flex-col gap-1.5">
                  <button
                    onClick={() => setInnerTab('overview')}
                    className={`flex items-center gap-2 px-3 py-2 rounded-xl text-xs font-bold transition-all text-left ${
                      innerTab === 'overview'
                        ? 'bg-violet-600 text-white'
                        : theme === 'dark'
                        ? 'text-gray-400 hover:text-white hover:bg-white/5'
                        : 'text-gray-500 hover:text-gray-800 hover:bg-gray-50'
                    }`}
                  >
                    <Trophy size={14} />
                    Overview
                  </button>

                  <button
                    onClick={() => setInnerTab('global')}
                    className={`flex items-center gap-2 px-3 py-2 rounded-xl text-xs font-bold transition-all text-left ${
                      innerTab === 'global'
                        ? 'bg-violet-600 text-white'
                        : theme === 'dark'
                        ? 'text-gray-400 hover:text-white hover:bg-white/5'
                        : 'text-gray-500 hover:text-gray-800 hover:bg-gray-50'
                    }`}
                  >
                    <Sparkles size={14} />
                    Global Rankings
                  </button>

                  <button
                    onClick={() => setInnerTab('winners')}
                    className={`flex items-center gap-2 px-3 py-2 rounded-xl text-xs font-bold transition-all text-left ${
                      innerTab === 'winners'
                        ? 'bg-violet-600 text-white'
                        : theme === 'dark'
                        ? 'text-gray-400 hover:text-white hover:bg-white/5'
                        : 'text-gray-500 hover:text-gray-800 hover:bg-gray-50'
                    }`}
                  >
                    <Star size={14} className="fill-current" />
                    Top Winners
                  </button>

                  <button
                    onClick={() => setInnerTab('position')}
                    className={`flex items-center gap-2 px-3 py-2 rounded-xl text-xs font-bold transition-all text-left ${
                      innerTab === 'position'
                        ? 'bg-violet-600 text-white'
                        : theme === 'dark'
                        ? 'text-gray-400 hover:text-white hover:bg-white/5'
                        : 'text-gray-500 hover:text-gray-800 hover:bg-gray-50'
                    }`}
                  >
                    <Award size={14} />
                    My Position
                  </button>
                </div>

                {/* Rank Badge card like in Image 2 */}
                <div
                  className={`p-4 rounded-2xl border text-center space-y-2.5 ${
                    theme === 'dark' ? 'bg-[#181a30]/80 border-gray-800' : 'bg-violet-50/50 border-violet-100'
                  }`}
                >
                  <p className="text-[10px] font-bold text-gray-400 uppercase tracking-wider">Your Rank</p>
                  <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-violet-500/10 text-violet-500 font-extrabold text-2xl font-mono">
                    {userLiveRank}
                  </div>
                  <p className="text-[10px] text-gray-500 dark:text-gray-400">Out of 3,245 players</p>
                  <button
                    onClick={() => setInnerTab('position')}
                    className="w-full py-1.5 rounded-xl bg-violet-600 hover:bg-violet-500 text-white text-[10px] font-bold transition-all"
                  >
                    View My Stats
                  </button>
                </div>
              </div>

              {/* Right main table column */}
              <div className="md:col-span-9 space-y-4">
                {/* 1. OVERVIEW SCREEN */}
                {innerTab === 'overview' && (
                  <div id="overview-inner-tab" className="space-y-4 py-2">
                    <h4 className="font-display font-bold text-sm">Arena Season Leaderboard Summary</h4>
                    <p className="text-xs text-gray-500 dark:text-gray-400 leading-relaxed">
                      Welcome to the Arena season overview. The leaderboard tracks competitive points earned from participating in both live and scheduled events.
                    </p>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                      <div className={`p-4 rounded-xl border ${theme === 'dark' ? 'bg-[#181a30] border-gray-800' : 'bg-gray-50 border-gray-100'}`}>
                        <p className="text-[10px] text-gray-400 uppercase font-bold">Active Competitors</p>
                        <p className="text-lg font-bold">3,245 Players</p>
                      </div>
                      <div className={`p-4 rounded-xl border ${theme === 'dark' ? 'bg-[#181a30] border-gray-800' : 'bg-gray-50 border-gray-100'}`}>
                        <p className="text-[10px] text-gray-400 uppercase font-bold">Next Resets</p>
                        <p className="text-lg font-bold text-violet-500">In 3 Days</p>
                      </div>
                    </div>

                    <div className={`p-4 rounded-xl border flex items-center justify-between ${theme === 'dark' ? 'bg-violet-950/20 border-violet-500/10' : 'bg-violet-50/50 border-violet-100'}`}>
                      <div>
                        <p className="text-xs font-bold text-violet-500">Current Arena Champion</p>
                        <p className="text-sm font-extrabold mt-0.5">Khwahish Seth (You)</p>
                      </div>
                      <Trophy size={24} className="text-amber-500" />
                    </div>
                  </div>
                )}

                {/* 2. GLOBAL RANKINGS TAB */}
                {innerTab === 'global' && (
                  <div id="global-rankings-inner-tab" className="space-y-4">
                    {/* Switcher Weekly/Monthly */}
                    <div className="flex items-center justify-between">
                      <div className="flex gap-1 bg-gray-100 dark:bg-gray-900/60 p-1 rounded-xl border border-gray-200 dark:border-gray-800">
                        <button
                          onClick={() => setActiveTab('weekly')}
                          className={`px-3 py-1 rounded-lg text-xs font-bold transition-all ${
                            activeTab === 'weekly'
                              ? 'bg-violet-600 text-white'
                              : 'text-gray-500 dark:text-gray-400 hover:text-white'
                          }`}
                        >
                          This Week
                        </button>
                        <button
                          onClick={() => setActiveTab('monthly')}
                          className={`px-3 py-1 rounded-lg text-xs font-bold transition-all ${
                            activeTab === 'monthly'
                              ? 'bg-violet-600 text-white'
                              : 'text-gray-500 dark:text-gray-400 hover:text-white'
                          }`}
                        >
                          This Month
                        </button>
                      </div>

                      <span className="text-[11px] text-gray-400 font-semibold uppercase font-sans">
                        {activeTab === 'weekly' ? 'Weekly scores' : 'Monthly scores'}
                      </span>
                    </div>

                    {/* Table headers */}
                    <div className="grid grid-cols-12 gap-2 text-[10px] font-bold text-gray-400 uppercase px-3 pb-1">
                      <span className="col-span-2">Rank</span>
                      <span className="col-span-6">User</span>
                      <span className="col-span-2 text-center">Played</span>
                      <span className="col-span-2 text-right">Score</span>
                    </div>

                    {/* Table row list */}
                    <div className="space-y-2">
                      {(activeTab === 'weekly' ? weeklyPlayers : monthlyPlayers).map((player) => {
                        const isMe = player.isUser;
                        return (
                          <div
                            key={player.id}
                            className={`grid grid-cols-12 gap-2 items-center px-3 py-2.5 rounded-xl border transition-all ${
                              isMe
                                ? 'bg-violet-600/15 border-violet-500/30'
                                : theme === 'dark'
                                ? 'bg-gray-900/40 border-gray-800/60'
                                : 'bg-gray-50 border-gray-100'
                            }`}
                          >
                            <span className="col-span-2 font-mono text-xs font-bold pl-2">{player.rank}</span>
                            <div className="col-span-6 flex items-center gap-2">
                              <div className="w-6.5 h-6.5 rounded-lg bg-gradient-to-tr from-violet-500 to-indigo-500 text-white text-[10px] font-bold flex items-center justify-center shrink-0">
                                {player.avatar}
                              </div>
                              <span className={`text-xs font-bold truncate ${isMe ? 'text-violet-600 dark:text-violet-400' : ''}`}>
                                {player.name}
                              </span>
                            </div>
                            <span className="col-span-2 text-center font-mono text-xs text-gray-500">{player.quizzesPlayed}</span>
                            <span className="col-span-2 text-right font-mono text-xs font-bold pr-2">{player.totalScore.toLocaleString()}</span>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                )}

                {/* 3. TOP WINNERS TAB (THE 2ND LEADERBOARD REQUESTED) */}
                {innerTab === 'winners' && (
                  <div id="winners-inner-tab" className="space-y-4">
                    <div className="flex items-center justify-between">
                      <h4 className="font-display font-extrabold text-xs text-amber-500 uppercase tracking-widest flex items-center gap-1">
                        <Star size={12} className="fill-amber-500" />
                        Hall of Fame Champions
                      </h4>
                      <span className="text-[10px] bg-amber-500/10 text-amber-500 px-2 py-0.5 rounded-lg font-bold border border-amber-500/15">
                        Winners Board
                      </span>
                    </div>

                    {/* Winners table headers */}
                    <div className="grid grid-cols-12 gap-2 text-[10px] font-bold text-gray-400 uppercase px-3 pb-1">
                      <span className="col-span-2">Winner</span>
                      <span className="col-span-5">Champion User</span>
                      <span className="col-span-3">Tournament Won</span>
                      <span className="col-span-2 text-right">Prize / Award</span>
                    </div>

                    {/* Winners list */}
                    <div className="space-y-2">
                      {MOCK_WINNERS.map((winner) => {
                        const isMe = winner.isUser;
                        return (
                          <div
                            key={winner.id}
                            className={`grid grid-cols-12 gap-2 items-center px-3 py-2.5 rounded-xl border transition-all ${
                              isMe
                                ? 'bg-amber-500/10 border-amber-500/30 shadow-[0_0_12px_rgba(245,158,11,0.05)]'
                                : theme === 'dark'
                                ? 'bg-gray-900/40 border-gray-800/60'
                                : 'bg-gray-50 border-gray-100'
                            }`}
                          >
                            {/* Winner Rank Badge (Podium style) */}
                            <div className="col-span-2 flex items-center pl-1">
                              <span
                                className={`w-6 h-6 rounded-lg font-mono text-xs font-bold flex items-center justify-center ${
                                  winner.rank === 1
                                    ? 'bg-amber-400 text-amber-950 shadow-md'
                                    : winner.rank === 2
                                    ? 'bg-slate-300 text-slate-900'
                                    : 'bg-orange-300 text-orange-950'
                                }`}
                              >
                                {winner.rank}
                              </span>
                            </div>

                            {/* Champion profile */}
                            <div className="col-span-5 flex items-center gap-2">
                              <div className="w-6.5 h-6.5 rounded-lg bg-gradient-to-tr from-amber-500 to-yellow-400 text-amber-950 text-[10px] font-bold flex items-center justify-center shrink-0">
                                {winner.avatar}
                              </div>
                              <span className={`text-xs font-bold truncate ${isMe ? 'text-amber-500 font-extrabold' : ''}`}>
                                {winner.name}
                              </span>
                            </div>

                            {/* Event won */}
                            <span className="col-span-3 text-xs text-gray-400 font-medium truncate">
                              {winner.eventWon}
                            </span>

                            {/* Prize */}
                            <span className="col-span-2 text-right text-[11px] font-bold text-amber-500 truncate pr-2">
                              {winner.prize}
                            </span>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                )}

                {/* 4. MY POSITION DETAILS */}
                {innerTab === 'position' && (
                  <div id="position-inner-tab" className="space-y-4 py-2">
                    <h4 className="font-display font-bold text-sm">Your Individual Rating Stats</h4>

                    <div className="grid grid-cols-2 gap-4">
                      <div className={`p-4 rounded-xl border ${theme === 'dark' ? 'bg-[#181a30] border-gray-800' : 'bg-gray-50 border-gray-100'}`}>
                        <p className="text-xs text-gray-400">Current Rating Score</p>
                        <p className="text-xl font-bold font-mono text-violet-500 mt-1">{userLiveScore} pts</p>
                      </div>
                      <div className={`p-4 rounded-xl border ${theme === 'dark' ? 'bg-[#181a30] border-gray-800' : 'bg-gray-50 border-gray-100'}`}>
                        <p className="text-xs text-gray-400">Global Standings Position</p>
                        <p className="text-xl font-bold font-mono text-indigo-500 mt-1">Rank #{userLiveRank}</p>
                      </div>
                    </div>

                    <div className={`p-4 rounded-xl border ${theme === 'dark' ? 'bg-[#181a30] border-gray-800' : 'bg-gray-50 border-gray-100'}`}>
                      <p className="text-xs text-gray-400 mb-2">Performance compared to global top players</p>
                      <div className="w-full bg-gray-800 h-2 rounded-full overflow-hidden">
                        <div className="bg-gradient-to-r from-violet-600 to-indigo-600 h-full w-[85%]" />
                      </div>
                      <p className="text-[10px] text-gray-500 mt-1.5 text-right font-sans">You rank better than 85% of other Arena competitors</p>
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Bottom Alert Banners */}
            <div
              id="allover-banner-info"
              className={`mt-8 p-4.5 rounded-2xl border flex items-center justify-between gap-4 ${
                innerTab === 'winners'
                  ? theme === 'dark'
                    ? 'bg-amber-950/20 border-amber-500/20 text-amber-400'
                    : 'bg-amber-50 border-amber-100 text-amber-600'
                  : theme === 'dark'
                  ? 'bg-violet-950/20 border-violet-500/20 text-violet-400'
                  : 'bg-violet-50 border-violet-100 text-violet-600'
              }`}
            >
              <div className="space-y-1 text-left">
                <p className="text-xs font-bold uppercase tracking-wider">
                  {innerTab === 'winners' ? 'Previous Month Champions and Rewards' : 'Keep playing to stay on top!'}
                </p>
                <p className="text-[11px] text-gray-500 dark:text-gray-400">
                  {innerTab === 'winners'
                    ? 'Rewards are distributed within 24 hours of seasonal locking.'
                    : 'The live board resets at midnight UTC every Sunday.'}
                </p>
              </div>

              {/* Beautiful trophy or target graphic */}
              <div className="shrink-0 flex items-center justify-center w-10 h-10 rounded-xl bg-white/10 border border-white/10">
                {innerTab === 'winners' ? (
                  <Award size={18} className="text-amber-500" />
                ) : (
                  <Trophy size={18} className="text-violet-500" />
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
