const { PrismaClient } = require("@prisma/client");
const bcrypt = require("bcrypt");

const prisma = new PrismaClient();

const users = [
  {
    username: "demo",
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
      username: "demo",
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
          {
            score: 170,
            userId: bob.id,
          },
          {
            score: 400,
            userId: alice.id,
          },
          {
            score: 200,
            userId: alice.id,
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
          {
            score: 370,
            userId: bob.id,
          },
          {
            score: 800,
            userId: alice.id,
          },
          {
            score: 900,
            userId: alice.id,
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
          {
            score: 370,
            userId: bob.id,
          },
          {
            score: 200,
            userId: alice.id,
          },
          {
            score: 160,
            userId: alice.id,
          },
        ],
      },
    },
  });

  const highscores = await prisma.highscore.createMany({
    data: {
      score: 450,
      userId: bob.id,
      gameId: game1.id,
    },
  });
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
