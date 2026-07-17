import React from 'react';
import { Calendar, CheckCircle2, Clock, Search } from 'lucide-react';

export default function MyEventsView({ theme, userScore }) {
  const registeredEvents = [
    {
      title: 'General Knowledge Quiz',
      status: 'Completed',
      date: 'Today, July 17, 2026',
      points: 2500,
      accuracy: '90%',
      rank: 4,
    },
    {
      title: 'Tech Trivia 2.0',
      status: 'Completed',
      date: 'Yesterday, July 16, 2026',
      points: 1500,
      accuracy: '75%',
      rank: 8,
    },
    {
      title: 'Design Mastermind',
      status: 'Upcoming',
      date: 'Tomorrow, July 18, 2026',
      points: 0,
      accuracy: '-',
      rank: '-',
    }
  ];

  return (
    <div id="my-events-container" className="space-y-8 text-left">
      <div id="my-events-header">
        <h1 className="text-3xl font-display font-extrabold tracking-tight">My Events</h1>
        <p className={`text-sm ${theme === 'dark' ? 'text-gray-400' : 'text-gray-500'}`}>
          View your active, upcoming, and completed tournament participations.
        </p>
      </div>

      {/* Quick stats dashboard */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
        <div className={`p-5 rounded-2xl border ${theme === 'dark' ? 'bg-[#121324] border-gray-800' : 'bg-white border-gray-100 shadow-sm'}`}>
          <p className="text-xs text-gray-500 dark:text-gray-400 font-bold uppercase tracking-wider">Total Earned Points</p>
          <p className="text-3xl font-display font-extrabold text-violet-500 mt-2">{userScore.toLocaleString()} pts</p>
        </div>
        <div className={`p-5 rounded-2xl border ${theme === 'dark' ? 'bg-[#121324] border-gray-800' : 'bg-white border-gray-100 shadow-sm'}`}>
          <p className="text-xs text-gray-500 dark:text-gray-400 font-bold uppercase tracking-wider">Completed Quizzes</p>
          <p className="text-3xl font-display font-extrabold text-indigo-500 mt-2">112</p>
        </div>
        <div className={`p-5 rounded-2xl border ${theme === 'dark' ? 'bg-[#121324] border-gray-800' : 'bg-white border-gray-100 shadow-sm'}`}>
          <p className="text-xs text-gray-500 dark:text-gray-400 font-bold uppercase tracking-wider">Average Accuracy</p>
          <p className="text-3xl font-display font-extrabold text-emerald-500 mt-2">84.5%</p>
        </div>
      </div>

      {/* Events table/list */}
      <div className={`rounded-3xl border overflow-hidden ${theme === 'dark' ? 'bg-[#121324] border-gray-800' : 'bg-white border-gray-100 shadow-sm'}`}>
        <div className="p-5 border-b border-gray-100/50 dark:border-gray-800/50 flex items-center justify-between">
          <h3 className="font-display font-bold text-base">Participation History</h3>
          <div className="relative">
            <Search className="absolute left-3 top-2.5 text-gray-400" size={14} />
            <input
              type="text"
              placeholder="Search event history..."
              className={`pl-8 pr-4 py-1.5 rounded-xl text-xs border focus:outline-none focus:ring-1 focus:ring-violet-500 ${
                theme === 'dark' ? 'bg-gray-900 border-gray-800 text-white' : 'bg-gray-50 border-gray-200 text-gray-800'
              }`}
            />
          </div>
        </div>

        <div className="divide-y divide-gray-100/50 dark:divide-gray-800/50">
          {registeredEvents.map((event, idx) => (
            <div key={idx} className="p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4 hover:bg-gray-50/50 dark:hover:bg-white/5 transition-colors">
              <div className="flex items-start gap-3.5">
                <div className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 ${
                  event.status === 'Completed'
                    ? 'bg-emerald-500/10 text-emerald-500'
                    : 'bg-violet-500/10 text-violet-500'
                }`}>
                  {event.status === 'Completed' ? <CheckCircle2 size={18} /> : <Calendar size={18} />}
                </div>
                <div className="space-y-1">
                  <h4 className="font-display font-bold text-sm">{event.title}</h4>
                  <div className="flex items-center gap-4 text-xs text-gray-500 dark:text-gray-400">
                    <span className="flex items-center gap-1 font-sans"><Clock size={12} /> {event.date}</span>
                    <span>•</span>
                    <span className={`font-semibold ${event.status === 'Completed' ? 'text-emerald-500' : 'text-violet-500'}`}>
                      {event.status}
                    </span>
                  </div>
                </div>
              </div>

              {/* Score breakdown info */}
              <div className="flex items-center gap-6 self-end sm:self-center">
                {event.status === 'Completed' ? (
                  <>
                    <div className="text-right">
                      <p className="text-[10px] text-gray-400 uppercase font-semibold">Accuracy</p>
                      <p className="text-xs font-bold text-gray-700 dark:text-gray-300">{event.accuracy}</p>
                    </div>
                    <div className="text-right">
                      <p className="text-[10px] text-gray-400 uppercase font-semibold">Rank Status</p>
                      <p className="text-xs font-bold text-violet-500">#{event.rank}</p>
                    </div>
                    <div className="text-right">
                      <p className="text-[10px] text-gray-400 uppercase font-semibold">Earned</p>
                      <p className="text-xs font-mono font-bold text-emerald-500">+{event.points} pts</p>
                    </div>
                  </>
                ) : (
                  <button className="px-4 py-1.5 rounded-xl bg-violet-600 hover:bg-violet-500 text-white font-medium text-xs shadow-md shadow-violet-500/10 transition-colors">
                    Registered
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
