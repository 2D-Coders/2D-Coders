const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();

async function main() {
  const bob = await prisma.user.create({
    data: {
      username: "Bob",
      password: "123456",
      email: "bob@gmail.com",
    },
  });

  const alice = await prisma.user.create({
    data: {
      username: "Alice",
      password: "123456",
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
