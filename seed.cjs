const { PrismaClient } = require("@prisma/client");
const bcrypt = require("bcrypt");

const prisma = new PrismaClient();

const users = [
  {
    username: "DemoAccount",
    password: "123",
    email: "demo@gmail.com",
  },
  {
    username: "Bob",
    password: "123",
    email: "bob@gmail.com",
  },
  {
    username: "Dave",
    password: "123",
    email: "dave@gmail.com",
  },
  {
    username: "Alice",
    password: "123",
    email: "alice@gmail.com",
  },
];

async function main() {
  const demo = await prisma.user.create({
    data: {
      username: "DemoAccount",
      password: await bcrypt.hash("123", 5),
      email: "demo@gmail.com",
    },
  });

  const bob = await prisma.user.create({
    data: {
      username: "Bob",
      password: await bcrypt.hash("123", 5),
      email: "bob@gmail.com",
    },
  });

  const dave = await prisma.user.create({
    data: {
      username: "Dave",
      password: await bcrypt.hash("123", 5),
      email: "dave@gmail.com",
    },
  });

  const alice = await prisma.user.create({
    data: {
      username: "Alice",
      password: await bcrypt.hash("123", 5),
      email: "alice@gmail.com",
    },
  });

  const flappyBird = await prisma.game.create({
    data: {
      name: "Flappy Bird",
      description: "Flappy Bird description",
      highscore: {
        create: [
          // {
          //   score: 21,
          //   userId: bob.id,
          // },
          // {
          //   score: 6,
          //   userId: alice.id,
          // },
          // {
          //   score: 8,
          //   userId: alice.id,
          // },
          {
            score: 37,
            userId: demo.id,
          },
          {
            score: 32,
            userId: demo.id,
          },
          {
            score: 29,
            userId: demo.id,
          },
          {
            score: 27,
            userId: demo.id,
          },
        ],
      },
    },
  });

  const doodleJump = await prisma.game.create({
    data: {
      name: "Doodle Jump",
      description: "Doodle Jump description",
      highscore: {
        create: [
          // {
          //   score: 370,
          //   userId: bob.id,
          // },
          // {
          //   score: 800,
          //   userId: alice.id,
          // },
          // {
          //   score: 900,
          //   userId: alice.id,
          // },
          {
            score: 12541,
            userId: demo.id,
          },

          {
            score: 11586,
            userId: demo.id,
          },
          {
            score: 10694,
            userId: demo.id,
          },
          {
            score: 8531,
            userId: demo.id,
          },
        ],
      },
    },
  });

  const chromeDino = await prisma.game.create({
    data: {
      name: "Chrome Dino",
      description: "Chrome Dino description",
      highscore: {
        create: [
          // {
          //   score: 370,
          //   userId: bob.id,
          // },
          // {
          //   score: 200,
          //   userId: alice.id,
          // },
          // {
          //   score: 160,
          //   userId: alice.id,
          // },
          {
            score: 300,
            userId: demo.id,
          },
          {
            score: 250,
            userId: demo.id,
          },
          {
            score: 200,
            userId: demo.id,
          },
          {
            score: 150,
            userId: demo.id,
          },
        ],
      },
    },
  });

  //   const highscores = await prisma.highscore.createMany({
  //     data: {
  //       score: 450,
  //       userId: bob.id,
  //       gameId: flappyBird.id,
  //     },
  //   });
}

main()
  .then(async () => {
    await prisma.$disconnect();

    process.exit(0);
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
