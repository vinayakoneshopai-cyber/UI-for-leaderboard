import React from 'react';
import { Trophy, Calendar, User, Settings, Sun, Moon, Sparkles } from 'lucide-react';

export default function Navbar({ theme, toggleTheme, activeTab, setActiveTab, userScore }) {
  const tabs = [
    { id: 'events', label: 'Arena Events', icon: Calendar },
    { id: 'leaderboard', label: 'Leaderboard', icon: Trophy },
    { id: 'my-events', label: 'My Events', icon: User },
    { id: 'organize', label: 'Organize', icon: Settings },
  ];

  return (
    <nav
      id="main-navbar"
      className={`sticky top-0 z-50 px-4 md:px-8 py-3 flex items-center justify-between border-b transition-colors duration-300 ${
        theme === 'dark'
          ? 'bg-[#0b0c16]/95 border-gray-800 text-white'
          : 'bg-white/95 border-gray-100 text-gray-800'
      }`}
      style={{ backdropFilter: 'blur(10px)' }}
    >
      {/* Logo */}
      <div
        id="navbar-logo"
        onClick={() => setActiveTab('events')}
        className="flex items-center gap-2 cursor-pointer group"
      >
        <div className="relative w-8 h-8 rounded-lg bg-gradient-to-tr from-violet-600 to-indigo-600 flex items-center justify-center text-white font-bold shadow-lg shadow-violet-500/20 group-hover:scale-105 transition-transform">
          A
          <div className="absolute -inset-0.5 rounded-lg bg-gradient-to-tr from-violet-600 to-indigo-600 blur opacity-30 group-hover:opacity-60 transition-opacity" />
        </div>
        <span className="font-display font-bold text-lg tracking-wider bg-gradient-to-r from-violet-500 via-indigo-500 to-purple-500 bg-clip-text text-transparent">
          ARENA
        </span>
      </div>

      {/* Tabs */}
      <div id="navbar-links" className="hidden md:flex items-center gap-1">
        {tabs.map((tab) => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              id={`nav-link-${tab.id}`}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-medium transition-all duration-200 ${
                isActive
                  ? theme === 'dark'
                    ? 'bg-violet-600/10 text-violet-400 border border-violet-500/20'
                    : 'bg-violet-50 text-violet-600 border border-violet-100'
                  : theme === 'dark'
                  ? 'text-gray-400 hover:text-white hover:bg-white/5'
                  : 'text-gray-500 hover:text-gray-800 hover:bg-gray-50'
              }`}
            >
              <Icon size={16} className={isActive ? 'animate-pulse' : ''} />
              {tab.label}
            </button>
          );
        })}
      </div>

      {/* Right Controls */}
      <div id="navbar-controls" className="flex items-center gap-3">
        {/* Score indicator */}
        <div
          id="navbar-user-score"
          className={`flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold ${
            theme === 'dark'
              ? 'bg-gradient-to-r from-amber-500/10 to-orange-500/10 text-amber-400 border border-amber-500/20 shadow-[0_0_10px_rgba(245,158,11,0.05)]'
              : 'bg-amber-50 text-amber-700 border border-amber-100'
          }`}
        >
          <Sparkles size={12} className="text-amber-500 animate-spin-slow" />
          <span>{userScore.toLocaleString()} pts</span>
        </div>

        {/* Theme Toggle */}
        <button
          id="theme-toggle-btn"
          onClick={toggleTheme}
          aria-label="Toggle theme"
          className={`p-2 rounded-xl border transition-all hover:scale-105 active:scale-95 ${
            theme === 'dark'
              ? 'bg-gray-900 border-gray-800 text-amber-400 hover:bg-gray-800 hover:border-gray-700'
              : 'bg-gray-50 border-gray-200 text-gray-600 hover:bg-gray-100 hover:border-gray-300'
          }`}
        >
          {theme === 'dark' ? <Sun size={18} /> : <Moon size={18} />}
        </button>

        {/* User initials badge */}
        <div id="user-profile-avatar" className="relative group cursor-pointer">
          <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-violet-500 via-indigo-500 to-purple-600 text-white font-bold text-sm flex items-center justify-center shadow-lg border border-white/10 select-none">
            KS
          </div>
          <div className="absolute top-full right-0 mt-2 w-48 rounded-xl p-1.5 border shadow-xl opacity-0 scale-95 pointer-events-none group-hover:opacity-100 group-hover:scale-100 group-hover:pointer-events-auto transition-all duration-150 z-50 bg-[#161726]/95 border-gray-800 text-white">
            <div className="px-3 py-2 border-b border-gray-800">
              <p className="text-xs text-gray-400">Signed in as</p>
              <p className="text-sm font-semibold truncate text-white">Kishan (Khwahish Seth)</p>
            </div>
            <button
              onClick={() => setActiveTab('leaderboard')}
              className="w-full text-left flex items-center gap-2 px-3 py-2 rounded-lg text-xs hover:bg-white/5 text-gray-300 hover:text-white transition-colors"
            >
              <Trophy size={14} /> My Rankings
            </button>
            <button
              onClick={() => setActiveTab('my-events')}
              className="w-full text-left flex items-center gap-2 px-3 py-2 rounded-lg text-xs hover:bg-white/5 text-gray-300 hover:text-white transition-colors"
            >
              <Calendar size={14} /> My Events
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
}
