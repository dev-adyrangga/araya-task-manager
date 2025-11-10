import path from 'path'
import { PrismaClient } from './generated/prisma/client'

const dbPath = path.resolve(process.cwd(), 'prisma/dev.db')

const globalForPrisma = global as unknown as { prisma: PrismaClient }

export const prisma =
  globalForPrisma.prisma ||
  new PrismaClient({
    log: process.env.NODE_ENV !== 'production' ? ['query'] : [],
    datasources: {
      db: {
        url: `file:${dbPath}`,
      },
    },
  })

if (process.env.NODE_ENV !== 'production') globalForPrisma.prisma = prisma
