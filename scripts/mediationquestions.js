const mediationQuestions = [
  {
    question:
      "Which of the following groups represent character archetypes as defined by Christopher Vogler in 'The Writer's Journey'?",
    answers: [
      {
        text: "Shadow, Ally, Mentor, Herald, Trickster, Shapeshifter",
        value: 0,
      },
      {
        text: "Antagonist, Love Interest, Magician, The Confidant,",
        value: 1,
      },
    ],
  },
  {
    question:
      "Which author's work on the monomyth or 'The Hero's Journey' heavily influenced Christopher Vogler's 'The Writer's Journey'?",
    answers: [
      {
        text: "Robert McKee",
        value: 1,
      },
      {
        text: "Joseph Campbell",
        value: 0,
      },
    ],
  },

  {
    question:
      "How many stages are there in Hero’s Journey, according to Christopher Vogler?",
    answers: [
      {
        text: "12",
        value: 0,
      },
      {
        text: "3",
        value: 1,
      },
    ],
  },

  {
    question:
      "According to Christopher Vogler’s Writer’s Journey, the characters in the story are...",
    answers: [
      {
        text: "Based on mythological archetypes",
        value: 0,
      },
      {
        text: "Unique and can’t be categorized in any way",
        value: 1,
      },
    ],
  },

  {
    question:
      "According to Vogler’s Hero’s Journey scheme, when the Hero gets the call to adventure, usually he:",
    answers: [
      {
        text: "Answers to the call immediately",
        value: 1,
      },
      {
        text: "First refuses the call",
        value: 0,
      },
    ],
  },

  {
    question: "In screenwriting, what is a 'MacGuffin'?",
    answers: [
      {
        text: "An object that drives the plot",
        value: 0,
      },
      {
        text: "Main character's secret",
        value: 1,
      },
    ],
  },

  {
    question:
      "In the context of a 'Character Bible,' what kind of information is crucial to include about the protagonist?",
    answers: [
      {
        text: "Their appearence, age and wardrobe",
        value: 1,
      },
      {
        text: "Backstory, motivations, and character arc",
        value: 0,
      },
    ],
  },

  {
    question: "A Synopsis for your screenplay should primarily:",
    answers: [
      {
        text: "Outline the main plot and key turning points",
        value: 0,
      },
      {
        text: "Detail every scene and dialogue",
        value: 1,
      },
    ],
  },

  {
    question:
      "When creating a Season Outline for a TV series, what is essential to illustrate?",
    answers: [
      {
        text: "The progression of the season's narrative",
        value: 0,
      },
      {
        text: "The number of scenes in each episode",
        value: 1,
      },
    ],
  },

  {
    question: "A Pilot Script should NOT:",
    answers: [
      {
        text: "Introduce the main characters and the world",
        value: 1,
      },
      {
        text: "Resolve all the conflicts presented in the series",
        value: 0,
      },
    ],
  },

  {
    question: "A good logline should:",
    answers: [
      {
        text: "Provide a detailed description of the setting",
        value: 1,
      },
      {
        text: "Convey the central conflict and hook of the story",
        value: 0,
      },
    ],
  },

  {
    question: "A Treatment for a screenplay is:",
    answers: [
      {
        text: "Description of each scene in the screenplay",
        value: 1,
      },
      {
        text: "A short narrative description of the main story",
        value: 0,
      },
    ],
  },

  {
    question: "Step Outline is primarily used for defining...",
    answers: [
      {
        text: "The subject matter of each dialogue",
        value: 1,
      },
      {
        text: "Each scene's actions and purpose before writing the script",
        value: 0,
      },
    ],
  },

  {
    question: "What comes earlier in the screenwriting process?",
    answers: [
      {
        text: "Step Outline",
        value: 0,
      },
      {
        text: "Treatment",
        value: 1,
      },
    ],
  },

  {
    question: "What comes later in the screenwriting process?",
    answers: [
      {
        text: "Spec script",
        value: 0,
      },
      {
        text: "Treatment",
        value: 1,
      },
    ],
  },

  {
    question: "One or two sentences summary of the story is called:",
    answers: [
      {
        text: "Synopsis",
        value: 1,
      },
      {
        text: "Logline",
        value: 0,
      },
    ],
  },

  {
    question:
      "If you are asked for a brief narrative description of your story to provide a quick overview, what do you give?",
    answers: [
      {
        text: "Treatment",
        value: 1,
      },
      {
        text: "Synopsis",
        value: 0,
      },
    ],
  },

  {
    question:
      "A complete version of a story, written in screenplay format, is called:",
    answers: [
      {
        text: "Spec Script",
        value: 0,
      },
      {
        text: "Treatment",
        value: 1,
      },
    ],
  },

  {
    question: "Usual length of a scene in the step outline:",
    answers: [
      {
        text: "One page",
        value: 1,
      },
      {
        text: "One or two sentences",
        value: 0,
      },
    ],
  },

  {
    question: "The length of a feauture-film treatment is:",
    answers: [
      {
        text: "Not defined",
        value: 0,
      },
      {
        text: "1-3 pages",
        value: 1,
      },
    ],
  },

  {
    question:
      "Which document is rather used as a tool for the screenwriter's own development process rather than for marketing purposes?",
    answers: [
      {
        text: "Treatment",
        value: 0,
      },
      {
        text: "Synopsis",
        value: 1,
      },
    ],
  },

  {
    question: "What is the main goal of a pitch meeting for a screenwriter?",
    answers: [
      {
        text: "To present the story idea to secure interest or funding.",
        value: 0,
      },
      {
        text: "To gather feedback on the script's first draft",
        value: 1,
      },
    ],
  },

  {
    question:
      "Is it appropriate for a spec script to include specific camera shot directions?",
    answers: [
      {
        text: "Yes, it's important to indicate camera movements",
        value: 1,
      },
      {
        text: "Camera directions are typically left for shooting scripts",
        value: 0,
      },
    ],
  },

  {
    question: "What are the font requirements for standard screenplay format?",
    answers: [
      {
        text: "14-point Calibry font size ",
        value: 1,
      },
      {
        text: "12-point Courier font size",
        value: 0,
      },
    ],
  },

  {
    question: "The standard length of a feature-film script is usually:",
    answers: [
      {
        text: "90-120 pages",
        value: 0,
      },
      {
        text: "200-240 pages",
        value: 1,
      },
    ],
  },

  {
    question: "What is a 'spec script'?",
    answers: [
      {
        text: "A script written without a commission or contract.",
        value: 0,
      },
      {
        text: "A script written under contract for a studio.",
        value: 0,
      },
    ],
  },

  {
    question:
      "When a character's name appear in the action lines it should be written in capital letters…?",
    answers: [
      {
        text: "Always",
        value: 1,
      },
      {
        text: "Only for the first time they are introduced",
        value: 0,
      },
    ],
  },

  {
    question: "What is the purpose of a parenthetical in dialogue?",
    answers: [
      {
        text: "To indicate who the character is speaking to",
        value: 1,
      },
      {
        text: "To provide direction on how the line should be delivered",
        value: 0,
      },
    ],
  },

  {
    question: "Action lines should be written ",
    answers: [
      {
        text: "In past tense ",
        value: 1,
      },
      {
        text: "In present tense ",
        value: 0,
      },
    ],
  },

  {
    question:
      "Which software is commonly used by screenwriters for script formatting?",
    answers: [
      {
        text: "Final Draft",
        value: 0,
      },
      {
        text: "Microsoft Excel",
        value: 1,
      },
    ],
  },

  {
    question: "What comes first in film making processs? ?",
    answers: [
      {
        text: "Pre-production",
        value: 1,
      },
      {
        text: "Development",
        value: 0,
      },
    ],
  },
];

export default mediationQuestions;
