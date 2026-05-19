const { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient()

async function main() {
  await prisma.transaction.deleteMany()
  await prisma.goal.deleteMany()
  console.log('Database cleared.')
}

main().catch(console.error).finally(() => prisma.$disconnect())
