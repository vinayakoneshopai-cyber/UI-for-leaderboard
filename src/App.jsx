import React, { useState, useEffect } from "react";
import Navbar from "./components/Navbar";
import LeaderboardHub from "./components/LeaderboardHub";

export default function App() {
  const [theme, setTheme] = useState("dark");

  // User leaderboard data
  const [userScore] = useState(760);
  const [userRank] = useState(12);

  useEffect(() => {
    const root = document.documentElement;

    if (theme === "dark") {
      root.classList.add("dark");
      root.style.backgroundColor = "#080911";
    } else {
      root.classList.remove("dark");
      root.style.backgroundColor = "#fcfcfd";
    }
  }, [theme]);

  const toggleTheme = () => {
    setTheme((prev) => (prev === "dark" ? "light" : "dark"));
  };

  return (
    <div
      className={`min-h-screen transition-colors duration-300 font-sans ${
        theme === "dark"
          ? "bg-[#080911] text-gray-100"
          : "bg-[#fafaff] text-gray-800"
      }`}
    >
      {/* Navbar */}
      <Navbar
        theme={theme}
        toggleTheme={toggleTheme}
        activeTab="leaderboard"
        setActiveTab={() => {}}
        userScore={userScore}
      />

      {/* Leaderboard Only */}
      <main className="max-w-7xl mx-auto px-4 md:px-8 py-8 md:py-12">
        <LeaderboardHub
          theme={theme}
          userLiveScore={userScore}
          userLiveRank={userRank}
          onJoinGKQuiz={() => {}}
        />
      </main>
    </div>
  );
}