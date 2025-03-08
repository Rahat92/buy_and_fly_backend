const prisma = require("../utils/db_connection")
async function main() {
  // Create Modules
  const userModule = await prisma.module.upsert({
    where: { name: "User Module" },
    update: {},
    create: { name: "User Module" },
  });

  const bookingModule = await prisma.module.upsert({
    where: { name: "Booking Module" },
    update: {},
    create: { name: "Booking Module" },
  });

  // Create Permissions for User Module
  const userPermissions = ["view_user", "delete_user", "update_user"].map((name) => ({
    name,
    moduleId: userModule.id,
  }));

  // Create Permissions for Booking Module
  const bookingPermissions = ["view_booking", "delete_booking", "update_booking"].map((name) => ({
    name,
    moduleId: bookingModule.id,
  }));

  await prisma.permission.createMany({
    data: [...userPermissions, ...bookingPermissions],
    skipDuplicates: true,
  });
  await prisma.role.create({
    data: {
      name:'USER'
    }
  })
  console.log("Modules, role and Permissions seeded successfully!");
}

main()
  .catch((e) => console.error(e))
  .finally(async () => {
    await prisma.$disconnect();
  });
