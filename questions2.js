const questions2 = [
  {
    question: "Agent: You're invited to write for a YouTube-show.",
    answers: [
      {
        text: "Sure, let's go viral!",
        fame: 10,
        ego: -10,
        money: 10,
        relationships: 0,
      },
      {
        text: "No thanks, I'm holding out for Netflix.",
        fame: -10,
        ego: 10,
        money: 0,
        relationships: 0,
      },
    ],
  },

  {
    question:
      "Producer: We loved your story; it's really dramatic! But could you convert it into a family comedy?",
    answers: [
      {
        text: "Whatever it takes to get it on screen.",
        fame: 10,
        ego: -10,
        money: 10,
        relationships: 10,
      },
      {
        text: "I'm more Shakespeare than Seinfeld.",
        fame: -10,
        ego: 10,
        money: 0,
        relationships: -10,
      },
    ],
  },

  {
    question:
      "Indie Icelandic director: Do you want to work on my next film together? It's unpaid, obviously",
    answers: [
      {
        text: "For the love of art and Iceland, absolutely!",
        fame: 0,
        ego: 10,
        money: -10,
        relationships: 10,
      },
      {
        text: "I'm not a fan of the 'starving artist' concept",
        fame: 0,
        ego: 0,
        money: 0,
        relationships: -10,
      },
    ],
  },

  {
    question:
      "Agent: You have a chance to be part of a writers' room for 'Christmas Babies-8'!",
    answers: [
      {
        text: "I'm in. With me on board we'll rock this franchise",
        fame: 10,
        ego: -10,
        money: 20,
        relationships: 0,
      },
      {
        text: "Am I a joke to you?",
        fame: 0,
        ego: 10,
        money: 0,
        relationships: -10,
      },
    ],
  },

  {
    question:
      "Agent: Your script is so 'cinema d'auteur' that nobody wants to shoot it. Will you shoot it yourself?",
    answers: [
      {
        text: "Absolutely. This story needs to be told.",
        fame: 10,
        ego: 20,
        money: -20,
        relationships: 0,
      },
      {
        text: "Maybe later. I guess it's too avant-garde for now.",
        fame: 0,
        ego: -10,
        money: 0,
        relationships: 0,
      },
    ],
  },

  // {
  //   question:
  //     "Young Famous Actress: Will you go to our movie premiere together?",
  //   answers: [
  //     {
  //       text: "Sorry, I'm going with my girlfriend",
  //       fame: -10,
  //       ego: 0,
  //       money: 0,
  //       relationships: 10,
  //     },
  //     {
  //       text: "Won't miss this chance",
  //       fame: 10,
  //       ego: 10,
  //       money: 0,
  //       relationships: -10,
  //     },
  //   ],
  // },

  {
    question:
      "Young Famous Actress: All the media say we're together, although you have a girlfriend",
    answers: [
      {
        text: "Need to tell them the truth",
        fame: -20,
        ego: 0,
        money: 0,
        relationships: 10,
      },
      {
        text: "Fame does come with its own script, doesn't it?",
        fame: 10,
        ego: 0,
        money: 0,
        relationships: -20,
      },
    ],
  },

  {
    question:
      "The main writer keeps ignoring your brilliant ideas. What's your move?",
    answers: [
      {
        text: "Fine, as long as I get paid, they can ignore me",
        fame: 0,
        ego: -10,
        money: 10,
        relationships: 0,
      },
      {
        text: "Make a scene and quit. There are better scripts to write!",
        fame: 0,
        ego: 10,
        money: -10,
        relationships: -10,
      },
    ],
  },

  {
    question:
      "You won a short movie festival and instantly got an offer from a big production company.",
    answers: [
      {
        text: "Grab it quickly, can't let it slip away.",
        fame: 0,
        ego: 0,
        money: 10,
        relationships: 10,
      },
      {
        text: "Wait for other offers to pick the best one.",
        fame: 0,
        ego: 10,
        money: 0,
        relationships: -10,
      },
    ],
  },

  {
    question:
      "Producer: Your drama's ending is too intense. Audiences prefer happy endings",
    answers: [
      {
        text: "Your money, your call. Happy ending it is.",
        fame: 10,
        ego: -10,
        money: 0,
        relationships: 10,
      },
      {
        text: "Life's not always a fairytale. The ending stays.",
        fame: -10,
        ego: 10,
        money: 0,
        relationships: -10,
      },
    ],
  },

  {
    question:
      "Your film school buddy sends you a terrible script to pass to a producer you know.",
    answers: [
      {
        text: "Send it",
        fame: 0,
        ego: -10,
        money: 0,
        relationships: 10,
      },
      {
        text: "Lie that the producer's too busy",
        fame: 0,
        ego: 10,
        money: 0,
        relationships: -10,
      },
    ],
  },

  {
    question:
      "You've just received a hefty payment for your work. How will you spend it?",
    answers: [
      {
        text: "Buy that dream gift for your girlfriend.",
        fame: 0,
        ego: 0,
        money: -10,
        relationships: 10,
      },
      {
        text: "Fund your new indie movie project.",
        fame: 0,
        ego: 10,
        money: -10,
        relationships: 0,
      },
    ],
  },

  {
    question: "Young aspiring director: I want to shoot your short script",
    answers: [
      {
        text: "Sure, let's see what you've got!",
        fame: 0,
        ego: 0,
        money: 0,
        relationships: 10,
      },
      {
        text: "Hold off for a big-name director.",
        fame: 0,
        ego: 10,
        money: 0,
        relationships: -10,
      },
    ],
  },

  {
    question: "You're being underpaid on a project because you're the 'newbie'",
    answers: [
      {
        text: "Demand equal pay or walk out.",
        fame: 0,
        ego: 10,
        money: 0,
        relationships: -10,
      },
      {
        text: "Just happy to be on the payroll!",
        fame: 0,
        ego: -10,
        money: 10,
        relationships: 0,
      },
    ],
  },

  {
    question:
      "Best friend: I can't believe this script! This is my life story. How could you use it without asking me?",
    answers: [
      {
        text: "Sorry, I'll rewrite it right away.",
        fame: 0,
        ego: -10,
        money: 0,
        relationships: 10,
      },
      {
        text: "It's art imitating life, isn't it fascinating?",
        fame: 0,
        ego: 10,
        money: 0,
        relationships: -10,
      },
    ],
  },

  {
    question:
      "A tweet about your script goes viral, but they got the story all wrong.",
    answers: [
      {
        text: "All publicity is good!",
        fame: 10,
        ego: -10,
        money: 0,
        relationships: 0,
      },
      {
        text: "Step in and set the record straight.",
        fame: -10,
        ego: 10,
        money: 0,
        relationships: 0,
      },
    ],
  },

  {
    question:
      "A billionaire wants you to write a script about their life. It's cheesy but pays incredibly well.",
    answers: [
      {
        text: "Write it, everyone has a price.",
        fame: 0,
        ego: -10,
        money: 20,
        relationships: 0,
      },
      {
        text: "No selling out.",
        fame: 0,
        ego: 10,
        money: -10,
        relationships: -10,
      },
    ],
  },

  {
    question:
      "A tech company offers to finance your indie movie, but only if you include plenty of product placement.",
    answers: [
      {
        text: "Sure, every scene gets a gadget cameo!",
        fame: 0,
        ego: -10,
        money: 10,
        relationships: 0,
      },
      {
        text: "No way, art isn't for sale.",
        fame: 0,
        ego: 10,
        money: -10,
        relationships: 0,
      },
    ],
  },

  {
    question:
      "You're invited to an exclusive cinema industry party with top filmmakers, but it clashes with your best friend's wedding.",
    answers: [
      {
        text: "Hit the party, it's a once-in-a-lifetime chance!",
        fame: 10,
        ego: 0,
        money: 0,
        relationships: -10,
      },
      {
        text: "Go to the wedding. Besties before celebs.",
        fame: 0,
        ego: 0,
        money: 0,
        relationships: 10,
      },
    ],
  },

  // {
  //   question:
  //     "The director finds your favorite dialogue scene boring and suggests replacing it with a car chase.",
  //   answers: [
  //     {
  //       text: "Agree. Who needs words when you have speed?",
  //       fame: 10,
  //       ego: -10,
  //       money: 0,
  //       relationships: 10,
  //     },
  //     {
  //       text: "The whole movie has no sense without this dialogue",
  //       fame: 0,
  //       ego: 10,
  //       money: 0,
  //       relationships: -10,
  //     },
  //   ],
  // },

  {
    question:
      "Your parents offer a monthly allowance to help you focus on writing. Do you take the safety net?",
    answers: [
      {
        text: "Thanks, family bank!",
        fame: 0,
        ego: -10,
        money: 10,
        relationships: 0,
      },
      {
        text: "Nope, I'll earn my keep.",
        fame: 0,
        ego: 10,
        money: -10,
        relationships: 0,
      },
    ],
  },
];

export default questions2;
