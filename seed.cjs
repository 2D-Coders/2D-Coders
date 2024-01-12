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

  const game1 = await prisma.game.create({
    data: {
      name: "Game 1",
      description: "Game 1 description",
      highscore: {
        create: [
          {
            score: 100,
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
