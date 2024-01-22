kaboom({
  background: [0, 0, 0],
  width: 360,
  height: 600,
  root: document.getElementById("game-container"),
});

import questions from "/scripts/questions.js";
import questions2 from "/scripts/questions2.js";
import examQuestions from "/scripts/examQuestions.js";
import mediationQuestions from "/scripts/mediationquestions.js";
import tutorialQuestions from "/scripts/tutorialQuestions.js";

// load sprites
loadFont("myfont", "font/XTypewriter-Regular.ttf");
loadSprite("book", "/assets/book.png");
loadSprite("ego", "/assets/ambition_last.png");
loadSprite("money", "/assets/money.png");
loadSprite("relationships", "/assets/chat.png");
loadSprite("star", "/assets/star.png");

// Constants for relative measurements
const PADDING = 24;
const BUTTON_WIDTH = width() * 0.75; // 75% of the canvas width
const BUTTON_HEIGHT = height() * 0.15; // 10% of the canvas height
const BUTTON_SPACING = height() * 0.01; // Space between buttons
const LABEL_VERTICAL_SPACING = width() * 0.25;
const TEXT_SIZE = width() * 0.05; // Relative text size

let isLocked = false;
let tutorialCompleted = false;
let secondLevelUnlocked = false;

let unlockedEndings = {
  universityHigh: false,
  universityLow: false,
  egoHigh: false,
  egoLow: false,
  moneyHigh: false,
  moneyLow: false,
  relationshipsHigh: false,
  relationshipsLow: false,
  fameHigh: false,
  fameLow: false,
  win1: false,
  win2: false,
  failedInterview: false,
};
let endingsScore = 0;

let unlockedRewards = {
  riskTaker: false,
  bigHead: false,
  artisticIntegrity: false,
};

let riskyChoicesMade = 0;
let artisticIntegrityScore = 0;

loadSprite("arrow", "/assets/arrow_3.png");

let rewardText = null;

// General function to position indicators
function getLabelPosition(labelIndex) {
  return {
    x: PADDING * 1.5 + labelIndex * LABEL_VERTICAL_SPACING,
    y: PADDING * 1.5,
  };
}

scene("level1", () => {
  let answerButtons = [];
  let universityScore = 40;
  let egoScore = 40;
  let moneyScore = 40;
  let relationshipsScore = 40;
  riskyChoicesMade = 0;
  artisticIntegrityScore = 0;
  let examFailedScore = 0;
  const questionElement = add([
    text("Question", {
      width: width() - PADDING * 2, // Padding from both sides
      wrap: true,
      size: TEXT_SIZE,
      font: "myfont",
    }),
    pos(width() / 2, height() * 0.35), // Positioning relatively
    anchor("center"),
  ]);

  const examLabel = add([
    text("", {
      width: width() - PADDING * 2, // Padding from both sides
      wrap: true,
      size: TEXT_SIZE,
      font: "myfont",
    }),
    //   pos(width() / 2, height() * 0.35),
    pos(questionElement.pos.x, questionElement.pos.y - 50),
    anchor("center"),
    color(255, 255, 255),
  ]);

  let currentQuestionIndex = 1;
  let examQuestionIndex = 1;
  let examcounter = 1;

  const UniversityScorePicture = add([
    sprite("book"),
    scale(0.2),
    pos(getLabelPosition(0).x + 15, getLabelPosition(0).y),
    anchor("center"),
  ]);

  const universityScoreLabel = add([
    text(`${universityScore}`, { size: TEXT_SIZE }),

    pos(UniversityScorePicture.pos.x * 0.8, UniversityScorePicture.pos.y * 1.8),
  ]);

  const EgoScorePicture = add([
    sprite("ego"),
    scale(0.16),
    pos(getLabelPosition(1).x + 15, getLabelPosition(1).y - 4),
    anchor("center"),
  ]);

  const egoScoreLabel = add([
    text(`${egoScore}`, { size: TEXT_SIZE }),
    pos(EgoScorePicture.pos.x * 0.9, EgoScorePicture.pos.y * 2),
  ]);

  const MoneyScorePicture = add([
    sprite("money"),
    scale(0.2),
    pos(getLabelPosition(2).x + 10, getLabelPosition(2).y - 2),
    anchor("center"),
  ]);

  const moneyScoreLabel = add([
    text(`${moneyScore}`, { size: TEXT_SIZE }),
    pos(MoneyScorePicture.pos.x * 0.95, MoneyScorePicture.pos.y * 1.9),
  ]);

  const RelationshipsScorePicture = add([
    sprite("relationships"),
    scale(0.18),
    pos(getLabelPosition(3).x + 5, getLabelPosition(3).y - 2),
    anchor("center"),
  ]);

  const relationshipsScoreLabel = add([
    text(`${relationshipsScore}`, { size: TEXT_SIZE }),
    pos(
      RelationshipsScorePicture.pos.x * 0.95,
      RelationshipsScorePicture.pos.y * 1.9
    ),
  ]);

  let shuffledQuestions = questions.sort(() => Math.random() - 0.5);

  let shuffledExamQuestions = examQuestions.sort(() => Math.random() - 0.5);

  setNextQuestion();

  function setNextQuestion() {
    if (rewardText) {
      wait(2, () => {
        destroy(rewardText);
        rewardText = null;
        loadNextQuestion();
      });
    } else {
      loadNextQuestion();
    }
  }

  function loadNextQuestion() {
    resetState();

    if (currentQuestionIndex % 5 === 0 && examcounter <= 5) {
      // Show a special question here
      showExamQuestion(shuffledExamQuestions[examQuestionIndex]);
    } else {
      // Show a regular question
      examcounter = 1;

      showQuestion(shuffledQuestions[currentQuestionIndex]);
    }

    isLocked = false;
  }

  function showQuestion(question) {
    examLabel.text = "";
    questionElement.text = question.question;
    question.answers.forEach((answer, index) => {
      let button = add([
        rect(BUTTON_WIDTH, BUTTON_HEIGHT, { radius: 2 }),
        pos(
          width() / 2,
          height() / 1.8 + index * (BUTTON_HEIGHT + BUTTON_SPACING)
        ),
        area(),
        scale(1),
        anchor("center"),
        outline(4),
      ]);

      const maxTextWidth = BUTTON_WIDTH - PADDING * 2;

      button.add([
        text(answer.text, {
          size: width() * 0.05,
          width: maxTextWidth,
          wrap: true,
          font: "myfont",
        }),
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
          answer.relationships,
          answer.artisticIntegrity
        );
      });

      answerButtons.push(button);
    });
  }

  function showExamQuestion(question) {
    examLabel.text = `Exams! Questions failed: ${examFailedScore}`;
    questionElement.text = question.question;
    question.answers.forEach((answer, index) => {
      let button = add([
        rect(BUTTON_WIDTH, BUTTON_HEIGHT, { radius: 2 }),
        pos(
          width() / 2,
          height() / 1.8 + index * (BUTTON_HEIGHT + BUTTON_SPACING)
        ),
        area(),
        scale(1),
        anchor("center"),
        outline(4),
      ]);

      const maxTextWidth = BUTTON_WIDTH - PADDING * 2;

      button.add([
        text(answer.text, {
          size: width() * 0.05,
          width: maxTextWidth,
          wrap: true,
          font: "myfont",
        }),
        anchor("center"),
        color(0, 0, 0),
      ]);

      button.value = answer.value;

      button.onClick(() => {
        if (isLocked) return;
        isLocked = true;
        selectExamAnswer(answer.value);
      });

      answerButtons.push(button);
    });
  }

  function selectAnswer(
    university,
    ego,
    money,
    relationships,
    artisticIntegrity
  ) {
    universityScore += university;
    egoScore += ego;
    moneyScore += money;
    relationshipsScore += relationships;

    currentQuestionIndex++;
    //console.log(artisticIntegrityScore);

    universityScoreLabel.text = `${universityScore}`;
    egoScoreLabel.text = `${egoScore}`;
    moneyScoreLabel.text = `${moneyScore}`;
    relationshipsScoreLabel.text = `${relationshipsScore}`;

    if (
      Math.abs(university) >= 20 ||
      Math.abs(ego) >= 20 ||
      Math.abs(money) >= 20 ||
      Math.abs(relationships) >= 20
    ) {
      riskyChoicesMade++;
      //console.log(riskyChoicesMade);

      if (riskyChoicesMade >= 4 && !unlockedRewards.riskTaker) {
        unlockedRewards.riskTaker = true;
        rewardText = add([
          text("Reward unlocked: Risk Taker", {
            width: width() - PADDING * 2, // Padding from both sides
            wrap: true,
            size: TEXT_SIZE,
            font: "myfont",
          }),
          //   pos(width() / 2, height() * 0.35),
          pos(questionElement.pos.x, questionElement.pos.y - 70),
          anchor("center"),
          color(255, 255, 255),
        ]);
      }
    }

    if (artisticIntegrity) {
      artisticIntegrityScore++;
      console.log(artisticIntegrityScore);
    }

    if (artisticIntegrityScore >= 4 && !unlockedRewards.artisticIntegrity) {
      unlockedRewards.artisticIntegrity = true;
      rewardText = add([
        text("Reward unlocked: Artistic Integrity", {
          width: width() - PADDING * 2, // Padding from both sides
          wrap: true,
          size: width() * 0.06,
          font: "myfont",
        }),
        //   pos(width() / 2, height() * 0.35),
        pos(questionElement.pos.x, questionElement.pos.y - 70),
        anchor("center"),
        color(255, 255, 255),
      ]);
    }

    if (
      shuffledQuestions.length > currentQuestionIndex &&
      0 < universityScore &&
      universityScore < 80 &&
      0 < egoScore &&
      egoScore < 80 &&
      0 < moneyScore &&
      moneyScore < 80 &&
      0 < relationshipsScore &&
      relationshipsScore < 80
    ) {
      wait(0.05, setNextQuestion);
    } else if (
      shuffledQuestions.length > currentQuestionIndex &&
      universityScore >= 80
    ) {
      transitionToScene("universityHigh");
    } else if (
      shuffledQuestions.length > currentQuestionIndex &&
      universityScore <= 0
    ) {
      go("universityLow");
    } else if (
      shuffledQuestions.length > currentQuestionIndex &&
      egoScore >= 80
    ) {
      transitionToScene("egoHigh");
    } else if (
      shuffledQuestions.length > currentQuestionIndex &&
      egoScore <= 0
    ) {
      transitionToScene("egoLow");
    } else if (
      shuffledQuestions.length > currentQuestionIndex &&
      moneyScore >= 80
    ) {
      transitionToScene("moneyHigh");
    } else if (
      shuffledQuestions.length > currentQuestionIndex &&
      moneyScore <= 0
    ) {
      transitionToScene("moneyLow");
    } else if (
      shuffledQuestions.length > currentQuestionIndex &&
      relationshipsScore >= 80
    ) {
      transitionToScene("relationshipsHigh");
    } else if (
      shuffledQuestions.length > currentQuestionIndex &&
      relationshipsScore <= 0
    ) {
      transitionToScene("relationshipsLow");
    } else {
      transitionToScene("win1");
      secondLevelUnlocked = true;
    }
  }

  function selectExamAnswer(value) {
    examQuestionIndex++;
    examcounter++;
    examFailedScore += value;
    examLabel.text = `Exams! Questions failed: ${examFailedScore}`;

    if (
      examQuestionIndex >= 15 &&
      examFailedScore == 0 &&
      !unlockedRewards.bigHead
    ) {
      unlockedRewards.bigHead = true;
      rewardText = add([
        text("Reward unlocked: Big Head", {
          width: width() - PADDING * 2, // Padding from both sides
          wrap: true,
          size: width() * 0.055,
          font: "myfont",
        }),
        pos(examLabel.pos.x, examLabel.pos.y - 50),
        anchor("center"),
        color(255, 255, 255),
      ]);
    }
    if (shuffledQuestions.length > examQuestionIndex && examFailedScore < 3) {
      wait(0.05, setNextQuestion);
    } else {
      transitionToScene("universityLow");
    }
  }

  function resetState() {
    answerButtons.forEach((button) => destroy(button));
    answerButtons = [];
  }

  function transitionToScene(targetScene) {
    if (rewardText) {
      wait(2, () => {
        go(targetScene);
      });
    } else {
      go(targetScene);
    }
  }
});

scene("start", () => {
  const title = add([
    text("Screenwriting Game", {
      width: width() - PADDING * 2,
      wrap: true,
      size: width() * 0.11,
      font: "myfont",
    }),
    pos(width() / 2, height() * 0.2), // Positioning relatively
    anchor("center"),
  ]);

  const startButton = add([
    rect(BUTTON_WIDTH, BUTTON_HEIGHT, { radius: 2 }),
    pos(width() / 2, height() / 4 + (BUTTON_HEIGHT + BUTTON_SPACING)),
    area(),
    scale(1),
    anchor("center"),
    outline(4),
  ]);

  const AchievementsButton = add([
    rect(BUTTON_WIDTH, BUTTON_HEIGHT, { radius: 2 }),
    pos(width() / 2, height() / 4 + 2 * (BUTTON_HEIGHT + BUTTON_SPACING)),
    area(),
    scale(1),
    anchor("center"),
    outline(4),
  ]);

  startButton.add([
    text("Start", { font: "myfont" }),
    anchor("center"),
    color(0, 0, 0),
  ]);
  AchievementsButton.add([
    text("Achievements", { font: "myfont" }),
    anchor("center"),
    color(0, 0, 0),
  ]);

  startButton.onClick(() => {
    go("levels");
  });

  AchievementsButton.onClick(() => {
    go("achievements");
  });
});

scene("levels", () => {
  const startButton1 = add([
    rect(BUTTON_WIDTH, BUTTON_HEIGHT, { radius: 2 }),
    pos(width() / 2, height() / 4 + (BUTTON_HEIGHT + BUTTON_SPACING)),
    area(),
    scale(1),
    anchor("center"),
    outline(4),
  ]);

  startButton1.add([
    text("Level 1", { font: "myfont" }),
    anchor("center"),
    color(0, 0, 0),
  ]);

  startButton1.onClick(() => {
    if (tutorialCompleted) {
      go("level1");
    } else {
      go("tutorial");
    }
  });

  if (secondLevelUnlocked) {
    const startButton2 = add([
      rect(BUTTON_WIDTH, BUTTON_HEIGHT, { radius: 2 }),
      pos(width() / 2, height() / 4 + 2 * (BUTTON_HEIGHT + BUTTON_SPACING)),
      area(),
      scale(1),
      anchor("center"),
      outline(4),
    ]);

    startButton2.add([
      text("Level 2", { font: "myfont" }),
      anchor("center"),
      color(0, 0, 0),
    ]);

    startButton2.onClick(() => {
      go("level2");
    });
  }
});

go("start");

scene("tutorial", () => {
  let answerButtons = [];
  let universityScore = 40;
  let egoScore = 40;
  let moneyScore = 40;
  let relationshipsScore = 40;
  // ??????

  const UniversityScorePicture = add([
    sprite("book"),
    scale(0.2),
    pos(getLabelPosition(0).x + 15, getLabelPosition(0).y),
    anchor("center"),
  ]);

  const universityScoreLabel = add([
    text(`${universityScore}`, { size: TEXT_SIZE }),

    pos(UniversityScorePicture.pos.x * 0.8, UniversityScorePicture.pos.y * 1.8),
  ]);

  const EgoScorePicture = add([
    sprite("ego"),
    scale(0.16),
    pos(getLabelPosition(1).x + 15, getLabelPosition(1).y - 4),
    anchor("center"),
  ]);

  const egoScoreLabel = add([
    text(`${egoScore}`, { size: TEXT_SIZE }),
    pos(EgoScorePicture.pos.x * 0.9, EgoScorePicture.pos.y * 2),
  ]);

  const MoneyScorePicture = add([
    sprite("money"),
    scale(0.2),
    pos(getLabelPosition(2).x + 10, getLabelPosition(2).y - 2),
    anchor("center"),
  ]);

  const moneyScoreLabel = add([
    text(`${moneyScore}`, { size: TEXT_SIZE }),
    pos(MoneyScorePicture.pos.x * 0.95, MoneyScorePicture.pos.y * 1.9),
  ]);

  const RelationshipsScorePicture = add([
    sprite("relationships"),
    scale(0.18),
    pos(getLabelPosition(3).x + 5, getLabelPosition(3).y - 2),
    anchor("center"),
  ]);

  const relationshipsScoreLabel = add([
    text(`${relationshipsScore}`, { size: TEXT_SIZE }),
    pos(
      RelationshipsScorePicture.pos.x * 0.95,
      RelationshipsScorePicture.pos.y * 1.9
    ),
  ]);

  const questionElement = add([
    text("Question", {
      width: width() - PADDING * 2, // Padding from both sides
      wrap: true,
      size: TEXT_SIZE,
      font: "myfont",
    }),
    pos(width() / 2, height() * 0.35), // Positioning relatively
    anchor("center"),
  ]);

  let arrow = add([
    sprite("arrow"),
    pos(questionElement.pos.x, questionElement.pos.y - 70),
    scale(0.1),
    anchor("center"),
    //rotate(180),
    opacity(0), // Initially hidden
  ]);

  let currentTutorialQuestionIndex = 0;
  setNextTutorialQuestion();

  function setNextTutorialQuestion() {
    loadNextQuestion();
  }

  function loadNextQuestion() {
    resetState();

    if (currentTutorialQuestionIndex < tutorialQuestions.length) {
      showQuestion(tutorialQuestions[currentTutorialQuestionIndex]);
    } else {
      // Tutorial completed, transition to main game
      tutorialCompleted = true;
      go("level1");
    }

    isLocked = false;
  }

  function showQuestion(question) {
    questionElement.text = question.question;
    if (question.highlightscores) {
      arrow.opacity = 1; // Show the arrow
    } else {
      arrow.opacity = 0; // Hide the arrow
    }

    question.answers.forEach((answer, index) => {
      let button = add([
        rect(BUTTON_WIDTH, BUTTON_HEIGHT, { radius: 2 }),
        pos(
          width() / 2,
          height() / 1.8 + index * (BUTTON_HEIGHT + BUTTON_SPACING)
        ),
        area(),
        scale(1),
        anchor("center"),
        outline(4),
      ]);

      const maxTextWidth = BUTTON_WIDTH - PADDING * 2;

      button.add([
        text(answer.text, {
          size: width() * 0.05,
          width: maxTextWidth,
          wrap: true,
          font: "myfont",
        }),
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

  function selectAnswer(university, ego, money, relationships) {
    universityScore += university;
    egoScore += ego;
    moneyScore += money;
    relationshipsScore += relationships;

    currentTutorialQuestionIndex++;

    universityScoreLabel.text = `${universityScore}`;
    egoScoreLabel.text = `${egoScore}`;
    moneyScoreLabel.text = `${moneyScore}`;
    relationshipsScoreLabel.text = `${relationshipsScore}`;

    if (currentTutorialQuestionIndex < tutorialQuestions.length) {
      wait(0.05, setNextTutorialQuestion);
    } else {
      // Tutorial completed, transition to main game
      tutorialCompleted = true;
      go("level1");
    }
  }

  function resetState() {
    answerButtons.forEach((button) => destroy(button));
    answerButtons = [];
    arrow.opacity = 0;
  }
});

scene("level2", () => {
  let answerButtons = [];
  let fameScore = 40;
  let egoScore = 40;
  let moneyScore = 40;
  let relationshipsScore = 40;
  let mediationFailedScore = 0;

  let currentQuestionIndex = 1;
  let mediationQuestionIndex = 1;
  let mediationcounter = 1;

  const fameScorePicture = add([
    sprite("star"),
    scale(0.2),
    pos(getLabelPosition(0).x + 15, getLabelPosition(0).y),
    anchor("center"),
  ]);

  const fameScoreLabel = add([
    text(`${fameScore}`, { size: TEXT_SIZE }),

    pos(fameScorePicture.pos.x * 0.8, fameScorePicture.pos.y * 1.8),
  ]);
  const EgoScorePicture = add([
    sprite("ego"),
    scale(0.16),
    pos(getLabelPosition(1).x + 15, getLabelPosition(1).y - 4),
    anchor("center"),
  ]);

  const egoScoreLabel = add([
    text(`${egoScore}`, { size: TEXT_SIZE }),
    pos(EgoScorePicture.pos.x * 0.9, EgoScorePicture.pos.y * 2),
  ]);

  const MoneyScorePicture = add([
    sprite("money"),
    scale(0.2),
    pos(getLabelPosition(2).x + 10, getLabelPosition(2).y - 2),
    anchor("center"),
  ]);

  const moneyScoreLabel = add([
    text(`${moneyScore}`, { size: TEXT_SIZE }),
    pos(MoneyScorePicture.pos.x * 0.95, MoneyScorePicture.pos.y * 1.9),
  ]);
  const RelationshipsScorePicture = add([
    sprite("relationships"),
    scale(0.18),
    pos(getLabelPosition(3).x + 5, getLabelPosition(3).y - 2),
    anchor("center"),
  ]);

  const relationshipsScoreLabel = add([
    text(`${relationshipsScore}`, { size: TEXT_SIZE }),
    pos(
      RelationshipsScorePicture.pos.x * 0.95,
      RelationshipsScorePicture.pos.y * 1.9
    ),
  ]);

  const questionElement = add([
    text("Question", {
      width: width() - PADDING * 2, // Padding from both sides
      wrap: true,
      size: TEXT_SIZE,
      font: "myfont",
    }),
    pos(width() / 2, height() * 0.35), // Positioning relatively
    anchor("center"),
  ]);

  const mediationLabel = add([
    text("", {
      width: width() - PADDING * 2, // Padding from both sides
      wrap: true,
      size: TEXT_SIZE,
      font: "myfont",
    }),
    pos(questionElement.pos.x, questionElement.pos.y - 60),
    anchor("center"),
    color(255, 255, 255),
  ]);

  let shuffledQuestions = questions2.sort(() => Math.random() - 0.5);

  let shuffledMediationQuestions = mediationQuestions.sort(
    () => Math.random() - 0.5
  );

  setNextQuestion();

  function setNextQuestion() {
    if (rewardText) {
      wait(2, () => {
        destroy(rewardText);
        rewardText = null;
        loadNextQuestion();
      });
    } else {
      loadNextQuestion();
    }
  }

  function loadNextQuestion() {
    resetState();

    if (currentQuestionIndex % 5 === 0 && examcounter <= 5) {
      // Show a special question here
      showExamQuestion(shuffledExamQuestions[examQuestionIndex]);
    } else {
      // Show a regular question
      examcounter = 1;

      showQuestion(shuffledQuestions[currentQuestionIndex]);
    }

    isLocked = false;
  }

  function setNextQuestion() {
    if (rewardText) {
      wait(2, () => {
        destroy(rewardText);
        rewardText = null;
        loadNextQuestion();
      });
    } else {
      loadNextQuestion();
    }
  }

  function loadNextQuestion() {
    resetState();

    if (currentQuestionIndex % 5 === 0 && mediationcounter <= 5) {
      // Show a special question here
      showMediationQuestion(shuffledMediationQuestions[mediationQuestionIndex]);
    } else {
      // Show a regular question
      mediationcounter = 1;

      showQuestion(shuffledQuestions[currentQuestionIndex]);
    }

    isLocked = false;
  }

  function showQuestion(question) {
    mediationLabel.text = "";
    questionElement.text = question.question;
    question.answers.forEach((answer, index) => {
      let button = add([
        rect(BUTTON_WIDTH, BUTTON_HEIGHT, { radius: 2 }),
        pos(
          width() / 2,
          height() / 1.8 + index * (BUTTON_HEIGHT + BUTTON_SPACING)
        ),
        area(),
        scale(1),
        anchor("center"),
        outline(4),
      ]);

      const maxTextWidth = BUTTON_WIDTH - PADDING * 2;

      button.add([
        text(answer.text, {
          size: width() * 0.05,
          width: maxTextWidth,
          wrap: true,
          font: "myfont",
        }),
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
          answer.relationships,
          answer.artisticIntegrity
        );
      });

      answerButtons.push(button);
    });
  }

  function showMediationQuestion(question) {
    mediationLabel.text = `Job interview! Questions failed: ${mediationFailedScore}`;
    questionElement.text = question.question;
    question.answers.forEach((answer, index) => {
      let button = add([
        rect(BUTTON_WIDTH, BUTTON_HEIGHT, { radius: 2 }),
        pos(
          width() / 2,
          height() / 1.8 + index * (BUTTON_HEIGHT + BUTTON_SPACING)
        ),
        area(),
        scale(1),
        anchor("center"),
        outline(4),
      ]);

      const maxTextWidth = BUTTON_WIDTH - PADDING * 2;

      button.add([
        text(answer.text, {
          size: width() * 0.05,
          width: maxTextWidth,
          wrap: true,
          font: "myfont",
        }),
        anchor("center"),
        color(0, 0, 0),
      ]);

      button.value = answer.value;

      button.onClick(() => {
        if (isLocked) return; // If locked, do not process the click

        isLocked = true; // Lock input processing once the button is clicked
        selectMediationAnswer(answer.value);
      });

      answerButtons.push(button);
    });
  }

  function selectAnswer(fame, ego, money, relationships, artisticIntegrity) {
    fameScore += fame;
    egoScore += ego;
    moneyScore += money;
    relationshipsScore += relationships;

    currentQuestionIndex++;

    fameScoreLabel.text = `${fameScore}`;
    egoScoreLabel.text = `${egoScore}`;
    moneyScoreLabel.text = `${moneyScore}`;
    relationshipsScoreLabel.text = `${relationshipsScore}`;

    if (
      Math.abs(fame) >= 20 ||
      Math.abs(ego) >= 20 ||
      Math.abs(money) >= 20 ||
      Math.abs(relationships) >= 20
    ) {
      riskyChoicesMade++;
      //console.log(riskyChoicesMade);
      if (riskyChoicesMade >= 4 && !unlockedRewards.riskTaker) {
        unlockedRewards.riskTaker = true;
        rewardText = add([
          text("Reward unlocked: Risk Taker", {
            width: width() - PADDING * 2, // Padding from both sides
            wrap: true,
            size: TEXT_SIZE,
            font: "myfont",
          }),
          //   pos(width() / 2, height() * 0.35),
          pos(questionElement.pos.x, questionElement.pos.y - 70),
          anchor("center"),
          color(255, 255, 255),
        ]);
      }
    }

    if (artisticIntegrity) {
      artisticIntegrityScore++;
      console.log(artisticIntegrityScore);
    }

    if (artisticIntegrityScore >= 4 && !unlockedRewards.artisticIntegrity) {
      unlockedRewards.artisticIntegrity = true;
      rewardText = add([
        text("Reward unlocked: Artistic Integrity", {
          width: width() - PADDING * 2, // Padding from both sides
          wrap: true,
          size: width() * 0.06,
          font: "myfont",
        }),
        //   pos(width() / 2, height() * 0.35),
        pos(questionElement.pos.x, questionElement.pos.y - 70),
        anchor("center"),
        color(255, 255, 255),
      ]);
    }

    if (
      shuffledQuestions.length > currentQuestionIndex &&
      0 < fameScore &&
      fameScore < 80 &&
      0 < egoScore &&
      egoScore < 80 &&
      0 < moneyScore &&
      moneyScore < 80 &&
      0 < relationshipsScore &&
      relationshipsScore < 80
    ) {
      wait(0.05, setNextQuestion);
    } else if (
      shuffledQuestions.length > currentQuestionIndex &&
      fameScore >= 80
    ) {
      transitionToScene("fameHigh");
    } else if (
      shuffledQuestions.length > currentQuestionIndex &&
      fameScore <= 0
    ) {
      transitionToScene("fameLow");
    } else if (
      shuffledQuestions.length > currentQuestionIndex &&
      egoScore >= 80
    ) {
      transitionToScene("egoHigh");
    } else if (
      shuffledQuestions.length > currentQuestionIndex &&
      egoScore <= 0
    ) {
      transitionToScene("egoLow");
    } else if (
      shuffledQuestions.length > currentQuestionIndex &&
      moneyScore >= 80
    ) {
      transitionToScene("moneyHigh");
    } else if (
      shuffledQuestions.length > currentQuestionIndex &&
      moneyScore <= 0
    ) {
      transitionToScene("moneyLow");
    } else if (
      shuffledQuestions.length > currentQuestionIndex &&
      relationshipsScore >= 80
    ) {
      transitionToScene("relationshipsHigh");
    } else if (
      shuffledQuestions.length > currentQuestionIndex &&
      relationshipsScore <= 0
    ) {
      transitionToScene("relationshipsLow");
    } else {
      transitionToScene("win2");
    }
  }

  function selectMediationAnswer(value) {
    mediationQuestionIndex++;
    mediationcounter++;
    mediationFailedScore += value;
    mediationLabel.text = `Job interview! Questions failed: ${mediationFailedScore}`;

    if (
      mediationQuestionIndex >= 15 &&
      mediationFailedScore == 0 &&
      !unlockedRewards.bigHead
    ) {
      unlockedRewards.bigHead = true;
      rewardText = add([
        text("Reward unlocked: Big Head", {
          width: width() - PADDING * 2, // Padding from both sides
          wrap: true,
          size: width() * 0.055,
          font: "myfont",
        }),
        pos(mediationLabel.pos.x, mediationLabel.pos.y - 50),
        anchor("center"),
        color(255, 255, 255),
      ]);
    }
    if (
      shuffledQuestions.length > mediationQuestionIndex &&
      mediationFailedScore < 3
    ) {
      wait(0.05, setNextQuestion);
    } else {
      go("failedInterview");
    }
  }

  function resetState() {
    answerButtons.forEach((button) => destroy(button));
    answerButtons = [];
  }

  function transitionToScene(targetScene) {
    if (rewardText) {
      wait(2, () => {
        go(targetScene);
      });
    } else {
      go(targetScene);
    }
  }
});

scene("failedInterview", () => {
  let endingText = null;
  if (!unlockedEndings.failedInterview) {
    endingsScore++;
    unlockedEndings.failedInterview = true;
    endingText = add([
      text("New ending unlocked!", {
        width: width() - PADDING * 2, // Padding from both sides
        wrap: true,
        size: width() * 0.06,
        font: "myfont",
      }),
      pos(width() / 2, height() * 0.2),
      anchor("center"),
    ]);
  }

  add([
    text(
      "You've failed another job interview. It's becoming clear: maybe it's time to hit the books and truly learn about the industry you're diving into?",
      {
        width: width() - PADDING * 2, // Padding from both sides
        wrap: true,
        size: TEXT_SIZE,
        font: "myfont",
      }
    ),
    pos(endingText.pos.x, endingText.pos.y + 100),
    anchor("center"),
  ]);

  onKeyPress("space", () => go("start"));
  onClick(() => go("start"));
});

scene("fameHigh", () => {
  let endingText = null;
  if (!unlockedEndings.fameHigh) {
    endingsScore++;
    unlockedEndings.fameHigh = true;
    endingText = add([
      text("New ending unlocked!", {
        width: width() - PADDING * 2, // Padding from both sides
        wrap: true,
        size: width() * 0.06,
        font: "myfont",
      }),
      pos(width() / 2, height() * 0.2),
      anchor("center"),
    ]);
  }
  add([
    text(
      "Congrats, you're now a star! Paparazzi follow you everywhere, your Oscar speech is ready, but you're too busy attending VIP parties to actually write a script that wins one.",
      {
        width: width() - PADDING * 2, // Padding from both sides
        wrap: true,
        size: TEXT_SIZE,
        font: "myfont",
      }
    ),
    pos(endingText.pos.x, endingText.pos.y + 100),
    anchor("center"),
  ]);

  onKeyPress("space", () => go("start"));
  onClick(() => go("start"));
});

scene("egoHigh", () => {
  let endingText = null;
  if (!unlockedEndings.egoHigh) {
    endingsScore++;
    unlockedEndings.egoHigh = true;
    endingText = add([
      text("New ending unlocked!", {
        width: width() - PADDING * 2, // Padding from both sides
        wrap: true,
        size: width() * 0.06,
        font: "myfont",
      }),
      pos(width() / 2, height() * 0.2),
      anchor("center"),
    ]);
  }
  add([
    text(
      "You lose all your friends and connections, persuaded that your scripts are underrated. You're a genius, but only in your mind. You end up making one-person shows that nobody buys tickets for.",
      {
        width: width() - PADDING * 2, // Padding from both sides
        wrap: true,
        size: TEXT_SIZE,
        font: "myfont",
      }
    ),
    pos(endingText.pos.x, endingText.pos.y + 100),
    anchor("center"),
  ]);

  onKeyPress("space", () => go("start"));
  onClick(() => go("start"));
});

scene("moneyHigh", () => {
  let endingText = null;
  if (!unlockedEndings.moneyHigh) {
    endingsScore++;
    unlockedEndings.moneyHigh = true;
    endingText = add([
      text("New ending unlocked!", {
        width: width() - PADDING * 2, // Padding from both sides
        wrap: true,
        size: width() * 0.06,
        font: "myfont",
      }),
      pos(width() / 2, height() * 0.2),
      anchor("center"),
    ]);
  }
  add([
    text(
      "You're lured by the glitter of money and bid farewell to your artistic dreams. You become a producer, but word on the street is that your bankroll is more mob-connected than your movie plots.",
      {
        width: width() - PADDING * 2, // Padding from both sides
        wrap: true,
        size: TEXT_SIZE,
        font: "myfont",
      }
    ),
    pos(endingText.pos.x, endingText.pos.y + 100),
    anchor("center"),
  ]);

  onKeyPress("space", () => go("start"));
  onClick(() => go("start"));
});

scene("relationshipsHigh", () => {
  let endingText = null;
  if (!unlockedEndings.relationshipsHigh) {
    endingsScore++;
    unlockedEndings.relationshipsHigh = true;
    endingText = add([
      text("New ending unlocked!", {
        width: width() - PADDING * 2, // Padding from both sides
        wrap: true,
        size: width() * 0.06,
        font: "myfont",
      }),
      pos(width() / 2, height() * 0.2),
      anchor("center"),
    ]);
  }
  add([
    text(
      "Your desperate bid to please everyone turns you into a doormat. You end up writing tweets, desperately seeking likes and fleeting fame.",
      {
        width: width() - PADDING * 2, // Padding from both sides
        wrap: true,
        size: TEXT_SIZE,
        font: "myfont",
      }
    ),
    pos(endingText.pos.x, endingText.pos.y + 100),
    anchor("center"),
  ]);

  onKeyPress("space", () => go("start"));
  onClick(() => go("start"));
});

scene("fameLow", () => {
  let endingText = null;
  if (!unlockedEndings.fameLow) {
    endingsScore++;
    unlockedEndings.fameLow = true;
    endingText = add([
      text("New ending unlocked!", {
        width: width() - PADDING * 2, // Padding from both sides
        wrap: true,
        size: width() * 0.06,
        font: "myfont",
      }),
      pos(width() / 2, height() * 0.2),
      anchor("center"),
    ]);
  }
  add([
    text(
      "You perfectly proved your point that your movies are 'for art, not audiences': the only person who attended your big movie premiere was your mum - only to ask when you are getting a real job.",
      {
        width: width() - PADDING * 2, // Padding from both sides
        wrap: true,
        size: TEXT_SIZE,
        font: "myfont",
      }
    ),
    pos(endingText.pos.x, endingText.pos.y + 100),
    anchor("center"),
  ]);

  onKeyPress("space", () => go("start"));
  onClick(() => go("start"));
});

scene("egoLow", () => {
  let endingText = null;
  if (!unlockedEndings.egoLow) {
    endingsScore++;
    unlockedEndings.egoLow = true;
    endingText = add([
      text("New ending unlocked!", {
        width: width() - PADDING * 2, // Padding from both sides
        wrap: true,
        size: width() * 0.06,
        font: "myfont",
      }),
      pos(width() / 2, height() * 0.2),
      anchor("center"),
    ]);
  }
  add([
    text(
      "You don't know how to defend your point. Actually, you don't even know what your point is. You surrender to your parents' wishes and head off to law school.",
      {
        width: width() - PADDING * 2, // Padding from both sides
        wrap: true,
        size: TEXT_SIZE,
        font: "myfont",
      }
    ),
    pos(endingText.pos.x, endingText.pos.y + 100),
    anchor("center"),
  ]);

  onKeyPress("space", () => go("start"));
  onClick(() => go("start"));
});

scene("moneyLow", () => {
  let endingText = null;
  if (!unlockedEndings.moneyLow) {
    endingsScore++;
    unlockedEndings.moneyLow = true;
    endingText = add([
      text("New ending unlocked!", {
        width: width() - PADDING * 2, // Padding from both sides
        wrap: true,
        size: width() * 0.06,
        font: "myfont",
      }),
      pos(width() / 2, height() * 0.2),
      anchor("center"),
    ]);
  }
  add([
    text(
      "You're so broke that you resort to stealing food. You get caught and end up in jail. On the bright side you'll have some stories to tell when you get out.",
      {
        width: width() - PADDING * 2, // Padding from both sides
        wrap: true,
        size: TEXT_SIZE,
        font: "myfont",
      }
    ),
    pos(endingText.pos.x, endingText.pos.y + 100),
    anchor("center"),
  ]);

  onKeyPress("space", () => go("start"));
  onClick(() => go("start"));
});

scene("relationshipsLow", () => {
  let endingText = null;
  if (!unlockedEndings.relationshipsLow) {
    endingsScore++;
    unlockedEndings.relationshipsLow = true;
    endingText = add([
      text("New ending unlocked!", {
        width: width() - PADDING * 2, // Padding from both sides
        wrap: true,
        size: width() * 0.06,
        font: "myfont",
      }),
      pos(width() / 2, height() * 0.2),
      anchor("center"),
    ]);
  }
  add([
    text(
      "People are afraid to deal with you. You end up alone, writing scripts that nobody will ever read and go crazy talking to your characters. At least they listen to you.",
      {
        width: width() - PADDING * 2, // Padding from both sides
        wrap: true,
        size: TEXT_SIZE,
        font: "myfont",
      }
    ),
    pos(endingText.pos.x, endingText.pos.y + 100),
    anchor("center"),
  ]);

  onKeyPress("space", () => go("start"));
  onClick(() => go("start"));
});

scene("universityLow", () => {
  let endingText = null;
  if (!unlockedEndings.universityLow) {
    endingsScore++;
    unlockedEndings.universityLow = true;
    endingText = add([
      text("New ending unlocked!", {
        width: width() - PADDING * 2, // Padding from both sides
        wrap: true,
        size: width() * 0.06,
        font: "myfont",
      }),
      pos(width() / 2, height() * 0.2),
      anchor("center"),
    ]);
  }
  add([
    text(
      "You drop out of university and become a bartender. You're now a master of mixing drinks and stories, and the local drunkards can't get enough of both.",
      {
        width: width() - PADDING * 2, // Padding from both sides
        wrap: true,
        size: TEXT_SIZE,
        font: "myfont",
      }
    ),
    pos(endingText.pos.x, endingText.pos.y + 100),
    anchor("center"),
  ]);

  onKeyPress("space", () => go("start"));
  onClick(() => go("start"));
});

scene("universityHigh", () => {
  let endingText = null;
  if (!unlockedEndings.universityHigh) {
    endingsScore++;
    unlockedEndings.universityHigh = true;
    endingText = add([
      text("New ending unlocked!", {
        width: width() - PADDING * 2, // Padding from both sides
        wrap: true,
        size: width() * 0.06,
        font: "myfont",
      }),
      pos(width() / 2, height() * 0.2),
      anchor("center"),
    ]);
  }
  add([
    text(
      "You pursue an academic career and eventually become a professor. You've written a book about screenwriting but have never made any movie. You feel like a fraud.",
      {
        width: width() - PADDING * 2, // Padding from both sides
        wrap: true,
        size: TEXT_SIZE,
        font: "myfont",
      }
    ),
    pos(endingText.pos.x, endingText.pos.y + 100),
    anchor("center"),
  ]);

  onKeyPress("space", () => go("start"));
  onClick(() => go("start"));
});

scene("win1", () => {
  let endingText = null;
  if (!unlockedEndings.win1) {
    endingsScore++;
    unlockedEndings.win1 = true;
    endingText = add([
      text("New ending unlocked!", {
        width: width() - PADDING * 2, // Padding from both sides
        wrap: true,
        size: width() * 0.06,
        font: "myfont",
      }),
      pos(width() / 2, height() * 0.2),
      anchor("center"),
    ]);
  }
  add([
    text(
      "You successfully graduate from university, having written some great shorts and forged valuable connections. But beware, this is only Act One of your life journey.",
      {
        width: width() - PADDING * 2, // Padding from both sides
        wrap: true,
        size: TEXT_SIZE,
        font: "myfont",
      }
    ),
    pos(endingText.pos.x, endingText.pos.y + 100),
    anchor("center"),
  ]);

  const nextLevelButton = add([
    rect(BUTTON_WIDTH, BUTTON_HEIGHT, { radius: 2 }),
    pos(width() / 2, 450),
    area(),
    scale(1),
    anchor("center"),
    outline(4),
  ]);

  nextLevelButton.add([
    text("Continue", { font: "myfont" }),
    anchor("center"),
    color(0, 0, 0),
  ]);

  nextLevelButton.onClick(() => {
    go("level2");
  });
});

scene("win2", () => {
  let endingText = null;
  if (!unlockedEndings.win2) {
    endingsScore++;
    unlockedEndings.win2 = true;
    endingText = add([
      text("New ending unlocked!", {
        width: width() - PADDING * 2, // Padding from both sides
        wrap: true,
        size: width() * 0.06,
        font: "myfont",
      }),
      pos(width() / 2, height() * 0.2),
      anchor("center"),
    ]);
  }
  add([
    text(
      "Great job! Your scripts are starting to turn heads, and your name is beginning to echo in industry circles. Bigger challenges and grander opportunities are just around the corner, but can you handle them?",
      {
        width: width() - PADDING * 2, // Padding from both sides
        wrap: true,
        size: TEXT_SIZE,
        font: "myfont",
      }
    ),
    pos(endingText.pos.x, endingText.pos.y + 100),
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

  nextLevelButton.add([
    text("Main page", { font: "myfont" }),
    anchor("center"),
    color(0, 0, 0),
  ]);

  nextLevelButton.onClick(() => {
    go("start");
  });
});

scene("achievements", () => {
  const endingsButton = add([
    rect(BUTTON_WIDTH, BUTTON_HEIGHT, { radius: 2 }),
    pos(width() / 2, height() / 4 + (BUTTON_HEIGHT + BUTTON_SPACING)),
    area(),
    scale(1),
    anchor("center"),
    outline(4),
  ]);

  endingsButton.add([
    text("Endings", { font: "myfont" }),
    anchor("center"),
    color(0, 0, 0),
  ]);

  const rewardsButton = add([
    rect(BUTTON_WIDTH, BUTTON_HEIGHT, { radius: 2 }),
    pos(width() / 2, height() / 4 + 2 * (BUTTON_HEIGHT + BUTTON_SPACING)),
    area(),
    scale(1),
    anchor("center"),
    outline(4),
  ]);

  rewardsButton.add([
    text("Rewards", { font: "myfont" }),
    anchor("center"),
    color(0, 0, 0),
  ]);

  endingsButton.onClick(() => {
    go("endings");
  });

  rewardsButton.onClick(() => {
    go("rewards");
  });
});

scene("endings", () => {
  const endingDisplayText = {
    universityHigh: "Professor of Screenwriting",
    universityLow: "Creative bartender",
    fameHigh: "Red Carpet Regular",
    fameLow: "Indie Artist",
    egoHigh: "Crazy Genius",
    egoLow: "Lost soul",
    moneyHigh: "Blockbuster Mogul",
    moneyLow: "Pennyless Poet",
    relationshipsHigh: "People Pleaser",
    relationshipsLow: "Lone Wolf",
    win1: "Cinema School Star",
    win2: "Young Aspiring Author",
    failedInterview: "Failed Interview",
  };

  const heading = add([
    text(`Unlocked Endings: ${endingsScore}/13`, {
      wrap: true,
      size: width() * 0.06,
      font: "myfont",
    }),
    pos(width() / 2, height() * 0.15),
    anchor("center"),
  ]);

  let yPosition = heading.pos.y + 50;

  Object.keys(unlockedEndings).forEach((endingKey) => {
    if (unlockedEndings[endingKey]) {
      yPosition += 30;
      const displayText = endingDisplayText[endingKey];
      add([
        text(displayText, { size: TEXT_SIZE }),
        pos(width() / 2, yPosition),
        anchor("center"),
      ]);
    }
  });

  onKeyPress("space", () => go("start"));
  onClick(() => go("start"));
});

scene("rewards", () => {
  const rewardDisplayText = {
    riskTaker: "Risk Taker",
    bigHead: "Big Head",
    artisticIntegrity: "Artistic Integrity",
  };

  const heading = add([
    text(`Unlocked Rewards: `, {
      wrap: true,
      size: width() * 0.06,
      font: "myfont",
    }),
    pos(width() / 2, height() * 0.15),
    anchor("center"),
  ]);

  let yPosition = heading.pos.y + 50;

  Object.keys(unlockedRewards).forEach((rewardKey) => {
    if (unlockedRewards[rewardKey]) {
      yPosition += 50;
      const displayText = rewardDisplayText[rewardKey];
      add([
        text(displayText, { size: TEXT_SIZE }),
        pos(width() / 2, yPosition),
        anchor("center"),
      ]);
    }
  });

  onKeyPress("space", () => go("start"));
  onClick(() => go("start"));
});
