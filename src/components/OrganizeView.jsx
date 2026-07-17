import React, { useState } from 'react';
import { Settings, Sparkles, Plus, Info, LayoutList, Clock } from 'lucide-react';

export default function OrganizeView({ theme, onCreateLobby }) {
  const [title, setTitle] = useState('');
  const [category, setCategory] = useState('Technology');
  const [duration, setDuration] = useState(15);
  const [questionsCount, setQuestionsCount] = useState(10);
  const [success, setSuccess] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!title) return;
    setSuccess(true);
    setTimeout(() => {
      onCreateLobby({ title, category, duration });
      setTitle('');
      setSuccess(false);
    }, 1500);
  };

  return (
    <div id="organize-view-container" className="max-w-3xl mx-auto space-y-8 text-left">
      <div id="organize-header">
        <h1 className="text-3xl font-display font-extrabold tracking-tight">Organize Tournament</h1>
        <p className={`text-sm ${theme === 'dark' ? 'text-gray-400' : 'text-gray-500'}`}>
          Host a custom live quiz event, invite participants, and manage the live leaderboards.
        </p>
      </div>

      <div
        id="organize-card"
        className={`rounded-3xl p-6 md:p-8 border transition-all duration-300 ${
          theme === 'dark' ? 'bg-[#121324] border-gray-800 text-white' : 'bg-white border-gray-100 text-gray-800 shadow-xl shadow-gray-100/40'
        }`}
      >
        {success ? (
          <div className="py-12 text-center space-y-4">
            <div className="w-16 h-16 rounded-full bg-emerald-500/15 text-emerald-500 mx-auto flex items-center justify-center border border-emerald-500/20">
              <Sparkles size={32} className="animate-spin-slow" />
            </div>
            <h3 className="text-xl font-display font-bold text-emerald-500">Lobby Created Successfully!</h3>
            <p className="text-sm text-gray-500 dark:text-gray-400 max-w-sm mx-auto">
              Your live quiz event has been registered. Redirecting to Arena dashboard...
            </p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2">
              <label htmlFor="lobby-title" className="text-sm font-bold block">Tournament Title</label>
              <input
                id="lobby-title"
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="e.g. World History Masters Quiz"
                required
                className={`w-full p-3.5 rounded-xl text-sm border focus:outline-none focus:ring-1 focus:ring-violet-500 ${
                  theme === 'dark' ? 'bg-gray-950 border-gray-800 text-white' : 'bg-gray-50 border-gray-200 text-gray-800'
                }`}
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label htmlFor="lobby-category" className="text-sm font-bold block">Quiz Category</label>
                <select
                  id="lobby-category"
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                  className={`w-full p-3.5 rounded-xl text-sm border focus:outline-none focus:ring-1 focus:ring-violet-500 ${
                    theme === 'dark' ? 'bg-gray-950 border-gray-800 text-white' : 'bg-gray-50 border-gray-200 text-gray-800'
                  }`}
                >
                  <option value="Technology">Technology</option>
                  <option value="UI/UX Design">UI/UX Design</option>
                  <option value="GK & Trivia">GK & Trivia</option>
                  <option value="Science">Science</option>
                  <option value="Pop Culture">Pop Culture</option>
                </select>
              </div>

              <div className="space-y-2">
                <label htmlFor="lobby-duration" className="text-sm font-bold block">Duration (Minutes)</label>
                <div className="relative">
                  <Clock className="absolute left-3 top-3.5 text-gray-400" size={16} />
                  <input
                    id="lobby-duration"
                    type="number"
                    min="5"
                    max="60"
                    value={duration}
                    onChange={(e) => setDuration(parseInt(e.target.value))}
                    className={`w-full pl-10 pr-4 p-3.5 rounded-xl text-sm border focus:outline-none focus:ring-1 focus:ring-violet-500 ${
                      theme === 'dark' ? 'bg-gray-950 border-gray-800 text-white' : 'bg-gray-50 border-gray-200 text-gray-800'
                    }`}
                  />
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label htmlFor="questions-count" className="text-sm font-bold block">Number of Questions</label>
                <div className="relative">
                  <LayoutList className="absolute left-3 top-3.5 text-gray-400" size={16} />
                  <input
                    id="questions-count"
                    type="number"
                    min="5"
                    max="50"
                    value={questionsCount}
                    onChange={(e) => setQuestionsCount(parseInt(e.target.value))}
                    className={`w-full pl-10 pr-4 p-3.5 rounded-xl text-sm border focus:outline-none focus:ring-1 focus:ring-violet-500 ${
                      theme === 'dark' ? 'bg-gray-950 border-gray-800 text-white' : 'bg-gray-50 border-gray-200 text-gray-800'
                    }`}
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-bold block">Participant Mode</label>
                <div className="flex gap-4">
                  <label className="flex items-center gap-2 text-xs font-semibold cursor-pointer">
                    <input type="radio" name="mode" defaultChecked className="text-violet-600 focus:ring-violet-500" />
                    Public Lobby
                  </label>
                  <label className="flex items-center gap-2 text-xs font-semibold cursor-pointer">
                    <input type="radio" name="mode" className="text-violet-600 focus:ring-violet-500" />
                    Private/Invite Only
                  </label>
                </div>
              </div>
            </div>

            {/* Info notice */}
            <div className="p-4 rounded-2xl bg-violet-500/10 border border-violet-500/20 flex gap-3 text-violet-500">
              <Info size={18} className="shrink-0 mt-0.5" />
              <p className="text-xs leading-relaxed">
                As the organizer, you will gain access to real-time administrative options including player bans, direct chat moderation, and pacing control keys.
              </p>
            </div>

            <button
              id="submit-organize-btn"
              type="submit"
              className="w-full py-3.5 px-6 rounded-xl text-sm font-semibold bg-gradient-to-r from-violet-600 to-indigo-600 hover:from-violet-500 hover:to-indigo-500 text-white shadow-lg shadow-violet-500/20 transition-all flex items-center justify-center gap-2 hover:-translate-y-0.5"
            >
              <Plus size={16} />
              <span>Create Tournament Lobby</span>
            </button>
          </form>
        )}
      </div>
    </div>
  );
}
