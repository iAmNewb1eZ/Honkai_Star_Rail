// backend/addImages.js
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function updateImages() {
  await prisma.character.updateMany({
    where: { C_name: 'Blade' },
    data: { image: 'blade.jpg' },
  });
  await prisma.character.updateMany({
    where: { C_name: 'Clara' },
    data: { image: 'clara.jpg' },
  });
  await prisma.character.updateMany({
    where: { C_name: 'Kafka' },
    data: { image: 'kafka.jpg' },
  });
  await prisma.character.updateMany({
    where: { C_name: 'Himeko' },
    data: { image: 'himeko.jpg' },
  });
  console.log('Images updated');
}
updateImages();