kaboom({
  background: [0, 0, 0],
  width: 1200,
  height: 800,
});

scene("start", () => {
  const startButton = add([
    rect(240, 80, { radius: 8 }),
    pos(width() / 2, 150),
    area(),
    scale(1),
    anchor("center"),
    outline(4),
  ]);

  startButton.add([text("Start"), anchor("center"), color(0, 0, 0)]);

  startButton.onClick(() => {
    go("game");
  });
});

go("start");

scene("game", () => {
  let answerButtons = [];
  let universityScore = 30;
  let egoScore = 30;
  let moneyScore = 30;
  let peopleScore = 30;
  const examLabel = add([text(""), pos(width() / 2, 200), anchor("center")]);

  let currentQuestionIndex = 1;
  let examQuestionIndex = 1;
  let examcounter = 1;

  // const questionIndexLabel = add([
  //   text(`questionIndex: ${currentQuestionIndex}`),
  //   pos(24, 140),
  // ]);

  // const examQuestionIndexLabel = add([
  //   text(`examQuestionIndex: ${examQuestionIndex}`),
  //   pos(24, 170),
  // ]);

  // const examcounterLabel = add([
  //   text(`examcounter: ${examcounter}`),
  //   pos(24, 200),
  // ]);

  const universityScoreLabel = add([
    text(`University: ${universityScore}`),
    pos(24, 20),
  ]);
  const egoScoreLabel = add([text(`Ego: ${egoScore}`), pos(24, 50)]);
  const moneyScoreLabel = add([text(`Money: ${moneyScore}`), pos(24, 80)]);
  const peopleScoreLabel = add([text(`People: ${peopleScore}`), pos(24, 110)]);

  const questions = [
    {
      question:
        "Professor: You have no talent. Please, leave and never try to be screenwriter again.",
      answers: [
        {
          text: "Obey",
          university: -100,
          ego: -100,
          money: 0,
          people: -100,
        },
        {
          text: "You'll see",
          university: 0,
          ego: 0,
          money: 0,
          people: 0,
        },
      ],
    },
    {
      question:
        "Professor: Your student script should be very simple, following basic screenwriting rules",
      answers: [
        {
          text: "Sure, I am a reasonable student",
          university: 10,
          ego: -10,
          money: 0,
          people: 0,
        },
        {
          text: "Your rules are too tight for my Ego",
          university: -10,
          ego: 10,
          money: 0,
          people: -10,
        },
      ],
    },
    {
      question: "Professor: The short script you brought is crap.",
      answers: [
        {
          text: "Rewrite the script",
          university: 10,
          ego: -10,
          money: 0,
          people: 0,
        },
        {
          text: "Stick to your vision",
          university: -10,
          ego: 10,
          money: 0,
          people: 0,
        },
      ],
    },
    {
      question:
        "Professor: Congrats! You were invited to show your movie at a local film festival",
      answers: [
        {
          text: "Great! Let's go!",
          university: 10,
          ego: 0,
          money: -10,
          people: 10,
        },
        {
          text: "Nah, still waiting for an answer from Cannes",
          university: -10,
          ego: 10,
          money: 0,
          people: 0,
        },
      ],
    },
    {
      question:
        "Classmate: I know you need to finish your script but let's go to a big student party?",
      answers: [
        {
          text: "Sure, I'll come!",
          university: -10,
          ego: 0,
          money: -10,
          people: 10,
        },
        {
          text: "I'd rather work on the script",
          university: 10,
          ego: 10,
          money: 0,
          people: -10,
        },
      ],
    },
    {
      question: "Classmate: What do you think about my new script?",
      answers: [
        {
          text: "It's wonderful (lying)",
          university: 0,
          ego: -10,
          money: 0,
          people: 10,
        },
        {
          text: "It's terrbile (be honest)",
          university: 0,
          ego: 10,
          money: 0,
          people: -10,
        },
      ],
    },

    {
      question:
        "Professor: Do you want to do an internship as an assistant producer?",
      answers: [
        {
          text: "Yes, pleese!",
          university: 0,
          ego: -10,
          money: 10,
          people: 10,
        },
        {
          text: "I'm a creator, not a manager",
          university: 0,
          ego: 10,
          money: -10,
          people: 0,
        },
      ],
    },

    {
      question:
        "Famous Screenwriter: Today we are visited by a notorious screenwriter, you have a chance to pitch one of your ideas. What idea will you pitch?",
      answers: [
        {
          text: "A safe One",
          university: 10,
          ego: -10,
          money: 0,
          people: 0,
        },
        {
          text: "A daring one",
          university: -10,
          ego: 10,
          money: 0,
          people: 10,
        },
      ],
    },

    {
      question:
        "Famous Screenwriter: I think you are very talented. Will you be my ghostwriter?",
      answers: [
        {
          text: "Never!",
          university: 0,
          ego: 10,
          money: -10,
          people: -10,
        },
        {
          text: "With Pleasure",
          university: 0,
          ego: -10,
          money: 10,
          people: 0,
        },
      ],
    },

    {
      question:
        "Student Director: Can you work as an administrator on my movie set?",
      answers: [
        {
          text: "Sure",
          university: 0,
          ego: -10,
          money: 0,
          people: 20,
        },
        {
          text: "I've got better things to do",
          university: 0,
          ego: 10,
          money: 0,
          people: -10,
        },
      ],
    },

    {
      question:
        "Student Director: The school won't be able to finance our student film, based on your screenplay. Spaceship scenes are too expensive.",
      answers: [
        {
          text: "I'll invest my own money, let's still shoot it",
          university: 10,
          ego: 10,
          money: -20,
          people: 0,
        },
        {
          text: "Okay, I'll turn it to a one-room Covid drama",
          university: 0,
          ego: -10,
          money: 0,
          people: 0,
        },
      ],
    },

    {
      question: "Girlfriend: Will you go on summer holidays with me?",
      answers: [
        {
          text: "Hell yeah!",
          university: 0,
          ego: 0,
          money: -10,
          people: 10,
        },
        {
          text: "No, I need to work on my script",
          university: 10,
          ego: 10,
          money: 0,
          people: -10,
        },
      ],
    },

    {
      question:
        "Classmate: You aren't on the credits list of your friend's movie that you helped him with",
      answers: [
        {
          text: "Never mind' it's not so good",
          university: 0,
          ego: -20,
          money: 0,
          people: 0,
        },
        {
          text: "I'll sue him!",
          university: 0,
          ego: 20,
          money: 0,
          people: 0,
        },
      ],
    },

    {
      question:
        "Girlfriend: I'm tired of paying the rent by myself. Maybe you could work in a bar for a while?",
      answers: [
        {
          text: "Accept with a sigh",
          university: 0,
          ego: -10,
          money: 10,
          people: 0,
        },
        {
          text: "I'm a screenwriter, not a bartender",
          university: 0,
          ego: 10,
          money: -10,
          people: 0,
        },
      ],
    },

    {
      question:
        "Professor: You have a chance to participate in a student pitching tomorrow. But you have your shift at the bar at the same time.",
      answers: [
        {
          text: "Call in sick and skip the shift",
          university: 0,
          ego: 10,
          money: -20,
          people: 0,
        },
        {
          text: "Stick to the bar job",
          university: 0,
          ego: -20,
          money: 10,
          people: 0,
        },
      ],
    },

    {
      question:
        "Girlfriend: I wanna become an actress! I truly believe I'm talented. Could you speak to the director about me playing the main character in the movie based on your script?",
      answers: [
        {
          text: "Yes, my love",
          university: 0,
          ego: -10,
          money: 0,
          people: 10,
        },
        {
          text: "Well, not that talented",
          university: 0,
          ego: 0,
          money: 0,
          people: -20,
        },
      ],
    },

    {
      question:
        "Famous Screenwriter: We have a wonderful internship proposition at the production company I work for! It's long hours and it's unpaid ",
      answers: [
        {
          text: "Go for it",
          university: 0,
          ego: 10,
          money: -10,
          people: 10,
        },
        {
          text: "Never!",
          university: 0,
          ego: 0,
          money: 10,
          people: 0,
        },
      ],
    },

    {
      question:
        "You're so talented! We want you to write some episodes for a TV soap opera. It's awful but the money are good. But you'll have to give up your studies for some time",
      answers: [
        {
          text: " I'll do it",
          university: -20,
          ego: 0,
          money: 20,
          people: 0,
        },
        {
          text: "I won't sell my talent",
          university: 0,
          ego: 10,
          money: -10,
          people: 0,
        },
      ],
    },

    {
      question:
        "Student: Your script idea is really promising. Let's work on it together!",
      answers: [
        {
          text: "Sure, two minds are better than one",
          university: 0,
          ego: 0,
          money: 0,
          people: 10,
        },
        {
          text: "I'm a lone wolf",
          university: 0,
          ego: 10,
          money: 0,
          people: -10,
        },
      ],
    },
  ];

  const examQuestions = [
    {
      question:
        "What is the first thing your main character should always have?",
      answers: [
        {
          text: "Goal",
          university: 0,
          ego: 0,
          money: 0,
          people: 0,
        },
        {
          text: "Self-esteem",
          university: -60,
          ego: 0,
          money: 0,
          people: 0,
        },
      ],
    },

    {
      question: "Most stories have...",
      answers: [
        {
          text: "A single central character",
          university: 0,
          ego: 0,
          money: 0,
          people: 0,
        },
        {
          text: "Several central characters",
          university: -60,
          ego: 0,
          money: 0,
          people: 0,
        },
      ],
    },

    {
      question: "The character should achieve his goal...",
      answers: [
        {
          text: "By overcoming many obstacles",
          university: 0,
          ego: 0,
          money: 0,
          people: 0,
        },
        {
          text: "Without struggle",
          university: -60,
          ego: 0,
          money: 0,
          people: 0,
        },
      ],
    },

    {
      question: "How many goals should a character have?",
      answers: [
        {
          text: "One",
          university: 0,
          ego: 0,
          money: 0,
          people: 0,
        },
        {
          text: "As much as you want",
          university: -60,
          ego: 0,
          money: 0,
          people: 0,
        },
      ],
    },

    {
      question: "What is the most important aspect of the main hero's goal?",
      answers: [
        {
          text: "It should be hard to achieve",
          university: 0,
          ego: 0,
          money: 0,
          people: 0,
        },
        {
          text: "It should be easy to achieve",
          university: -60,
          ego: 0,
          money: 0,
          people: 0,
        },
      ],
    },

    {
      question: "What is the opponent of the main hero is called?",
      answers: [
        {
          text: "Antagonist",
          university: 0,
          ego: 0,
          money: 0,
          people: 0,
        },
        {
          text: "Protagonist",
          university: -60,
          ego: 0,
          money: 0,
          people: 0,
        },
      ],
    },

    {
      question: "The main hero can be his or her own antagonist",
      answers: [
        {
          text: "True",
          university: 0,
          ego: 0,
          money: 0,
          people: 0,
        },
        {
          text: "False",
          university: -60,
          ego: 0,
          money: 0,
          people: 0,
        },
      ],
    },

    {
      question: "The conflict of the main character with himself is called...",
      answers: [
        {
          text: "Internal conflict",
          university: 0,
          ego: 0,
          money: 0,
          people: 0,
        },
        {
          text: "Autoconflict",
          university: -60,
          ego: 0,
          money: 0,
          people: 0,
        },
      ],
    },

    {
      question:
        "The conflict can be internal or external but not both at the same time",
      answers: [
        {
          text: "True",
          university: -60,
          ego: 0,
          money: 0,
          people: 0,
        },
        {
          text: "False",
          university: 0,
          ego: 0,
          money: 0,
          people: 0,
        },
      ],
    },

    {
      question: "What creates a conflict?",
      answers: [
        {
          text: "Anything that stops the hero from achieving his goal",
          university: 0,
          ego: 0,
          money: 0,
          people: 0,
        },
        {
          text: "Only hero's fight with antagonist",
          university: -60,
          ego: 0,
          money: 0,
          people: 0,
        },
      ],
    },

    {
      question:
        "What does the term three-act structure refer to in screenwriting?",
      answers: [
        {
          text: "The journey of the protagonist through three distinct acts",
          university: 0,
          ego: 0,
          money: 0,
          people: 0,
        },
        {
          text: "The inclusion of three major conflicts in the story",
          university: -60,
          ego: 0,
          money: 0,
          people: 0,
        },
      ],
    },

    {
      question: "How many acts does the traditional story structure include?",
      answers: [
        {
          text: "3",
          university: 0,
          ego: 0,
          money: 0,
          people: 0,
        },
        {
          text: "4",
          university: -60,
          ego: 0,
          money: 0,
          people: 0,
        },
      ],
    },

    {
      question:
        "In a good screenplay the character should always say what he really feels",
      answers: [
        {
          text: "True",
          university: -60,
          ego: 0,
          money: 0,
          people: 0,
        },
        {
          text: "False",
          university: 0,
          ego: 0,
          money: 0,
          people: 0,
        },
      ],
    },

    {
      question: "What is the purpose of a screenplay's subtext?",
      answers: [
        {
          text: "To provide stage directions for the actors",
          university: -60,
          ego: 0,
          money: 0,
          people: 0,
        },
        {
          text: "To convey deeper meanings and underlying emotions",
          university: 0,
          ego: 0,
          money: 0,
          people: 0,
        },
      ],
    },

    {
      question:
        "The unnessessary for the story action thar is removed from the scene by editing are called...",
      answers: [
        {
          text: "Timelapse",
          university: -60,
          ego: 0,
          money: 0,
          people: 0,
        },
        {
          text: "Ellipsis",
          university: 0,
          ego: 0,
          money: 0,
          people: 0,
        },
      ],
    },
    {
      question: "Final outcome of the story is called...",
      answers: [
        {
          text: "Climax",
          university: -60,
          ego: 0,
          money: 0,
          people: 0,
        },
        {
          text: "Resolution",
          university: 0,
          ego: 0,
          money: 0,
          people: 0,
        },
      ],
    },

    {
      question: "What is the purpose of a screenplay's exposition?",
      answers: [
        {
          text: "To introduce the main conflict",
          university: -60,
          ego: 0,
          money: 0,
          people: 0,
        },
        {
          text: "To provide background information about the characters",
          university: 0,
          ego: 0,
          money: 0,
          people: 0,
        },
      ],
    },

    {
      question:
        "Necessary information on the characters explained in the beginning of the film is called...",
      answers: [
        {
          text: "Prelude",
          university: -60,
          ego: 0,
          money: 0,
          people: 0,
        },
        {
          text: "Exposition",
          university: 0,
          ego: 0,
          money: 0,
          people: 0,
        },
      ],
    },

    {
      question: "More often it is better if the exposition is presented...",
      answers: [
        {
          text: "In an obvious manner",
          university: -60,
          ego: 0,
          money: 0,
          people: 0,
        },
        {
          text: "In a discreet manner",
          university: 0,
          ego: 0,
          money: 0,
          people: 0,
        },
      ],
    },

    {
      question:
        "It is better if all the facts of the exposition are presented...",
      answers: [
        {
          text: "At once",
          university: -60,
          ego: 0,
          money: 0,
          people: 0,
        },
        {
          text: "Progressively",
          university: 0,
          ego: 0,
          money: 0,
          people: 0,
        },
      ],
    },

    {
      question:
        "When presenting a character in a screenplay for the first time you should...",
      answers: [
        {
          text: "Describe his appearence and behaviour in every detail",
          university: -60,
          ego: 0,
          money: 0,
          people: 0,
        },
        {
          text: "Only give details that are necessary to the story",
          university: 0,
          ego: 0,
          money: 0,
          people: 0,
        },
      ],
    },

    {
      question: "What is dramatic irony?",
      answers: [
        {
          text: "When the audience has better knowledge of the facts then the character",
          university: 0,
          ego: 0,
          money: 0,
          people: 0,
        },
        {
          text: "An amusing resolution of a dramatic situation",
          university: -60,
          ego: 0,
          money: 0,
          people: 0,
        },
      ],
    },

    {
      question:
        "A state of viewer's excitement or anxious uncertainty about a certain outcome is called...",
      answers: [
        {
          text: "Suspense",
          university: 0,
          ego: 0,
          money: 0,
          people: 0,
        },
        {
          text: "Dramatic tension",
          university: -60,
          ego: 0,
          money: 0,
          people: 0,
        },
      ],
    },

    {
      question: "A detail that is paid off later is called...",
      answers: [
        {
          text: "Flashforward",
          university: -60,
          ego: 0,
          money: 0,
          people: 0,
        },
        {
          text: "Plant",
          university: 0,
          ego: 0,
          money: 0,
          people: 0,
        },
      ],
    },

    {
      question: "The reveal of plant is called...",
      answers: [
        {
          text: "Climax",
          university: -60,
          ego: 0,
          money: 0,
          people: 0,
        },
        {
          text: "Payoff",
          university: 0,
          ego: 0,
          money: 0,
          people: 0,
        },
      ],
    },

    {
      question: "Plants and payoffs work beter when...",
      answers: [
        {
          text: "They are separated by screentime",
          university: 0,
          ego: 0,
          money: 0,
          people: 0,
        },
        {
          text: "The payoff happens immediately after planting",
          university: -60,
          ego: 0,
          money: 0,
          people: 0,
        },
      ],
    },

    {
      question: "What is the purpose of a screenplay's resolution?",
      answers: [
        {
          text: "To leave the audience with a cliffhanger",
          university: -60,
          ego: 0,
          money: 0,
          people: 0,
        },
        {
          text: "To tie up loose ends and provide closure",
          university: 0,
          ego: 0,
          money: 0,
          people: 0,
        },
      ],
    },

    {
      question: "What is the purpose of a screenplay's climax?",
      answers: [
        {
          text: "To resolve the central conflict",
          university: 0,
          ego: 0,
          money: 0,
          people: 0,
        },
        {
          text: "To establish the theme of the story",
          university: -60,
          ego: 0,
          money: 0,
          people: 0,
        },
      ],
    },

    {
      question: "What is the purpose of a screenplay's inciting incident?",
      answers: [
        {
          text: "To introduce the main characters",
          university: -60,
          ego: 0,
          money: 0,
          people: 0,
        },
        {
          text: "To kickstart the central conflict",
          university: 0,
          ego: 0,
          money: 0,
          people: 0,
        },
      ],
    },

    {
      question: "What does contract with the audience mean?",
      answers: [
        {
          text: "Youyr contract with the viewer stating you'll make a worthy film",
          university: -60,
          ego: 0,
          money: 0,
          people: 0,
        },
        {
          text: "The viewer gives you his time and money and you entertain him",
          university: 0,
          ego: 0,
          money: 0,
          people: 0,
        },
      ],
    },

    {
      question:
        "Of three unities defined by Aristote (time, place and action) the screenwriter should most often adhere to the unity of...",
      answers: [
        {
          text: "Action",
          university: 0,
          ego: 0,
          money: 0,
          people: 0,
        },
        {
          text: "Time and place",
          university: -60,
          ego: 0,
          money: 0,
          people: 0,
        },
      ],
    },
  ];

  const questionElement = add([
    text("Question", {
      width: width() - 500,
      wrap: true,
      size: 30,
    }),
    pos(width() / 2, 300),
    anchor("center"),
  ]);

  let shuffledQuestions = questions.sort(() => Math.random() - 0.5);

  let shuffledExamQuestions = examQuestions.sort(() => Math.random() - 0.5);

  setNextQuestion();

  function setNextQuestion() {
    resetState();

    if (currentQuestionIndex % 5 === 0 && examcounter <= 5) {
      // Show a special question here
      showExamQuestion(shuffledExamQuestions[examQuestionIndex]);
    } else {
      // Show a regular question
      examcounter = 1;
      // examcounterLabel.text = `examcounter: ${examcounter}`;

      showQuestion(shuffledQuestions[currentQuestionIndex]);
    }

    isLocked = false;
  }

  function showQuestion(question) {
    examLabel.text = "";
    questionElement.text = question.question;
    question.answers.forEach((answer, index) => {
      let button = add([
        rect(900, 100, { radius: 8 }),
        pos(width() / 2, 450 + index * 100),
        area(),
        scale(1),
        anchor("center"),
        outline(4),
      ]);

      button.add([
        text(answer.text, { size: 25 }),
        anchor("center"),
        color(0, 0, 0),
      ]);

      button.value1 = answer.university;
      button.value2 = answer.ego;
      button.value3 = answer.money;
      button.value4 = answer.people;

      button.onClick(() => {
        if (isLocked) return; // If locked, do not process the click

        isLocked = true; // Lock input processing once the button is clicked
        selectAnswer(
          answer.university,
          answer.ego,
          answer.money,
          answer.people
        );
      });

      answerButtons.push(button);
    });
  }

  function showExamQuestion(question) {
    examLabel.text = "Exam time!";
    questionElement.text = question.question;
    question.answers.forEach((answer, index) => {
      let button = add([
        rect(900, 100, { radius: 8 }),
        pos(width() / 2, 450 + index * 100),
        area(),
        scale(1),
        anchor("center"),
        outline(4),
      ]);

      button.add([
        text(answer.text, { size: 25 }),
        anchor("center"),
        color(0, 0, 0),
      ]);

      button.value = answer.university;

      button.onClick(() => {
        if (isLocked) return; // If locked, do not process the click

        isLocked = true; // Lock input processing once the button is clicked
        selectExamAnswer(answer.university);
      });

      answerButtons.push(button);
    });
  }

  function selectAnswer(university, ego, money, people) {
    console.log(university);
    console.log(ego);
    console.log(money);
    console.log(people);

    universityScore += university;
    egoScore += ego;
    moneyScore += money;
    peopleScore += people;

    currentQuestionIndex++;

    universityScoreLabel.text = `University: ${universityScore}`;
    egoScoreLabel.text = `Ego: ${egoScore}`;
    moneyScoreLabel.text = `Money: ${moneyScore}`;
    peopleScoreLabel.text = `People: ${peopleScore}`;
    // questionIndexLabel.text = `questionIndex: ${currentQuestionIndex}`;

    if (
      shuffledQuestions.length > currentQuestionIndex &&
      0 < universityScore &&
      universityScore < 60 &&
      0 < egoScore &&
      egoScore < 60 &&
      0 < moneyScore &&
      moneyScore < 60 &&
      0 < peopleScore &&
      peopleScore < 60
    ) {
      wait(0.05, setNextQuestion);
    } else if (
      shuffledQuestions.length > currentQuestionIndex &&
      universityScore >= 60
    ) {
      go("universityHigh");
    } else if (
      shuffledQuestions.length > currentQuestionIndex &&
      universityScore <= 0
    ) {
      go("universityLow");
    } else if (
      shuffledQuestions.length > currentQuestionIndex &&
      egoScore >= 60
    ) {
      go("egoHigh");
    } else if (
      shuffledQuestions.length > currentQuestionIndex &&
      egoScore <= 0
    ) {
      go("egoLow");
    } else if (
      shuffledQuestions.length > currentQuestionIndex &&
      moneyScore >= 60
    ) {
      go("moneyHigh");
    } else if (
      shuffledQuestions.length > currentQuestionIndex &&
      moneyScore <= 0
    ) {
      go("moneyLow");
    } else if (
      shuffledQuestions.length > currentQuestionIndex &&
      peopleScore >= 60
    ) {
      go("peopleHigh");
    } else if (
      shuffledQuestions.length > currentQuestionIndex &&
      peopleScore <= 0
    ) {
      go("peopleLow");
    } else {
      go("win");
    }
  }

  function selectExamAnswer(university) {
    examQuestionIndex++;
    examcounter++;
    universityScore += university;

    // examQuestionIndexLabel.text = `examquestionIndex: ${examQuestionIndex}`;
    // examcounterLabel.text = `examcounter: ${examcounter}`;

    if (shuffledQuestions.length > examQuestionIndex && 0 < universityScore) {
      wait(0.05, setNextQuestion);
    }
    // if (
    //   shuffledQuestions.length > examQuestionIndex &&
    //   universityScore <= 0
    // )
    else {
      go("universityLow");
    }
  }

  function resetState() {
    answerButtons.forEach((button) => destroy(button));
    answerButtons = [];
  }
});

scene("universityHigh", () => {
  add([
    text(
      "You pursue an academic career and eventually become a professor. You've written a book about screenwriting but have never made any movie. You feel like a fraud.",
      {
        width: width() - 500,
        wrap: true,
        size: 30,
      }
    ),
    pos(width() / 2, 300),
    anchor("center"),
  ]);

  onKeyPress("space", () => go("start"));
  onClick(() => go("game"));
});

scene("egoHigh", () => {
  add([
    text(
      "You lose all your friends and leave university, persuaded that your scripts are underrated. You're a genius, but only in your mind. You end up making one-person shows that nobody buys tickets for.",
      {
        width: width() - 500,
        wrap: true,
        size: 30,
      }
    ),
    pos(width() / 2, 300),
    anchor("center"),
  ]);

  onKeyPress("space", () => go("start"));
  onClick(() => go("game"));
});

scene("moneyHigh", () => {
  add([
    text(
      "You're lured by the glitter of money and bid farewell to your artistic dreams. You become a producer, but word on the street is that your bankroll is more mob-connected than your movie plots.",
      {
        width: width() - 500,
        wrap: true,
        size: 30,
      }
    ),
    pos(width() / 2, 300),
    anchor("center"),
  ]);

  onKeyPress("space", () => go("start"));
  onClick(() => go("game"));
});

scene("peopleHigh", () => {
  add([
    text(
      "Your desperate bid to please everyone turns you into a doormat. You end up writing tweets, desperately seeking likes and fleeting fame.",
      {
        width: width() - 500,
        wrap: true,
        size: 30,
      }
    ),
    pos(width() / 2, 300),
    anchor("center"),
  ]);

  onKeyPress("space", () => go("start"));
  onClick(() => go("game"));
});

scene("universityLow", () => {
  add([
    text(
      "You drop out of university and become a bartender. You're now a master of mixing drinks and stories, and the local drunkards can't get enough of both.",
      {
        width: width() - 500,
        wrap: true,
        size: 30,
      }
    ),
    pos(width() / 2, 300),
    anchor("center"),
  ]);

  onKeyPress("space", () => go("start"));
  onClick(() => go("game"));
});

scene("egoLow", () => {
  add([
    text(
      "You don't know how to defend your point. Actually, you don't even know what your point is. You surrender to your parents' wishes and head off to law school.",
      {
        width: width() - 500,
        wrap: true,
        size: 30,
      }
    ),
    pos(width() / 2, 300),
    anchor("center"),
  ]);

  onKeyPress("space", () => go("start"));
  onClick(() => go("game"));
});

scene("moneyLow", () => {
  add([
    text(
      "You're so broke that you resort to stealing food. You get caught and end up in jail. On the bright side you'll have some stories to tell when you get out.",
      {
        width: width() - 500,
        wrap: true,
        size: 30,
      }
    ),
    pos(width() / 2, 300),
    anchor("center"),
  ]);

  onKeyPress("space", () => go("start"));
  onClick(() => go("game"));
});

scene("peopleLow", () => {
  add([
    text(
      "People are afraid to deal with you. You end up alone, writing scripts that nobody will ever read and go crazy talking to your characters. At least they listen to you.",
      {
        width: width() - 500,
        wrap: true,
        size: 30,
      }
    ),
    pos(width() / 2, 300),
    anchor("center"),
  ]);

  onKeyPress("space", () => go("start"));
  onClick(() => go("game"));
});

scene("win", () => {
  add([
    text(
      "You successfully graduate from university, having written some great shorts and forged valuable connections. But beware, this is only Act One of your life journey.",
      {
        width: width() - 500,
        wrap: true,
        size: 30,
      }
    ),
    pos(width() / 2, 300),
    anchor("center"),
  ]);

  onKeyPress("space", () => go("start"));
  onClick(() => go("game"));
});
