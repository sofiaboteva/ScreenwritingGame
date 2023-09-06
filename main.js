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

  let currentQuestionIndex = 0;
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
          university: 10,
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
          ego: -10,
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
          text: "I'll invest my own money, let's till shoot it",
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
        "Classmate: You aren't on the crediits list of your friend movie that you helped him with",
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

  setNextQuestion();

  function setNextQuestion() {
    resetState();
    showQuestion(shuffledQuestions[currentQuestionIndex]);
    isLocked = false; // Reset the lock after showing the next question
  }

  function showQuestion(question) {
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

  function selectAnswer(university, ego, money, people) {
    console.log(university);
    console.log(ego);
    console.log(money);
    console.log(people);

    universityScore += university;
    egoScore += ego;
    moneyScore += money;
    peopleScore += people;

    universityScoreLabel.text = `University: ${universityScore}`;
    egoScoreLabel.text = `Ego: ${egoScore}`;
    moneyScoreLabel.text = `Money: ${moneyScore}`;
    peopleScoreLabel.text = `People: ${peopleScore}`;

    currentQuestionIndex++;

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
      wait(0.05, setNextQuestion); // introduce a slight delay before setting the next question
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
      go("start");
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
