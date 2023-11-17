import questions from "/questions.js";
import questions2 from "/questions2.js";
import examQuestions from "/examQuestions.js";
let isLocked = false;

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
    go("win");
  });
});

go("start");

scene("level1", () => {
  let answerButtons = [];
  let universityScore = 40;
  let egoScore = 40;
  let moneyScore = 40;
  let relationshipsScore = 40;

  let examFailedScore = 0;

  const examLabel = add([text(""), pos(width() / 2, 200), anchor("center")]);
  //const examFailedLabel = add([text(""), pos(width() / 2, 150)]);

  let currentQuestionIndex = 1;
  let examQuestionIndex = 1;
  let examcounter = 1;

  const universityScoreLabel = add([
    text(`University: ${universityScore}`),
    pos(24, 20),
  ]);
  const egoScoreLabel = add([text(`Ego: ${egoScore}`), pos(24, 50)]);
  const moneyScoreLabel = add([text(`Money: ${moneyScore}`), pos(24, 80)]);
  const relationshipsScoreLabel = add([
    text(`Relationships: ${relationshipsScore}`),
    pos(24, 110),
  ]);

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
    //examFailedLabel.text = "";
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
      button.value4 = answer.relationships;

      button.onClick(() => {
        if (isLocked) return; // If locked, do not process the click

        isLocked = true; // Lock input processing once the button is clicked
        selectAnswer(
          answer.university,
          answer.ego,
          answer.money,
          answer.relationships
        );
      });

      answerButtons.push(button);
    });
  }

  function showExamQuestion(question) {
    examLabel.text = `Exam time! Questions failed: ${examFailedScore}`;
    //examFailedLabel.text = `Exams failed: ${examFailedScore}`;
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

      button.value = answer.value;

      button.onClick(() => {
        if (isLocked) return; // If locked, do not process the click

        isLocked = true; // Lock input processing once the button is clicked
        selectExamAnswer(answer.value);
      });

      answerButtons.push(button);
    });
  }

  function selectAnswer(university, ego, money, relationships) {
    universityScore += university;
    egoScore += ego;
    moneyScore += money;
    relationshipsScore += relationships;

    currentQuestionIndex++;

    universityScoreLabel.text = `University: ${universityScore}`;
    egoScoreLabel.text = `Ego: ${egoScore}`;
    moneyScoreLabel.text = `Money: ${moneyScore}`;
    relationshipsScoreLabel.text = `Relationships: ${relationshipsScore}`;
    // questionIndexLabel.text = `questionIndex: ${currentQuestionIndex}`;

    if (
      shuffledQuestions.length > currentQuestionIndex &&
      0 < universityScore &&
      universityScore < 90 &&
      0 < egoScore &&
      egoScore < 90 &&
      0 < moneyScore &&
      moneyScore < 90 &&
      0 < relationshipsScore &&
      relationshipsScore < 90
    ) {
      wait(0.05, setNextQuestion);
    } else if (
      shuffledQuestions.length > currentQuestionIndex &&
      universityScore >= 90
    ) {
      go("universityHigh");
    } else if (
      shuffledQuestions.length > currentQuestionIndex &&
      universityScore <= 0
    ) {
      go("universityLow");
    } else if (
      shuffledQuestions.length > currentQuestionIndex &&
      egoScore >= 90
    ) {
      go("egoHigh");
    } else if (
      shuffledQuestions.length > currentQuestionIndex &&
      egoScore <= 0
    ) {
      go("egoLow");
    } else if (
      shuffledQuestions.length > currentQuestionIndex &&
      moneyScore >= 90
    ) {
      go("moneyHigh");
    } else if (
      shuffledQuestions.length > currentQuestionIndex &&
      moneyScore <= 0
    ) {
      go("moneyLow");
    } else if (
      shuffledQuestions.length > currentQuestionIndex &&
      relationshipsScore >= 90
    ) {
      go("relationshipsHigh");
    } else if (
      shuffledQuestions.length > currentQuestionIndex &&
      relationshipsScore <= 0
    ) {
      go("relationshipsLow");
    } else {
      go("win");
    }
  }

  function selectExamAnswer(value) {
    examQuestionIndex++;
    examcounter++;
    //universityScore += university;
    examFailedScore += value;
    //examFailedLabel.text = `Questions failed: ${examFailedScore}`;
    examLabel.text = `Exam time! Questions failed: ${examFailedScore}`;

    // examQuestionIndexLabel.text = `examquestionIndex: ${examQuestionIndex}`;
    // examcounterLabel.text = `examcounter: ${examcounter}`;

    if (shuffledQuestions.length > examQuestionIndex && examFailedScore < 3) {
      wait(0.05, setNextQuestion);
    } else {
      go("universityLow");
    }
  }

  function resetState() {
    answerButtons.forEach((button) => destroy(button));
    answerButtons = [];
  }
});

scene("level2", () => {
  let answerButtons = [];
  let fameScore = 40;
  let egoScore = 40;
  let moneyScore = 40;
  let relationshipsScore = 40;

  let examFailedScore = 0;

  const examLabel = add([text(""), pos(width() / 2, 200), anchor("center")]);

  let currentQuestionIndex = 1;
  let examQuestionIndex = 1;
  let examcounter = 1;

  const fameScoreLabel = add([text(`Fame: ${fameScore}`), pos(24, 20)]);
  const egoScoreLabel = add([text(`Ego: ${egoScore}`), pos(24, 50)]);
  const moneyScoreLabel = add([text(`Money: ${moneyScore}`), pos(24, 80)]);
  const relationshipsScoreLabel = add([
    text(`Relationships: ${relationshipsScore}`),
    pos(24, 110),
  ]);

  const questionElement = add([
    text("Question", {
      width: width() - 500,
      wrap: true,
      size: 30,
    }),
    pos(width() / 2, 300),
    anchor("center"),
  ]);

  let shuffledQuestions = questions2.sort(() => Math.random() - 0.5);

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
    //examFailedLabel.text = "";
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

      button.value1 = answer.fame;
      button.value2 = answer.ego;
      button.value3 = answer.money;
      button.value4 = answer.relationships;

      button.onClick(() => {
        if (isLocked) return; // If locked, do not process the click

        isLocked = true; // Lock input processing once the button is clicked
        selectAnswer(
          answer.fame,
          answer.ego,
          answer.money,
          answer.relationships
        );
      });

      answerButtons.push(button);
    });
  }

  function showExamQuestion(question) {
    examLabel.text = `Exam time! Questions failed: ${examFailedScore}`;
    //examFailedLabel.text = `Exams failed: ${examFailedScore}`;
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

      button.value = answer.value;

      button.onClick(() => {
        if (isLocked) return; // If locked, do not process the click

        isLocked = true; // Lock input processing once the button is clicked
        selectExamAnswer(answer.value);
      });

      answerButtons.push(button);
    });
  }

  function selectAnswer(fame, ego, money, relationships) {
    fameScore += fame;
    egoScore += ego;
    moneyScore += money;
    relationshipsScore += relationships;

    currentQuestionIndex++;

    fameScoreLabel.text = `Fame: ${fameScore}`;
    egoScoreLabel.text = `Ego: ${egoScore}`;
    moneyScoreLabel.text = `Money: ${moneyScore}`;
    relationshipsScoreLabel.text = `Relationships: ${relationshipsScore}`;
    // questionIndexLabel.text = `questionIndex: ${currentQuestionIndex}`;

    if (
      shuffledQuestions.length > currentQuestionIndex &&
      0 < fameScore &&
      fameScore < 90 &&
      0 < egoScore &&
      egoScore < 90 &&
      0 < moneyScore &&
      moneyScore < 90 &&
      0 < relationshipsScore &&
      relationshipsScore < 90
    ) {
      wait(0.05, setNextQuestion);
    } else if (
      shuffledQuestions.length > currentQuestionIndex &&
      fameScore >= 90
    ) {
      go("fameHigh");
    } else if (
      shuffledQuestions.length > currentQuestionIndex &&
      universityScore <= 0
    ) {
      go("fameLow");
    } else if (
      shuffledQuestions.length > currentQuestionIndex &&
      egoScore >= 90
    ) {
      go("egoHigh");
    } else if (
      shuffledQuestions.length > currentQuestionIndex &&
      egoScore <= 0
    ) {
      go("egoLow");
    } else if (
      shuffledQuestions.length > currentQuestionIndex &&
      moneyScore >= 90
    ) {
      go("moneyHigh");
    } else if (
      shuffledQuestions.length > currentQuestionIndex &&
      moneyScore <= 0
    ) {
      go("moneyLow");
    } else if (
      shuffledQuestions.length > currentQuestionIndex &&
      relationshipsScore >= 90
    ) {
      go("relationshipsHigh");
    } else if (
      shuffledQuestions.length > currentQuestionIndex &&
      relationshipsScore <= 0
    ) {
      go("relationshipsLow");
    } else {
      go("win");
    }
  }

  function selectExamAnswer(value) {
    examQuestionIndex++;
    examcounter++;
    examFailedScore += value;
    examLabel.text = `Exam time! Questions failed: ${examFailedScore}`;

    // examQuestionIndexLabel.text = `examquestionIndex: ${examQuestionIndex}`;
    // examcounterLabel.text = `examcounter: ${examcounter}`;

    if (shuffledQuestions.length > examQuestionIndex && examFailedScore < 3) {
      wait(0.05, setNextQuestion);
    } else {
      go("fameLow");
    }
  }

  function resetState() {
    answerButtons.forEach((button) => destroy(button));
    answerButtons = [];
  }
});

scene("fameHigh", () => {
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
  onClick(() => go("level1"));
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
  onClick(() => go("level1"));
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
  onClick(() => go("level1"));
});

scene("relationshipsHigh", () => {
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
  onClick(() => go("level1"));
});

scene("fameLow", () => {
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
  onClick(() => go("level1"));
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
  onClick(() => go("level1"));
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
  onClick(() => go("level1"));
});

scene("relationshipsLow", () => {
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
  onClick(() => go("level1"));
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

  const nextLevelButton = add([
    rect(240, 80, { radius: 8 }),
    pos(width() / 2, 450),
    area(),
    scale(1),
    anchor("center"),
    outline(4),
  ]);

  nextLevelButton.add([text("Continue"), anchor("center"), color(0, 0, 0)]);

  nextLevelButton.onClick(() => {
    go("level2");
  });
});
