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
export default questions;
