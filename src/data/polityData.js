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
    id: "constitution_adoption",
    title: "Constitution Adoption",
    date: "1949-11-26",
    location: {
      latitude: 28.6139,
      longitude: 77.2090,
      name: "Constitution Hall, New Delhi"
    },
    description: "The Constituent Assembly adopted the Indian Constitution after 2 years, 11 months, and 18 days of deliberation.",
    significance: "Foundation of constitutional democracy in India",
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
  {
    id: "first_amendment",
    title: "First Constitutional Amendment",
    date: "1951-06-18",
    location: {
      latitude: 28.6139,
      longitude: 77.2090,
      name: "Parliament House, New Delhi"
    },
    description: "Added the Ninth Schedule to protect land reform laws from judicial review.",
    significance: "First modification to the Constitution, enabling land reforms",
    category: "Amendment",
    icon: "📝",
    color: "#9C27B0"
  },
  {
    id: "states_reorganization",
    title: "States Reorganization Act",
    date: "1956-11-01",
    location: {
      latitude: 28.6139,
      longitude: 77.2090,
      name: "New Delhi"
    },
    description: "Reorganized Indian states on linguistic basis, creating 14 states and 6 union territories.",
    significance: "Redrew India's political map based on language",
    category: "Federalism",
    icon: "🗺️",
    color: "#607D8B"
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
    description: "Prime Minister Indira Gandhi declared a state of emergency, suspending civil liberties.",
    significance: "Darkest period for Indian democracy, led to constitutional reforms",
    category: "Emergency",
    icon: "⚠️",
    color: "#F44336"
  },
  {
    id: "42nd_amendment",
    title: "42nd Constitutional Amendment",
    date: "1976-12-18",
    location: {
      latitude: 28.6139,
      longitude: 77.2090,
      name: "Parliament House, New Delhi"
    },
    description: "Known as 'Mini Constitution', added 'Socialist' and 'Secular' to Preamble, introduced Fundamental Duties.",
    significance: "Most comprehensive amendment, changed the basic structure",
    category: "Amendment",
    icon: "📋",
    color: "#795548"
  },
  {
    id: "kesavananda_bharati",
    title: "Kesavananda Bharati Case",
    date: "1973-04-24",
    location: {
      latitude: 28.6139,
      longitude: 77.2090,
      name: "Supreme Court, New Delhi"
    },
    description: "Supreme Court established the Basic Structure Doctrine, limiting Parliament's power to amend the Constitution.",
    significance: "Landmark judgment that protected the Constitution's core principles",
    category: "Judiciary",
    icon: "⚖️",
    color: "#E91E63"
  },
  {
    id: "mandal_commission",
    title: "Mandal Commission Implementation",
    date: "1990-08-07",
    location: {
      latitude: 28.6139,
      longitude: 77.2090,
      name: "New Delhi"
    },
    description: "V.P. Singh government implemented 27% reservation for OBCs in central government jobs.",
    significance: "Extended affirmative action beyond SCs and STs",
    category: "Social Justice",
    icon: "🤝",
    color: "#009688"
  },
  {
    id: "73rd_amendment",
    title: "73rd Constitutional Amendment",
    date: "1992-12-22",
    location: {
      latitude: 28.6139,
      longitude: 77.2090,
      name: "Parliament House, New Delhi"
    },
    description: "Gave constitutional status to Panchayati Raj institutions, strengthening grassroots democracy.",
    significance: "Institutionalized local self-governance",
    category: "Local Government",
    icon: "🏘️",
    color: "#8BC34A"
  },
  {
    id: "rti_act",
    title: "Right to Information Act",
    date: "2005-10-12",
    location: {
      latitude: 28.6139,
      longitude: 77.2090,
      name: "New Delhi"
    },
    description: "Enacted to promote transparency and accountability in government functioning.",
    significance: "Empowered citizens to access government information",
    category: "Transparency",
    icon: "🔍",
    color: "#FF5722"
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
    description: "Article 370 was abrogated and J&K was bifurcated into two Union Territories.",
    significance: "Major constitutional and political change in Kashmir",
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

export const QUIZ_QUESTIONS = [
  {
    id: "q1",
    question: "Which amendment added 'Socialist' and 'Secular' to the Preamble?",
    options: ["41st Amendment", "42nd Amendment", "43rd Amendment", "44th Amendment"],
    correctAnswer: 1,
    explanation: "The 42nd Amendment (1976) added 'Socialist' and 'Secular' to the Preamble during the Emergency period.",
    topic: "Preamble",
    difficulty: "medium"
  },
  {
    id: "q2",
    question: "The Basic Structure Doctrine was established in which case?",
    options: ["Golaknath case", "Kesavananda Bharati case", "Minerva Mills case", "Waman Rao case"],
    correctAnswer: 1,
    explanation: "The Basic Structure Doctrine was established in Kesavananda Bharati v. State of Kerala (1973) by a 13-judge bench.",
    topic: "Constitutional Law",
    difficulty: "medium"
  }
];

// Export all data
export const POLITY_DATA = {
  INDIAN_CONSTITUTION,
  HISTORICAL_EVENTS,
  LANDMARK_CASES,
  QUIZ_QUESTIONS
};