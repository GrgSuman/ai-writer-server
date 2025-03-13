import { PrismaClient } from '@prisma/client'

// Initialize Prisma Client
const prisma = new PrismaClient()

// Error handling for connection issues
prisma.$connect()
  .then(() => {
    console.log('Successfully connected to the database')
  })
  .catch((error: Error) => {
    console.error('Failed to connect to the database:', error)
  })

// Handle application termination
process.on('beforeExit', async () => {
  await prisma.$disconnect()
})

export default prisma