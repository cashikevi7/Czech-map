import { PrismaClient, Role } from "@prisma/client";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();

async function main() {
  const passwordHash = await bcrypt.hash("ChangeMe123!", 10);

  const admin = await prisma.user.upsert({
    where: { email: "admin@openmind.local" },
    update: { role: Role.ADMIN, passwordHash },
    create: {
      email: "admin@openmind.local",
      name: "Admin",
      passwordHash,
      role: Role.ADMIN,
    },
  });

  const npc = await prisma.user.upsert({
    where: { email: "npc@openmind.local" },
    update: { role: Role.NPC, passwordHash },
    create: {
      email: "npc@openmind.local",
      name: "NPC",
      passwordHash,
      role: Role.NPC,
    },
  });

  console.log({ admin: admin.email, npc: npc.email });
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
