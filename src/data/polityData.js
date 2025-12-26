// Comprehensive Political Science Data for UPSC/KPSC Preparation
// Based on Indian Constitution, NCERT Political Science Books, and Laxmikanth

export const INDIAN_CONSTITUTION = {
  preamble: {
    title: "Preamble & Basic Structure",
    icon: "📜",
    color: "#1976D2",
    topics: [
      {
        id: "preamble",
        title: "Preamble of Indian Constitution",
        description: "The philosophical foundation of the Indian Constitution",
        concepts: [
          {
            id: "preamble_text",
            title: "Preamble Text & Analysis",
            content: "WE, THE PEOPLE OF INDIA, having solemnly resolved to constitute India into a SOVEREIGN SOCIALIST SECULAR DEMOCRATIC REPUBLIC and to secure to all its citizens:\n\nJUSTICE, social, economic and political;\nLIBERTY of thought, expression, belief, faith and worship;\nEQUALITY of status and of opportunity;\nand to promote among them all\nFRATERNITY assuring the dignity of the individual and the unity and integrity of the Nation;\n\nIN OUR CONSTITUENT ASSEMBLY this twenty-sixth day of November, 1949, do HEREBY ADOPT, ENACT AND GIVE TO OURSELVES THIS CONSTITUTION.\n\nKey Features:\n1. Source of Authority: 'We, the People of India'\n2. Nature of State: Sovereign, Socialist, Secular, Democratic, Republic\n3. Objectives: Justice, Liberty, Equality, Fraternity\n4. Date of Adoption: November 26, 1949\n5. Date of Commencement: January 26, 1950",
            keywords: ["preamble", "sovereign", "socialist", "secular", "democratic", "republic", "justice", "liberty", "equality", "fraternity"],
            examTips: "Remember the 42nd Amendment (1976) added 'Socialist' and 'Secular' to the Preamble. The Preamble is not enforceable in court but reflects the Constitution's philosophy."
          }
        ]
      }
    ]
  }
};

export const HISTORICAL_EVENTS = [
  // --- BRITISH ERA (Foundational Acts) ---
  {
    id: "regulating_act_1773",
    title: "Regulating Act of 1773",
    date: "1773-06-10",
    location: {
      latitude: 22.5726,
      longitude: 88.3639,
      name: "Fort William, Calcutta"
    },
    description: "The first step by the British Government to regulate the affairs of the East India Company.",
    significance: "Laid the foundations of central administration in India.",
    category: "British Era",
    icon: "🏛️",
    color: "#455A64"
  },
  {
    id: "charter_act_1833",
    title: "Charter Act of 1833",
    date: "1833-08-28",
    location: {
      latitude: 22.5726,
      longitude: 88.3639,
      name: "Calcutta"
    },
    description: "Made the Governor-General of Bengal as the Governor-General of India.",
    significance: "Final step towards centralization in British India.",
    category: "British Era",
    icon: "📜",
    color: "#455A64"
  },
  {
    id: "govt_india_act_1858",
    title: "Government of India Act 1858",
    date: "1858-08-02",
    location: {
      latitude: 51.5074,
      longitude: -0.1278,
      name: "London (Royal Assent)"
    },
    description: "Transferred the powers of the East India Company to the British Crown following the 1857 revolt.",
    significance: "End of Company Rule; start of the British Raj.",
    category: "British Era",
    icon: "👑",
    color: "#5D4037"
  },
  {
    id: "morley_minto_1909",
    title: "Indian Councils Act 1909",
    date: "1909-05-25",
    location: {
      latitude: 28.6139,
      longitude: 77.2090,
      name: "New Delhi"
    },
    description: "Known as Morley-Minto Reforms; introduced separate electorates for Muslims.",
    significance: "Legalized communalism in Indian politics.",
    category: "British Era",
    icon: "⚖️",
    color: "#5D4037"
  },
  {
    id: "govt_india_act_1935",
    title: "Government of India Act 1935",
    date: "1935-08-02",
    location: {
      latitude: 28.6139,
      longitude: 77.2090,
      name: "Parliament House"
    },
    description: "Provided for the establishment of an All-India Federation and provincial autonomy.",
    significance: "The primary source/blueprint for the 1950 Constitution.",
    category: "British Era",
    icon: "📋",
    color: "#1976D2"
  },

  // --- CONSTITUTION FORMATION ERA ---
  {
    id: "cabinet_mission",
    title: "Cabinet Mission Plan",
    date: "1946-05-16",
    location: {
      latitude: 28.6139,
      longitude: 77.2090,
      name: "New Delhi"
    },
    description: "Proposed the formation of a Constituent Assembly to frame the Constitution.",
    significance: "Authorized the creation of the body that wrote our Constitution.",
    category: "Constitution",
    icon: "🤝",
    color: "#1976D2"
  },
  {
    id: "first_meeting_assembly",
    title: "First Meeting of Assembly",
    date: "1946-12-09",
    location: {
      latitude: 28.6172,
      longitude: 77.2081,
      name: "Constitution Hall, Delhi"
    },
    description: "The Constituent Assembly met for the first time. Dr. Sachchidananda Sinha was the temporary President.",
    significance: "The actual beginning of the drafting process.",
    category: "Constitution",
    icon: "🏛️",
    color: "#1976D2"
  },
  {
    id: "objective_resolution",
    title: "Objective Resolution",
    date: "1946-12-13",
    location: {
      latitude: 28.6139,
      longitude: 77.2090,
      name: "New Delhi"
    },
    description: "Moved by Jawaharlal Nehru, outlining the philosophy of the Constitution.",
    significance: "Later became the Preamble of the Constitution.",
    category: "Constitution",
    icon: "💡",
    color: "#FF9800"
  },
  {
    id: "independence",
    title: "Independence Day",
    date: "1947-08-15",
    location: {
      latitude: 28.6562,
      longitude: 77.2410,
      name: "Red Fort, New Delhi"
    },
    description: "India gained independence from British rule. Jawaharlal Nehru became the first Prime Minister.",
    significance: "Birth of modern India as a sovereign nation",
    category: "Independence",
    icon: "🇮🇳",
    color: "#FF9800"
  },
  {
    id: "drafting_committee",
    title: "Drafting Committee Set Up",
    date: "1947-08-29",
    location: {
      latitude: 28.6139,
      longitude: 77.2090,
      name: "New Delhi"
    },
    description: "Committee set up with Dr. B.R. Ambedkar as Chairman to prepare the draft Constitution.",
    significance: "Started the formal technical drafting of the laws.",
    category: "Constitution",
    icon: "✍️",
    color: "#E91E63"
  },
  {
    id: "constitution_adoption",
    title: "Constitution Adoption",
    date: "1949-11-26",
    location: {
      latitude: 28.6139,
      longitude: 77.2090,
      name: "Constitution Hall, New Delhi"
    },
    description: "The Constituent Assembly adopted the Indian Constitution after years of deliberation.",
    significance: "Foundation of constitutional democracy; celebrated as Law Day.",
    category: "Constitution",
    icon: "📜",
    color: "#1976D2"
  },
  {
    id: "republic_day",
    title: "Republic Day",
    date: "1950-01-26",
    location: {
      latitude: 28.6139,
      longitude: 77.2090,
      name: "Rajpath, New Delhi"
    },
    description: "The Constitution of India came into effect, making India a republic.",
    significance: "India became a sovereign democratic republic",
    category: "Constitution",
    icon: "🏛️",
    color: "#4CAF50"
  },

  // --- POST-INDEPENDENCE MILESTONES ---
  {
    id: "kesavananda_bharati",
    title: "Kesavananda Bharati Case",
    date: "1973-04-24",
    location: {
      latitude: 28.6139,
      longitude: 77.2090,
      name: "Supreme Court"
    },
    description: "Established the Basic Structure Doctrine.",
    significance: "Protected the Constitution's core principles from being changed.",
    category: "Judiciary",
    icon: "⚖️",
    color: "#E91E63"
  },
  {
    id: "emergency_1975",
    title: "National Emergency",
    date: "1975-06-25",
    location: {
      latitude: 28.6139,
      longitude: 77.2090,
      name: "New Delhi"
    },
    description: "Suspension of civil liberties under Article 352.",
    significance: "Tested the resilience of Indian democracy.",
    category: "Emergency",
    icon: "⚠️",
    color: "#F44336"
  },
  {
    id: "article_370_abrogation",
    title: "Article 370 Abrogation",
    date: "2019-08-05",
    location: {
      latitude: 34.0837,
      longitude: 74.7973,
      name: "Jammu & Kashmir"
    },
    description: "Special status of J&K removed and bifurcated into Union Territories.",
    significance: "Full integration of J&K into the Indian Union.",
    category: "Federalism",
    icon: "🏔️",
    color: "#3F51B5"
  }
];

export const LANDMARK_CASES = [
  {
    id: "kesavananda_bharati",
    title: "Kesavananda Bharati v. State of Kerala (1973)",
    date: "1973-04-24",
    court: "Supreme Court",
    judges: "13-judge bench",
    significance: "Established Basic Structure Doctrine",
    facts: "Challenge to Kerala Land Reforms Act and Parliament's amending power",
    judgment: "Parliament cannot amend the basic structure of the Constitution",
    impact: "Limited Parliament's amending power, protected constitutional core",
    category: "Constitutional Law",
    keywords: ["basic structure", "constitutional amendment", "judicial review"]
  },
  {
    id: "maneka_gandhi",
    title: "Maneka Gandhi v. Union of India (1978)",
    date: "1978-01-25",
    court: "Supreme Court",
    judges: "7-judge bench",
    significance: "Expanded Article 21 - Right to Life and Personal Liberty",
    facts: "Passport impounded without giving reasons",
    judgment: "Procedure established by law must be fair, just and reasonable",
    impact: "Revolutionized fundamental rights jurisprudence",
    category: "Fundamental Rights",
    keywords: ["Article 21", "due process", "personal liberty"]
  }
];

export const QUIZ_LEVELS = [
  {
    id: 'beginner',
    title: 'Beginner Level',
    subtitle: 'Basic concepts and fundamentals',
    icon: '🌱',
    color: '#4CAF50',
    minScore: 0,
    maxScore: 40,
    description: 'Start with basic political science concepts',
    questionsCount: 5,
    timeLimit: 300, // 5 minutes
  },
  {
    id: 'intermediate',
    title: 'Intermediate Level',
    subtitle: 'Constitutional provisions and cases',
    icon: '📚',
    color: '#FF9800',
    minScore: 40,
    maxScore: 70,
    description: 'Dive deeper into constitutional law',
    questionsCount: 8,
    timeLimit: 480, // 8 minutes
  },
  {
    id: 'advanced',
    title: 'Advanced Level',
    subtitle: 'Complex scenarios and analysis',
    icon: '🎓',
    color: '#E91E63',
    minScore: 70,
    maxScore: 100,
    description: 'Master advanced political concepts',
    questionsCount: 10,
    timeLimit: 600, // 10 minutes
  },
  {
    id: 'expert',
    title: 'Expert Level',
    subtitle: 'UPSC/KPSC level questions',
    icon: '👑',
    color: '#9C27B0',
    minScore: 85,
    maxScore: 100,
    description: 'Challenge yourself with expert-level questions',
    questionsCount: 12,
    timeLimit: 720, // 12 minutes
  }
];

export const QUIZ_QUESTIONS = {
  beginner: [
    {
      id: "b1",
      question: "When did India gain independence?",
      options: ["August 14, 1947", "August 15, 1947", "August 16, 1947", "July 15, 1947"],
      correctAnswer: 1,
      explanation: "India gained independence on August 15, 1947, from British colonial rule.",
      topic: "Independence",
      difficulty: "easy"
    },
    {
      id: "b2",
      question: "Who was the first Prime Minister of India?",
      options: ["Mahatma Gandhi", "Jawaharlal Nehru", "Sardar Patel", "Dr. Rajendra Prasad"],
      correctAnswer: 1,
      explanation: "Jawaharlal Nehru was India's first Prime Minister, serving from 1947 to 1964.",
      topic: "Independence",
      difficulty: "easy"
    },
    {
      id: "b3",
      question: "When did the Indian Constitution come into effect?",
      options: ["January 26, 1949", "January 26, 1950", "August 15, 1950", "November 26, 1949"],
      correctAnswer: 1,
      explanation: "The Indian Constitution came into effect on January 26, 1950, which is celebrated as Republic Day.",
      topic: "Constitution",
      difficulty: "easy"
    },
    {
      id: "b4",
      question: "How many fundamental rights are there in the Indian Constitution?",
      options: ["5", "6", "7", "8"],
      correctAnswer: 1,
      explanation: "There are 6 fundamental rights in the Indian Constitution after the 44th Amendment removed the right to property.",
      topic: "Fundamental Rights",
      difficulty: "easy"
    },
    {
      id: "b5",
      question: "Who is known as the 'Father of the Indian Constitution'?",
      options: ["Mahatma Gandhi", "Jawaharlal Nehru", "Dr. B.R. Ambedkar", "Sardar Patel"],
      correctAnswer: 2,
      explanation: "Dr. B.R. Ambedkar is known as the 'Father of the Indian Constitution' for his role as chairman of the drafting committee.",
      topic: "Constitution",
      difficulty: "easy"
    }
  ],
  intermediate: [
    {
      id: "i1",
      question: "Which amendment added 'Socialist' and 'Secular' to the Preamble?",
      options: ["41st Amendment", "42nd Amendment", "43rd Amendment", "44th Amendment"],
      correctAnswer: 1,
      explanation: "The 42nd Amendment (1976) added 'Socialist' and 'Secular' to the Preamble during the Emergency period.",
      topic: "Preamble",
      difficulty: "medium"
    },
    {
      id: "i2",
      question: "Article 32 is known as the:",
      options: ["Right to Equality", "Heart and Soul of Constitution", "Right to Freedom", "Right to Education"],
      correctAnswer: 1,
      explanation: "Article 32 (Right to Constitutional Remedies) is called the 'Heart and Soul of the Constitution' by Dr. Ambedkar.",
      topic: "Fundamental Rights",
      difficulty: "medium"
    },
    {
      id: "i3",
      question: "The Basic Structure Doctrine was established in which case?",
      options: ["Golaknath case", "Kesavananda Bharati case", "Minerva Mills case", "Waman Rao case"],
      correctAnswer: 1,
      explanation: "The Basic Structure Doctrine was established in Kesavananda Bharati v. State of Kerala (1973) by a 13-judge bench.",
      topic: "Constitutional Law",
      difficulty: "medium"
    },
    {
      id: "i4",
      question: "Which article deals with Uniform Civil Code?",
      options: ["Article 43", "Article 44", "Article 45", "Article 46"],
      correctAnswer: 1,
      explanation: "Article 44 under DPSP directs the State to secure a Uniform Civil Code for all citizens.",
      topic: "DPSP",
      difficulty: "medium"
    },
    {
      id: "i5",
      question: "The President of India is elected by:",
      options: ["Direct election by people", "Electoral College", "Parliament only", "State Assemblies only"],
      correctAnswer: 1,
      explanation: "The President is elected by an Electoral College consisting of elected members of Parliament and State Legislative Assemblies.",
      topic: "President",
      difficulty: "medium"
    }
  ],
  advanced: [
    {
      id: "a1",
      question: "In Maneka Gandhi case, the Supreme Court established that procedure established by law must be:",
      options: ["Just and fair", "Fair, just and reasonable", "Reasonable only", "Constitutional"],
      correctAnswer: 1,
      explanation: "In Maneka Gandhi v. Union of India (1978), the SC held that procedure must be fair, just and reasonable, not just legally valid.",
      topic: "Constitutional Law",
      difficulty: "hard"
    },
    {
      id: "a2",
      question: "The 73rd Amendment Act is related to:",
      options: ["Urban Local Bodies", "Panchayati Raj", "Cooperative Societies", "Education"],
      correctAnswer: 1,
      explanation: "The 73rd Amendment (1992) gave constitutional status to Panchayati Raj institutions.",
      topic: "Local Government",
      difficulty: "hard"
    }
  ],
  expert: [
    {
      id: "e1",
      question: "Which principle was NOT part of the original Basic Structure as defined in Kesavananda Bharati case?",
      options: ["Supremacy of Constitution", "Secular character", "Judicial review", "Economic justice"],
      correctAnswer: 3,
      explanation: "Economic justice was not explicitly mentioned as part of the basic structure in the original Kesavananda Bharati judgment.",
      topic: "Constitutional Law",
      difficulty: "expert"
    }
  ]
};

// Export all data
export const POLITY_DATA = {
  INDIAN_CONSTITUTION,
  HISTORICAL_EVENTS,
  LANDMARK_CASES,
  QUIZ_LEVELS,
  QUIZ_QUESTIONS
};