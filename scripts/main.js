import questions from "/scripts/questions.js";
import questions2 from "/scripts/questions2.js";
import examQuestions from "/scripts/examQuestions.js";
import mediationQuestions from "/scripts/mediationquestions.js";
import tutorialQuestions from "/scripts/tutorialQuestions.js";

let isLocked = false;
let tutorialCompleted = false;

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

kaboom({
  background: [243, 223, 193],
  width: 1200,
  height: 800,
});

loadSprite("arrow", "/sprites/arrow.png");

let rewardText = null;

scene("start", () => {
  const startButton1 = add([
    rect(240, 80, { radius: 8 }),
    pos(width() / 2, 150),
    area(),
    scale(1),
    anchor("center"),
    outline(4),
  ]);

  const startButton2 = add([
    rect(240, 80, { radius: 8 }),
    pos(width() / 2, 250),
    area(),
    scale(1),
    anchor("center"),
    outline(4),
  ]);

  const AchievementsButton = add([
    rect(240, 80, { radius: 8 }),
    pos(width() / 2, 350),
    area(),
    scale(1),
    anchor("center"),
    outline(4),
  ]);

  startButton1.add([text("Level 1"), anchor("center"), color(0, 0, 0)]);
  startButton2.add([text("Level 2"), anchor("center"), color(0, 0, 0)]);
  AchievementsButton.add([
    text("Achievements"),
    anchor("center"),
    color(0, 0, 0),
  ]);

  startButton1.onClick(() => {
    if (tutorialCompleted) {
      go("level1");
    } else {  
    go("tutorial")
  }});

  startButton2.onClick(() => {
    go("level2");
  });

  AchievementsButton.onClick(() => {
    go("achievements");
  });
});

go("start");

scene("tutorial", () => {
  let answerButtons = [];
  let universityScore = 40;
  let egoScore = 40;
  let moneyScore = 40;
  let relationshipsScore = 40;
  let arrow = add([
    sprite("arrow"),
    pos(400, 70),
    scale(0.1),
    anchor("center"),
    rotate(180),
    opacity(0), // Initially hidden
  ]);

  let universityFrame = add([
    rect(350, 130, { radius: 8 }),
    pos(10, 15),
    color(255, 255, 255),
    opacity(0), // Initially hidden
  ]);


  const universityScoreLabel = add([
    text(`University: ${universityScore}`),
    pos(24, 20),
    color(rgb(26, 28, 26)),
  ]);

  const egoScoreLabel = add([
    text(`Ego: ${egoScore}`),
    pos(24, 50),
    color(rgb(26, 28, 26)),
  ]);

  const moneyScoreLabel = add([
    text(`Money: ${moneyScore}`),
    pos(24, 80),
    color(rgb(26, 28, 26)),
  ]);
  const relationshipsScoreLabel = add([
    text(`Relationships: ${relationshipsScore}`),
    pos(24, 110),
    color(rgb(26, 28, 26)),
  ]);

  const questionElement = add([
    text("Question", {
      width: width() - 500,
      wrap: true,
      size: 30,
    }),
    pos(width() / 2, 300),
    anchor("center"),
    color(rgb(26, 28, 26)),
  ]);

  let currentTutorialQuestionIndex = 0
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
      universityFrame.opacity = 1;
    } else {
      arrow.opacity = 0; // Hide the arrow
      universityFrame.opacity = 0;
    }

         
      
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
          answer.relationships,
        );
      });

      answerButtons.push(button);
    });
  }


  function selectAnswer(
    university,
    ego,
    money,
    relationships,
  ) {
    universityScore += university;
    egoScore += ego;
    moneyScore += money;
    relationshipsScore += relationships;

    currentTutorialQuestionIndex++;
  

    universityScoreLabel.text = `University: ${universityScore}`;
    egoScoreLabel.text = `Ego: ${egoScore}`;
    moneyScoreLabel.text = `Money: ${moneyScore}`;
    relationshipsScoreLabel.text = `Relationships: ${relationshipsScore}`;

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
    arrow.opacity = 0
    universityFrame.opacity = 0
  }

});

scene("level1", () => {
  let answerButtons = [];
  let universityScore = 40;
  let egoScore = 40;
  let moneyScore = 40;
  let relationshipsScore = 40;
  riskyChoicesMade = 0;
  artisticIntegrityScore = 0;
  let examFailedScore = 0;

  const examLabel = add([text(""), pos(width() / 2, 200), anchor("center")]);

  let currentQuestionIndex = 1;
  let examQuestionIndex = 1;
  let examcounter = 1;

  // const UniversityScorePicture = add([
  //   sprite("test"),
  //   pos(50, 50),
  //   scale(0.1),
  //   anchor("center"),
  // ]);
  const universityScoreLabel = add([
    text(`University: ${universityScore}`),
    pos(24, 20),
    color(rgb(26, 28, 26)),
  ]);

  const egoScoreLabel = add([
    text(`Ego: ${egoScore}`),
    pos(24, 50),
    color(rgb(26, 28, 26)),
  ]);
  // const MoneyScorePicture = add([
  //   sprite("dollar"),
  //   pos(350, 50),
  //   scale(0.1),
  //   anchor("center"),
  // ]);
  const moneyScoreLabel = add([
    text(`Money: ${moneyScore}`),
    pos(24, 80),
    color(rgb(26, 28, 26)),
  ]);
  const relationshipsScoreLabel = add([
    text(`Relationships: ${relationshipsScore}`),
    pos(24, 110),
    color(rgb(26, 28, 26)),
  ]);

  const questionElement = add([
    text("Question", {
      width: width() - 500,
      wrap: true,
      size: 30,
    }),
    pos(width() / 2, 300),
    anchor("center"),
    color(rgb(26, 28, 26)),
  ]);

  let shuffledQuestions = questions.sort(() => Math.random() - 0.5);

  let shuffledExamQuestions = examQuestions.sort(() => Math.random() - 0.5);


  
  setNextQuestion();


  function setNextQuestion() {
    if (rewardText) {
      wait(2, () => {
        destroy(rewardText);
        //rewardText = null;
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
          answer.relationships,
          answer.artisticIntegrity
        );
      });

      answerButtons.push(button);
    });
  }

  function showExamQuestion(question) {
    examLabel.text = `Exam time! Questions failed: ${examFailedScore}`;
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

    universityScoreLabel.text = `University: ${universityScore}`;
    egoScoreLabel.text = `Ego: ${egoScore}`;
    moneyScoreLabel.text = `Money: ${moneyScore}`;
    relationshipsScoreLabel.text = `Relationships: ${relationshipsScore}`;

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
            width: width() - 500,
            size: 30,
          }),
          pos(width() / 2, 150),
          anchor("center"),
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
          width: width() - 500,
          size: 30,
        }),
        pos(width() / 2, 150),
        anchor("center"),
      ]);
    }


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
      transitionToScene("universityHigh");
    } else if (
      shuffledQuestions.length > currentQuestionIndex &&
      universityScore <= 0
    ) {
      go("universityLow");
    } else if (
      shuffledQuestions.length > currentQuestionIndex &&
      egoScore >= 90
    ) {
      transitionToScene("egoHigh");
    } else if (
      shuffledQuestions.length > currentQuestionIndex &&
      egoScore <= 0
    ) {
      transitionToScene("egoLow");
    } else if (
      shuffledQuestions.length > currentQuestionIndex &&
      moneyScore >= 90
    ) {
      transitionToScene("moneyHigh");
    } else if (
      shuffledQuestions.length > currentQuestionIndex &&
      moneyScore <= 0
    ) {
      transitionToScene("moneyLow");
    } else if (
      shuffledQuestions.length > currentQuestionIndex &&
      relationshipsScore >= 90
    ) {
      transitionToScene("relationshipsHigh");
    } else if (
      shuffledQuestions.length > currentQuestionIndex &&
      relationshipsScore <= 0
    ) {
      transitionToScene("relationshipsLow");
    } else {
      transitionToScene("win1");
    }
  }

  function selectExamAnswer(value) {
    examQuestionIndex++;
    examcounter++;
    examFailedScore += value;
    examLabel.text = `Exam time! Questions failed: ${examFailedScore}`;
    //console.log(examQuestionIndex);

    if (
      examQuestionIndex >= 15 &&
      examFailedScore == 0 &&
      !unlockedRewards.bigHead
    ) {
      unlockedRewards.bigHead = true;
      rewardText = add([
        text("Reward unlocked: Big Head", {
          width: width() - 500,
          size: 30,
        }),
        pos(width() / 2, 150),
        anchor("center"),
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

scene("level2", () => {
  let answerButtons = [];
  let fameScore = 40;
  let egoScore = 40;
  let moneyScore = 40;
  let relationshipsScore = 40;
  //console.log(riskyChoicesMade);

  let mediationFailedScore = 0;

  const mediationLabel = add([
    text(""),
    pos(width() / 2, 200),
    anchor("center"),
  ]);

  let currentQuestionIndex = 1;
  let mediationQuestionIndex = 1;
  let mediationcounter = 1;

  const fameScoreLabel = add([
    text(`Fame: ${fameScore}`),
    pos(24, 20),
    color(rgb(26, 28, 26)),
  ]);
  const egoScoreLabel = add([
    text(`Ego: ${egoScore}`),
    pos(24, 50),
    color(rgb(26, 28, 26)),
  ]);
  const moneyScoreLabel = add([
    text(`Money: ${moneyScore}`),
    pos(24, 80),
    color(rgb(26, 28, 26)),
  ]);
  const relationshipsScoreLabel = add([
    text(`Relationships: ${relationshipsScore}`),
    pos(24, 110),
    color(rgb(26, 28, 26)),
  ]);

  const questionElement = add([
    text("Question", {
      width: width() - 500,
      wrap: true,
      size: 30,
    }),
    pos(width() / 2, 300),
    anchor("center"),
    color(rgb(26, 28, 26)),
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

    fameScoreLabel.text = `Fame: ${fameScore}`;
    egoScoreLabel.text = `Ego: ${egoScore}`;
    moneyScoreLabel.text = `Money: ${moneyScore}`;
    relationshipsScoreLabel.text = `Relationships: ${relationshipsScore}`;

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
            width: width() - 500,
            size: 30,
          }),
          pos(width() / 2, 150),
          anchor("center"),
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
          width: width() - 500,
          size: 30,
        }),
        pos(width() / 2, 150),
        anchor("center"),
      ]);
    }

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
      transitionToScene("fameHigh");
    } else if (
      shuffledQuestions.length > currentQuestionIndex &&
      fameScore <= 0
    ) {
      transitionToScene("fameLow");
    } else if (
      shuffledQuestions.length > currentQuestionIndex &&
      egoScore >= 90
    ) {
      transitionToScene("egoHigh");
    } else if (
      shuffledQuestions.length > currentQuestionIndex &&
      egoScore <= 0
    ) {
      transitionToScene("egoLow");
    } else if (
      shuffledQuestions.length > currentQuestionIndex &&
      moneyScore >= 90
    ) {
      transitionToScene("moneyHigh");
    } else if (
      shuffledQuestions.length > currentQuestionIndex &&
      moneyScore <= 0
    ) {
      transitionToScene("moneyLow");
    } else if (
      shuffledQuestions.length > currentQuestionIndex &&
      relationshipsScore >= 90
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
    //console.log(mediationQuestionIndex);

    if (
      mediationQuestionIndex >= 15 &&
      mediationFailedScore == 0 &&
      !unlockedRewards.bigHead
    ) {
      unlockedRewards.bigHead = true;
      rewardText = add([
        text("Reward unlocked: Big Head", {
          width: width() - 500,
          size: 30,
        }),
        pos(width() / 2, 150),
        anchor("center"),
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
  if (!unlockedEndings.failedInterview) {
    endingsScore++;
    unlockedEndings.failedInterview = true;
    add([
      text("New ending unlocked!", {
        width: width() - 500,
        size: 30,
      }),
      pos(width() / 2, 100),
      anchor("center"),
    ]);
  }

  add([
    text(
      "You've failed another job interview. It's becoming clear: maybe it's time to hit the books and truly learn about the industry you're diving into?",
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
  onClick(() => go("start"));
});

scene("fameHigh", () => {
  if (!unlockedEndings.fameHigh) {
    endingsScore++;
    unlockedEndings.fameHigh = true;
    add([
      text("New ending unlocked!", {
        width: width() - 500,
        size: 30,
      }),
      pos(width() / 2, 100),
      anchor("center"),
    ]);
  }
  add([
    text(
      "Congrats, you're now a star! Paparazzi follow you everywhere, your Oscar speech is ready, but you're too busy attending VIP parties to actually write a script that wins one.",
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
  onClick(() => go("start"));
});

scene("egoHigh", () => {
  if (!unlockedEndings.egoHigh) {
    endingsScore++;
    unlockedEndings.egoHigh = true;
    add([
      text("New ending unlocked!", {
        width: width() - 500,
        size: 30,
      }),
      pos(width() / 2, 100),
      anchor("center"),
    ]);
  }
  add([
    text(
      "You lose all your friends and connections, persuaded that your scripts are underrated. You're a genius, but only in your mind. You end up making one-person shows that nobody buys tickets for.",
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
  onClick(() => go("start"));
});

scene("moneyHigh", () => {
  if (!unlockedEndings.moneyHigh) {
    endingsScore++;
    unlockedEndings.moneyHigh = true;
    add([
      text("New ending unlocked!", {
        width: width() - 500,
        size: 30,
      }),
      pos(width() / 2, 100),
      anchor("center"),
    ]);
  }
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
  onClick(() => go("start"));
});

scene("relationshipsHigh", () => {
  if (!unlockedEndings.relationshipsHigh) {
    endingsScore++;
    unlockedEndings.relationshipsHigh = true;
    add([
      text("New ending unlocked!", {
        width: width() - 500,
        size: 30,
      }),
      pos(width() / 2, 100),
      anchor("center"),
    ]);
  }
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
  onClick(() => go("start"));
});

scene("fameLow", () => {
  if (!unlockedEndings.fameLow) {
    endingsScore++;
    unlockedEndings.fameLow = true;
    add([
      text("New ending unlocked!", {
        width: width() - 500,
        size: 30,
      }),
      pos(width() / 2, 100),
      anchor("center"),
    ]);
  }
  add([
    text(
      "You perfectly proved your point that your movies are 'for art, not audiences': the only person who attended your big movie premiere was your mum - only to ask when you are getting a real job.",
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
  onClick(() => go("start"));
});

scene("egoLow", () => {
  if (!unlockedEndings.egoLow) {
    endingsScore++;
    unlockedEndings.egoLow = true;
    add([
      text("New ending unlocked!", {
        width: width() - 500,
        size: 30,
      }),
      pos(width() / 2, 100),
      anchor("center"),
    ]);
  }
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
  onClick(() => go("start"));
});

scene("moneyLow", () => {
  if (!unlockedEndings.moneyLow) {
    endingsScore++;
    unlockedEndings.moneyLow = true;
    add([
      text("New ending unlocked!", {
        width: width() - 500,
        size: 30,
      }),
      pos(width() / 2, 100),
      anchor("center"),
    ]);
  }
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
  onClick(() => go("start"));
});

scene("relationshipsLow", () => {
  if (!unlockedEndings.relationshipsLow) {
    endingsScore++;
    unlockedEndings.relationshipsLow = true;
    add([
      text("New ending unlocked!", {
        width: width() - 500,
        size: 30,
      }),
      pos(width() / 2, 100),
      anchor("center"),
    ]);
  }
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
  onClick(() => go("start"));
});

scene("universityLow", () => {
  if (!unlockedEndings.universityLow) {
    endingsScore++;
    unlockedEndings.universityLow = true;
    add([
      text("New ending unlocked!", {
        width: width() - 500,
        size: 30,
      }),
      pos(width() / 2, 100),
      anchor("center"),
    ]);
  }
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
  onClick(() => go("start"));
});

scene("universityHigh", () => {
  if (!unlockedEndings.universityHigh) {
    endingsScore++;
    unlockedEndings.universityHigh = true;
    add([
      text("New ending unlocked!", {
        width: width() - 500,
        size: 30,
      }),
      pos(width() / 2, 100),
      anchor("center"),
    ]);
  }
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
  onClick(() => go("start"));
});

scene("win1", () => {
  if (!unlockedEndings.win1) {
    endingsScore++;
    unlockedEndings.win1 = true;
    add([
      text("New ending unlocked!", {
        width: width() - 500,
        size: 30,
      }),
      pos(width() / 2, 100),
      anchor("center"),
    ]);
  }
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

scene("win2", () => {
  if (!unlockedEndings.win2) {
    endingsScore++;
    unlockedEndings.win2 = true;
    add([
      text("New ending unlocked!", {
        width: width() - 500,
        size: 30,
      }),
      pos(width() / 2, 100),
      anchor("center"),
    ]);
  }
  add([
    text(
      "Great job! Your scripts are starting to turn heads, and your name is beginning to echo in industry circles. Bigger challenges and grander opportunities are just around the corner, but can you handle them?",
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

  nextLevelButton.add([text("Main page"), anchor("center"), color(0, 0, 0)]);

  nextLevelButton.onClick(() => {
    go("start");
  });
});

scene("achievements", () => {
  const endingsButton = add([
    rect(240, 80, { radius: 8 }),
    pos(width() / 2, 150),
    area(),
    scale(1),
    anchor("center"),
    outline(4),
  ]);

  endingsButton.add([text("Endings"), anchor("center"), color(0, 0, 0)]);

  const rewardsButton = add([
    rect(240, 80, { radius: 8 }),
    pos(width() / 2, 250),
    area(),
    scale(1),
    anchor("center"),
    outline(4),
  ]);

  rewardsButton.add([text("Rewards"), anchor("center"), color(0, 0, 0)]);

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

  let yPosition = 50;
  const heading = add([
    text(`Unlocked Endings: ${endingsScore}/13`),
    pos(width() / 2, yPosition),
    anchor("center"),
    { size: 30 },
  ]);

  Object.keys(unlockedEndings).forEach((endingKey) => {
    if (unlockedEndings[endingKey]) {
      yPosition += 50;
      const displayText = endingDisplayText[endingKey];
      add([
        text(displayText, { size: 24 }),
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

  let yPosition = 50;
  const heading = add([
    text(`Unlocked Rewards: `),
    pos(width() / 2, yPosition),
    anchor("center"),
    { size: 30 },
  ]);

  Object.keys(unlockedRewards).forEach((rewardKey) => {
    if (unlockedRewards[rewardKey]) {
      yPosition += 50;
      const displayText = rewardDisplayText[rewardKey];
      add([
        text(displayText, { size: 24 }),
        pos(width() / 2, yPosition),
        anchor("center"),
      ]);
    }
  });

  onKeyPress("space", () => go("start"));
  onClick(() => go("start"));
});
