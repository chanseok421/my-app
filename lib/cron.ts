import { prisma } from './prisma'

let started = false

async function cleanup() {
  const today = new Date()
  today.setHours(0, 0, 0, 0)
  await prisma.reservation.deleteMany({ where: { date: { lt: today } } })
}

function scheduleNextRun() {
  const now = new Date()
  const next = new Date(now)
  next.setDate(now.getDate() + 1)
  next.setHours(0, 0, 0, 0)
  setTimeout(async () => {
    await cleanup()
    scheduleNextRun()
  }, next.getTime() - now.getTime())
}

export async function startCleanupJob() {
  if (started) return
  started = true
  await cleanup() // run once on startup
  scheduleNextRun()
}

startCleanupJob()