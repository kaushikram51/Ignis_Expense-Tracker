const { PrismaClient } = require('@prisma/client')

const prisma = new PrismaClient()

async function main() {
  // Clear existing
  await prisma.transaction.deleteMany()
  await prisma.goal.deleteMany()

  // Seed Goals
  await prisma.goal.createMany({
    data: [
      { name: 'Buy a Tesla', targetAmount: 50000, currentAmount: 15400, icon: 'car' },
      { name: 'Emergency Fund', targetAmount: 10000, currentAmount: 8200, icon: 'shield' },
      { name: 'Vacation', targetAmount: 5000, currentAmount: 1200, icon: 'plane' },
    ]
  })

  // Seed Transactions
  const now = new Date()
  await prisma.transaction.createMany({
    data: [
      { amount: 18.50, type: 'EXPENSE', category: 'Food', description: 'Sweetgreen', date: new Date(now.getTime() - 1 * 24 * 60 * 60 * 1000) },
      { amount: 142.20, type: 'EXPENSE', category: 'Food', description: 'Whole Foods', date: new Date(now.getTime() - 2 * 24 * 60 * 60 * 1000) },
      { amount: 22.99, type: 'EXPENSE', category: 'Subscriptions', description: 'Netflix Premium', date: new Date(now.getTime() - 5 * 24 * 60 * 60 * 1000) },
      { amount: 45.00, type: 'EXPENSE', category: 'Subscriptions', description: 'OpenAI API', date: new Date(now.getTime() - 10 * 24 * 60 * 60 * 1000) },
      { amount: 24.15, type: 'EXPENSE', category: 'Travel', description: 'Uber', date: new Date(now.getTime() - 12 * 24 * 60 * 60 * 1000) },
      { amount: 450.00, type: 'EXPENSE', category: 'Travel', description: 'Delta Airlines', date: new Date(now.getTime() - 15 * 24 * 60 * 60 * 1000) },
      { amount: 500.00, type: 'EXPENSE', category: 'Investments', description: 'Vanguard S&P 500', date: new Date(now.getTime() - 3 * 24 * 60 * 60 * 1000) },
      { amount: 4200.00, type: 'INCOME', category: 'Income', description: 'Acme Corp Salary', date: new Date(now.getTime() - 20 * 24 * 60 * 60 * 1000) },
    ]
  })

  console.log('Seeding finished.')
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
