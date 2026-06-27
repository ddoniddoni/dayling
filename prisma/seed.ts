import { PrismaClient } from "@prisma/client";
import { CHARACTER_CATALOG } from "../src/lib/characters";
import { assertProbabilityTotal } from "../src/lib/probability";

const prisma = new PrismaClient();

async function main() {
  assertProbabilityTotal(CHARACTER_CATALOG);

  for (const character of CHARACTER_CATALOG) {
    await prisma.characterCatalog.upsert({
      where: { id: character.id },
      update: character,
      create: character,
    });
  }
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (error) => {
    console.error(error);
    await prisma.$disconnect();
    process.exit(1);
  });

