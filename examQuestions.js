const examQuestions = [
  {
    question: "What is the first thing your main character should always have?",
    answers: [
      {
        text: "Goal",
        value: 0,
      },
      {
        text: "Self-esteem",
        value: 1,
      },
    ],
  },

  {
    question: "Most stories have...",
    answers: [
      {
        text: "A single central character",
        value: 0,
      },
      {
        text: "Several central characters",
        value: 1,
      },
    ],
  },

  {
    question: "The character should achieve his goal...",
    answers: [
      {
        text: "By overcoming many obstacles",
        value: 0,
      },
      {
        text: "Without struggle",
        value: 1,
      },
    ],
  },

  {
    question: "How many goals should a character have?",
    answers: [
      {
        text: "One",
        value: 0,
      },
      {
        text: "As much as you want",
        value: 1,
      },
    ],
  },

  {
    question: "What is the most important aspect of the main hero's goal?",
    answers: [
      {
        text: "It should be hard to achieve",
        value: 0,
      },
      {
        text: "It should be easy to achieve",
        value: 1,
      },
    ],
  },

  {
    question: "What is the opponent of the main hero is called?",
    answers: [
      {
        text: "Antagonist",
        value: 0,
      },
      {
        text: "Protagonist",
        value: 1,
      },
    ],
  },

  {
    question: "The main hero can be his or her own antagonist",
    answers: [
      {
        text: "True",
        value: 0,
      },
      {
        text: "False",
        value: 1,
      },
    ],
  },

  {
    question: "The conflict of the main character with himself is called...",
    answers: [
      {
        text: "Internal conflict",
        value: 0,
      },
      {
        text: "Autoconflict",
        value: 1,
      },
    ],
  },

  {
    question:
      "The conflict can be internal or external but not both at the same time",
    answers: [
      {
        text: "True",
        value: 1,
      },
      {
        text: "False",
        value: 0,
      },
    ],
  },

  {
    question: "What creates a conflict?",
    answers: [
      {
        text: "Anything that stops the hero from achieving his goal",
        value: 0,
      },
      {
        text: "Only hero's fight with antagonist",
        value: 1,
      },
    ],
  },

  {
    question:
      "What does the term three-act structure refer to in screenwriting?",
    answers: [
      {
        text: "The journey of the protagonist through three distinct acts",
        value: 0,
      },
      {
        text: "The inclusion of three major conflicts in the story",
        value: 1,
      },
    ],
  },

  {
    question: "How many acts does the traditional story structure include?",
    answers: [
      {
        text: "3",
        value: 0,
      },
      {
        text: "4",
        value: 1,
      },
    ],
  },

  {
    question:
      "In a good screenplay the character should always say what he really feels",
    answers: [
      {
        text: "True",
        value: 1,
      },
      {
        text: "False",
        value: 0,
      },
    ],
  },

  {
    question: "What is the purpose of a screenplay's subtext?",
    answers: [
      {
        text: "To provide stage directions for the actors",
        value: 1,
      },
      {
        text: "To convey deeper meanings and underlying emotions",
        value: 0,
      },
    ],
  },

  {
    question:
      "The unnessessary for the story action that is removed from the scene by editing are called...",
    answers: [
      {
        text: "Timelapse",
        value: 1,
      },
      {
        text: "Ellipsis",
        value: 0,
      },
    ],
  },
  {
    question: "Final outcome of the story is called...",
    answers: [
      {
        text: "Climax",
        value: 1,
      },
      {
        text: "Resolution",
        value: 0,
      },
    ],
  },

  {
    question: "What is the purpose of a screenplay's exposition?",
    answers: [
      {
        text: "To introduce the main conflict",
        value: 1,
      },
      {
        text: "To provide background information about the characters",
        value: 0,
      },
    ],
  },

  {
    question:
      "Necessary information on the characters explained in the beginning of the film is called...",
    answers: [
      {
        text: "Prelude",
        value: 1,
      },
      {
        text: "Exposition",
        value: 0,
      },
    ],
  },

  {
    question: "More often it is better if the exposition is presented...",
    answers: [
      {
        text: "In an obvious manner",
        value: 1,
      },
      {
        text: "In a discreet manner",
        value: 0,
      },
    ],
  },

  {
    question:
      "It is better if all the facts of the exposition are presented...",
    answers: [
      {
        text: "At once",
        value: 1,
      },
      {
        text: "Progressively",
        value: 0,
      },
    ],
  },

  {
    question:
      "When presenting a character in a screenplay for the first time you should...",
    answers: [
      {
        text: "Describe his appearence and behaviour in every detail",
        value: 1,
      },
      {
        text: "Only give details that are necessary to the story",
        value: 0,
      },
    ],
  },

  {
    question: "What is dramatic irony?",
    answers: [
      {
        text: "When the audience has better knowledge of the facts then the character",
        value: 0,
      },
      {
        text: "An amusing resolution of a dramatic situation",
        value: 1,
      },
    ],
  },

  {
    question:
      "A state of viewer's excitement or anxious uncertainty about a certain outcome is called...",
    answers: [
      {
        text: "Suspense",
        value: 0,
      },
      {
        text: "Dramatic tension",
        value: 1,
      },
    ],
  },

  {
    question: "A detail that is paid off later is called...",
    answers: [
      {
        text: "Flashforward",
        value: 1,
      },
      {
        text: "Plant",
        value: 0,
      },
    ],
  },

  {
    question: "The reveal of plant is called...",
    answers: [
      {
        text: "Climax",
        value: 1,
      },
      {
        text: "Payoff",
        value: 0,
      },
    ],
  },

  {
    question: "Plants and payoffs work beter when...",
    answers: [
      {
        text: "They are separated by screentime",
        value: 0,
      },
      {
        text: "The payoff happens immediately after planting",
        vallue: 1,
      },
    ],
  },

  {
    question: "What is the purpose of a screenplay's resolution?",
    answers: [
      {
        text: "To leave the audience with a cliffhanger",
        value: 1,
      },
      {
        text: "To tie up loose ends and provide closure",
        value: 0,
      },
    ],
  },

  {
    question: "What is the purpose of a screenplay's climax?",
    answers: [
      {
        text: "To resolve the central conflict",
        value: 0,
      },
      {
        text: "To establish the theme of the story",
        value: 1,
      },
    ],
  },

  {
    question: "What is the purpose of a screenplay's inciting incident?",
    answers: [
      {
        text: "To introduce the main characters",
        value: 1,
      },
      {
        text: "To kickstart the central conflict",
        value: 0,
      },
    ],
  },

  {
    question: "What does contract with the audience mean?",
    answers: [
      {
        text: "Youyr contract with the viewer stating you'll make a worthy film",
        value: 1,
      },
      {
        text: "The viewer gives you his time and money and you entertain him",
        value: 0,
      },
    ],
  },

  {
    question:
      "Of three unities defined by Aristote (time, place and action) the screenwriter should most often adhere to the unity of...",
    answers: [
      {
        text: "Action",
        value: 0,
      },
      {
        text: "Time and place",
        value: 1,
      },
    ],
  },
];

export default examQuestions;
