export const INITIAL_LIVE_LEADERBOARD_PLAYERS = [
  { id: 'p1', name: 'Khwahish Seth', avatar: 'KS', score: 2450, totalScore: 6450, quizzesPlayed: 28, ptsPerMin: 24, trend: 'neutral', rank: 1 },
  { id: 'p2', name: 'Arjun Verma', avatar: 'AV', score: 2100, totalScore: 5980, quizzesPlayed: 26, ptsPerMin: 21, trend: 'neutral', rank: 2 },
  { id: 'p3', name: 'Priya Sharma', avatar: 'PS', score: 1980, totalScore: 5230, quizzesPlayed: 24, ptsPerMin: 19, trend: 'neutral', rank: 3 },
  { id: 'p4', name: 'Rohan Mehta', avatar: 'RM', score: 1760, totalScore: 4870, quizzesPlayed: 22, ptsPerMin: 18, trend: 'up', rank: 4 },
  { id: 'p5', name: 'Sneha Iyer', avatar: 'SI', score: 1540, totalScore: 4210, quizzesPlayed: 20, ptsPerMin: 16, trend: 'down', rank: 5 },
  { id: 'p6', name: 'Vivek Singh', avatar: 'VS', score: 1320, totalScore: 3760, quizzesPlayed: 18, ptsPerMin: 14, trend: 'up', rank: 6 },
  { id: 'p7', name: 'Ananya Gupta', avatar: 'AG', score: 1200, totalScore: 3120, quizzesPlayed: 16, ptsPerMin: 13, trend: 'down', rank: 7 },
  { id: 'p8', name: 'Karan Malhotra', avatar: 'KM', score: 980, totalScore: 2980, quizzesPlayed: 15, ptsPerMin: 11, trend: 'neutral', rank: 8 },
  { id: 'user', name: 'You (Khwahish Seth)', avatar: 'KS', score: 760, totalScore: 28760, quizzesPlayed: 112, ptsPerMin: 10, trend: 'neutral', rank: 12, isUser: true }
];

export const INITIAL_WEEKLY_PLAYERS = [
  { id: 'user', name: 'Khwahish Seth', avatar: 'KS', score: 0, totalScore: 6450, quizzesPlayed: 28, ptsPerMin: 24, trend: 'up', rank: 1, isUser: true },
  { id: 'p2', name: 'Arjun Verma', avatar: 'AV', score: 0, totalScore: 5980, quizzesPlayed: 26, ptsPerMin: 21, trend: 'neutral', rank: 2 },
  { id: 'p3', name: 'Priya Sharma', avatar: 'PS', score: 0, totalScore: 5230, quizzesPlayed: 24, ptsPerMin: 19, trend: 'neutral', rank: 3 },
  { id: 'p4', name: 'Rohan Mehta', avatar: 'RM', score: 0, totalScore: 4870, quizzesPlayed: 22, ptsPerMin: 18, trend: 'neutral', rank: 4 },
  { id: 'p5', name: 'Sneha Iyer', avatar: 'SI', score: 0, totalScore: 4210, quizzesPlayed: 20, ptsPerMin: 16, trend: 'down', rank: 5 }
];

export const INITIAL_MONTHLY_PLAYERS = [
  { id: 'user', name: 'Khwahish Seth', avatar: 'KS', score: 0, totalScore: 28760, quizzesPlayed: 112, ptsPerMin: 26, trend: 'up', rank: 1, isUser: true },
  { id: 'p2', name: 'Arjun Verma', avatar: 'AV', score: 0, totalScore: 24510, quizzesPlayed: 98, ptsPerMin: 22, trend: 'neutral', rank: 2 },
  { id: 'p3', name: 'Priya Sharma', avatar: 'PS', score: 0, totalScore: 22840, quizzesPlayed: 96, ptsPerMin: 20, trend: 'neutral', rank: 3 },
  { id: 'p4', name: 'Rohan Mehta', avatar: 'RM', score: 0, totalScore: 19320, quizzesPlayed: 85, ptsPerMin: 18, trend: 'neutral', rank: 4 },
  { id: 'p5', name: 'Sneha Iyer', avatar: 'SI', score: 0, totalScore: 17680, quizzesPlayed: 78, ptsPerMin: 15, trend: 'down', rank: 5 }
];

export const MOCK_QUIZZES = [
  {
    id: 'q1',
    title: 'General Knowledge Quiz',
    questionsCount: 10,
    durationMinutes: 15,
    playersCount: 342,
    category: 'GK & Trivia',
    status: 'live'
  },
  {
    id: 'q2',
    title: 'Tech Trivia 2.0',
    questionsCount: 20,
    durationMinutes: 20,
    playersCount: 256,
    category: 'Technology',
    status: 'live'
  },
  {
    id: 'q3',
    title: 'Design Mastermind',
    questionsCount: 15,
    durationMinutes: 15,
    playersCount: 189,
    category: 'UI/UX Design',
    status: 'live'
  },
  {
    id: 'q4',
    title: 'Science Challenge',
    questionsCount: 20,
    durationMinutes: 20,
    playersCount: 212,
    category: 'Science',
    status: 'live'
  }
];

export const MOCK_QUESTIONS = {
  q1: [
    {
      id: 'q1_1',
      text: 'Which planet is known as the Red Planet?',
      options: ['Venus', 'Mars', 'Jupiter', 'Saturn'],
      correctAnswerIndex: 1
    },
    {
      id: 'q1_2',
      text: 'Who painted the famous artwork "Mona Lisa"?',
      options: ['Vincent van Gogh', 'Pablo Picasso', 'Leonardo da Vinci', 'Claude Monet'],
      correctAnswerIndex: 2
    },
    {
      id: 'q1_3',
      text: 'What is the capital city of Australia?',
      options: ['Sydney', 'Melbourne', 'Canberra', 'Brisbane'],
      correctAnswerIndex: 2
    },
    {
      id: 'q1_4',
      text: 'What is the chemical symbol for Gold?',
      options: ['Ag', 'Au', 'Fe', 'Cu'],
      correctAnswerIndex: 1
    },
    {
      id: 'q1_5',
      text: 'Which is the largest ocean on Earth?',
      options: ['Atlantic Ocean', 'Indian Ocean', 'Arctic Ocean', 'Pacific Ocean'],
      correctAnswerIndex: 3
    },
    {
      id: 'q1_6',
      text: 'How many elements are there in the periodic table?',
      options: ['108', '112', '118', '124'],
      correctAnswerIndex: 2
    },
    {
      id: 'q1_7',
      text: 'What does "HTML" stand for?',
      options: ['Hyper Text Markup Language', 'High Transfer Machine Language', 'Hyper Link Tool Mode', 'Home Text Management Level'],
      correctAnswerIndex: 0
    },
    {
      id: 'q1_8',
      text: 'Who is the author of "Harry Potter" series?',
      options: ['J.R.R. Tolkien', 'J.K. Rowling', 'George R.R. Martin', 'Stephen King'],
      correctAnswerIndex: 1
    },
    {
      id: 'q1_9',
      text: 'What is the power house of the cell?',
      options: ['Nucleus', 'Mitochondria', 'Ribosome', 'Golgi apparatus'],
      correctAnswerIndex: 1
    },
    {
      id: 'q1_10',
      text: 'Which country is home to the Kangaroo?',
      options: ['South Africa', 'New Zealand', 'Australia', 'Austria'],
      correctAnswerIndex: 2
    }
  ],
  q2: [
    {
      id: 'q2_1',
      text: 'Which of the following is NOT an operating system?',
      options: ['Linux', 'Windows', 'Oracle', 'macOS'],
      correctAnswerIndex: 2
    },
    {
      id: 'q2_2',
      text: 'What is the primary scripting language used for web browsers?',
      options: ['Python', 'C++', 'JavaScript', 'SQL'],
      correctAnswerIndex: 2
    },
    {
      id: 'q2_3',
      text: 'Which company created the TypeScript language?',
      options: ['Google', 'Microsoft', 'Apple', 'Facebook'],
      correctAnswerIndex: 1
    },
    {
      id: 'q2_4',
      text: 'What is the full form of API?',
      options: ['Application Programming Interface', 'Automated Processing Integration', 'App Protocol Instruction', 'Applied Program Indicator'],
      correctAnswerIndex: 0
    },
    {
      id: 'q2_5',
      text: 'Which database model uses key-value pairs or documents?',
      options: ['Relational (SQL)', 'NoSQL', 'Hierarchical', 'Network'],
      correctAnswerIndex: 1
    }
  ]
};
