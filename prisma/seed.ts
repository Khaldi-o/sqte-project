const { PrismaClient } = require('@prisma/client');
const { fakerFR: faker } = require('@faker-js/faker');
const prisma = new PrismaClient();

async function fetchImageAsBuffer(url: string) {
  const response = await fetch(url);
  const arrayBuffer = await response.arrayBuffer();
  const buffer = Buffer.from(arrayBuffer);
  return buffer;
}
async function seed() {
  const events = Array.from({ length: 10 }).map(async () => {
    const imageUrl = faker.image.url();
    const imageBuffer = await fetchImageAsBuffer(imageUrl);

    return {
      title: "EVENT - " + faker.company.catchPhrase(),
      content: faker.lorem.paragraph(),
      createdAt: faker.date.past(),
      updatedAt: faker.date.recent(),
      image: imageBuffer,
    };
  });

  const news = Array.from({ length: 10 }).map(async () => {
    const imageUrl = faker.image.url();
    const imageBuffer = await fetchImageAsBuffer(imageUrl);

    return {
      title: "NEWS - " + faker.lorem.sentence(),
      content: faker.lorem.paragraph(),
      createdAt: faker.date.past(),
      updatedAt: faker.date.recent(),
      image: imageBuffer,
    };
  });

  // Wait for all the promises to resolve
  const eventData = await Promise.all(events);
  const newsData = await Promise.all(news);

  await prisma.event.createMany({ data: eventData });
  console.log(`${eventData.length} events seeded.`);

  await prisma.news.createMany({ data: newsData });
  console.log(`${newsData.length} news seeded.`);
}

if (process.env.NODE_ENV === "development") {
  console.log("Seeding data...");
  seed()
    .catch((e) => {
      console.error(e);
      process.exit(1);
    })
    .finally(async () => {
      await prisma.$disconnect();
    });
} else {
  console.log("Skipping seeding data because environment is not development.");
}
